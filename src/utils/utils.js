import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "5bcbd8541e76465481838de8f049a1fc",
});

export async function GetNewReleases(accesstoken) {
  spotifyApi.setAccessToken(accesstoken);

  const res = await spotifyApi.getNewReleases({
    limit: 3,
    country: "SE",
    offset: 3,
  });

  return res.body.albums.items.map((album) => {
    const smallestAlbumImage = album.images.reduce((smallest, image) => {
      if (image.height < smallest.height) return image;
      return smallest;
    }, album.images[0]);

    return {
      artist: album.artists[0].name,
      title: album.name,
      url: album.uri,
      albumUrl: smallestAlbumImage.url,
    };
  });
}

export async function GetFeaturedList(accesstoken) {
  spotifyApi.setAccessToken(accesstoken);

  const res = await spotifyApi.getFeaturedPlaylists();

  return res.body.playlists.items.map((playlist) => {
    return {
      url: playlist.uri,
      playlistUrl: playlist.images[0].url,
    };
  });
}

export async function GetCategories(accessToken) {
  const country = await fetch(
    "https://api.ipregistry.co/?key=rx4j7s8viigcvhbx"
  ).then(function (response) {
    return response.json();
  });

  spotifyApi.setAccessToken(accessToken);

  const res = await spotifyApi.getCategories({
    offset: 0,
    limit: 10,
    country: country.location.country.code,
  });

  return res.body.categories.items;
}

export async function GetCategoryPlaylist(accessToken) {
  const country = await fetch(
    "https://api.ipregistry.co/?key=rx4j7s8viigcvhbx"
  ).then(function (response) {
    return response.json();
  });

  spotifyApi.setAccessToken(accessToken);

  const res = await spotifyApi.getPlaylistsForCategory("toplists", {
    country: country.location.country.code,
  });

  const playlist = res.body.playlists.items.map((playlist) => {
    return {
      image: playlist.images[0].url,
      playlistid: playlist.id,
    };
  });

  return playlist;
}

export async function GetPlaylistTrack(accessToken, playlistID) {
  spotifyApi.setAccessToken(accessToken);
  const res = await spotifyApi.getPlaylist(playlistID);

  const tracks = res.body.tracks.items.map((track) => {
    return {
      artist: track.track.artists[0].name,
      artistid: track.track.artists[0].id,
      name: track.track.name,
      image: track.track.album.images[0].url,
      trackurl: track.track.preview_url,
      duration: track.track.duration_ms,
      id: track.track.id,
    };
  });

  return {
    name: res.body.name,
    description: res.body.description,
    tracks: tracks,
    image: res.body.images[0].url,
    total: res.body.tracks.total,
  };
}

export async function GetAlbumTracks(accessToken, albumID) {
  spotifyApi.setAccessToken(accessToken);

  const res = await spotifyApi.getAlbum(albumID);

  const albumimage = res.body.images[0].url;
  const tracks = res.body.tracks.items.map((track) => {
    return {
      artist: track.artists[0].name,
      artistid: track.artists[0].id,
      name: track.name,
      image: albumimage,
      trackurl: track.preview_url,
    };
  });

  return {
    name: res.body.name,
    description: res.body.album_type,
    tracks: tracks,
    image: albumimage,
    total: res.body.tracks.total,
  };
}

export async function GetUser(accessToken) {
  spotifyApi.setAccessToken(accessToken);

  const res = await spotifyApi.getMe();

  return {
    id: res.body.id,
    name: res.body.display_name,
  };
}

export async function NextSong(accessToken, artistid) {
  spotifyApi.setAccessToken(accessToken);

  const relatedartist = await spotifyApi.getArtistRelatedArtists(artistid);
  const id = relatedartist.body.artists[0].id;
  const related = await spotifyApi.getArtistTopTracks(id, "IN");

  let i = 0;
  // handle song with null preview url
  while (!related.body.tracks[i].preview_url) {
    i++;
  }

  return {
    name: related.body.tracks[i].name,
    trackurl: related.body.tracks[i].preview_url,
    artist: related.body.tracks[i].artists[0].name,
    artistid: related.body.tracks[i].artists[0].id,
    image: related.body.tracks[i].album.images[0].url,
  };
}

export async function SavePlaylist(playlistID) {
  var collection = [];
  collection = JSON.parse(localStorage.getItem("musica:collection")) || [];

  let duplicate = false;
  console.log(collection.length);
  for (let i = 0; i < collection.length; i++) {
    if (collection[i] === playlistID) duplicate = true;
  }

  if (!duplicate) collection.push(playlistID);
  localStorage.setItem("musica:collection", JSON.stringify(collection));
}

function checkDuplicate(playlist, id) {
  for (let i = 0; i < playlist.length; i++) if (playlist[i] === id) return true;
  return false;
}

export async function like(id, type) {
  var localdata = [];
  localdata = JSON.parse(localStorage.getItem(`musica:like:${type}`)) || [];
  console.log(localdata);

  if (!checkDuplicate(localdata, id)) localdata.push(id);
  localStorage.setItem(`musica:like:${type}`, JSON.stringify(localdata));
}

export async function GetSavedPlaylist(accessToken) {
  spotifyApi.setAccessToken(accessToken);

  const ids =
    (await JSON.parse(localStorage.getItem("musica:collection"))) || [];

  if (ids.length === 0) return;

  const listOfPromises = Promise.all(
    ids.map(async (id) => {
      const playlist = await spotifyApi.getPlaylist(id);
      return {
        name: playlist.body.name,
        image: playlist.body.images[0].url,
        artist: playlist.body.tracks.items[0].track.artists[0].name,
        id: id,
      };
    })
  );

  return await listOfPromises;
}

export async function GetLikedPlaylist(accessToken) {
  spotifyApi.setAccessToken(accessToken);

  const ids =
    (await JSON.parse(localStorage.getItem("musica:like:playlist"))) || [];
  if (ids.length === 0) return;

  const listOfPromises = Promise.all(
    ids.map(async (id) => {
      const playlist = await spotifyApi.getPlaylist(id);
      return {
        name: playlist.body.name,
        image: playlist.body.images[0].url,
        artist: playlist.body.tracks.items[0].track.artists[0].name,
        id: id,
      };
    })
  );

  return await listOfPromises;
}
export async function GetLikedTracks(accessToken) {
  spotifyApi.setAccessToken(accessToken);

  const ids =
    (await JSON.parse(localStorage.getItem("musica:like:track"))) || [];

  if (ids.length === 0) return;

  const listOfPromises = Promise.all(
    ids.map(async (id) => {
      const track = await spotifyApi.getTrack(id);
      return {
        artist: track.body.artists[0].name,
        artistid: track.body.artists[0].id,
        name: track.body.name,
        image: track.body.album.images[0].url,
        trackurl: track.body.preview_url,
        duration: track.body.duration_ms,
      };
    })
  );

  return await listOfPromises;
}

export async function SearchTracks(accessToken, search, cancle) {
  if (cancle) return;

  spotifyApi.setAccessToken(accessToken);

  const res = await spotifyApi.searchTracks(search, { limit: 10 });

  return res.body.tracks.items
    .filter((track) => {
      return track.preview_url != null;
    })
    .map((track) => {
      const smallest = track.album.images.reduce((smallest, image) => {
        if (image.height < smallest.height) return image;
        return smallest;
      }, track.album.images[0]);

      return {
        artist: track.artists[0].name,
        artistid: track.artists[0].id,
        image: smallest.url,
        url: track.preview_url,
        name: track.name,
      };
    });
}
