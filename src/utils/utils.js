import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "5bcbd8541e76465481838de8f049a1fc",
});

export function GetNewReleases(accesstoken) {
  spotifyApi.setAccessToken(accesstoken);

  spotifyApi.getNewReleases().then((res) => {
    let releases = res.body.albums.items.map((album) => {
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

    return releases;
  });
}
