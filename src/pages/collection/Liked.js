import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SetCurrentPlaying } from "../../store/Songslice";
import {
  GetLikedAlbum,
  GetLikedPlaylist,
  GetLikedTracks,
} from "../../utils/utils";

const Liked = () => {
  const accesstoken = useSelector((state) => state.Auth.accessToken);
  const userID = useSelector((state) => state.Auth.id);

  const [likedAlbum, setlikedAlbum] = useState([]);
  const [likedTracks, setlikedTracks] = useState([]);
  const [likedPlaylist, setlikedPlaylist] = useState([]);
  const [playingtrack, setplayingtrack] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!accesstoken) return;
    if (!userID) return;

    const getalbum = async () => {
      setlikedTracks(await GetLikedTracks(accesstoken));
      setlikedPlaylist(await GetLikedPlaylist(accesstoken));
      setlikedAlbum(await GetLikedAlbum(accesstoken));
    };

    getalbum();
  }, [accesstoken, userID]);

  useEffect(() => {
    if (playingtrack.length === 0) return;

    const trackinfo = {
      trackurl: playingtrack.trackurl,
      name: playingtrack.name,
      artist: playingtrack.artist,
      image: playingtrack.image,
      artistid: playingtrack.artistid,
    };

    dispatch(SetCurrentPlaying(trackinfo));
  }, [playingtrack, dispatch]);

  return (
    <div className="like_save_wrapper">
      <div className="liked">
        <h2>liked album</h2>
        <div className="collection-list">
          {likedAlbum &&
            likedAlbum.map((album, index) => {
              return (
                <Link to={`/browse/album/${album.id}`} key={index}>
                  <article className="collection-item">
                    <img src={album.image} alt={album.name} />
                    <article>
                      <h2>{album.name}</h2>
                      <p>{album.artist}</p>
                    </article>
                  </article>
                </Link>
              );
            })}
        </div>
      </div>

      <div className="liked">
        <h2>Liked playlist</h2>
        <div className="collection-list">
          {likedPlaylist &&
            likedPlaylist.map((playlist, index) => {
              return (
                <Link to={`/browse/playlist/${playlist.id}`} key={index}>
                  <article className="collection-item">
                    <img src={playlist.image} alt={playlist.name} />
                    <article>
                      <h2>{playlist.name}</h2>
                      <p>{playlist.artist}</p>
                    </article>
                  </article>
                </Link>
              );
            })}
        </div>
      </div>

      <div className="liked">
        <h2>liked tracks</h2>

        {likedTracks &&
          likedTracks.length > 0 &&
          likedTracks.map((track, index) => {
            return (
              <article
                className="song"
                key={index}
                onClick={() => {
                  setplayingtrack(track);
                }}
              >
                <div className="stylebx">
                  <img src={track.image} alt="" />
                </div>
                <div className="stylebx">
                  <p>{track.name}</p>
                  <p className="artist_name">{track.artist}</p>
                </div>
              </article>
            );
          })}
      </div>
    </div>
  );
};

export default Liked;
