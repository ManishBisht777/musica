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

  const res = await spotifyApi.getPlaylistTracks(playlistID);
  console.log(res.body.items);

  return res.body.items.map((track) => {
    return {
      artist: track.track.artists[0].name,
      name: track.track.name,
      image: track.track.album.images[0].url,
    };
  });
}
