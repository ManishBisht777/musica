import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "5bcbd8541e76465481838de8f049a1fc",
});

export async function GetNewReleases(accesstoken) {
  spotifyApi.setAccessToken(accesstoken);

  const res = await spotifyApi.getNewReleases();

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
  collection.push(playlistID);
  localStorage.setItem("musica:collection", JSON.stringify(collection));
}

export async function GetSavedPlaylist(accessToken) {
  spotifyApi.setAccessToken(accessToken);

  const ids = await JSON.parse(localStorage.getItem("musica:collection"));

  const listOfPromises = Promise.all(
    ids.map(async (id) => {
      const playlist = await spotifyApi.getPlaylist(id);
      return {
        name: playlist.body.name,
        image: playlist.body.images[0].url,
        artist: playlist.body.tracks.items[0].track.artists[0].name,
      };
    })
  );

  return await listOfPromises;
}
