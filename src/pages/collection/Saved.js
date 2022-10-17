import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetSavedAlbum, GetSavedPlaylist } from "../../utils/utils";

const Saved = () => {
  const accesstoken = useSelector((state) => state.Auth.accessToken);
  const userID = useSelector((state) => state.Auth.id);

  const [savedAlbum, setsavedAlbum] = useState([]);
  const [likedPlaylist, setSavedPlaylist] = useState([]);

  useEffect(() => {
    if (!accesstoken) return;
    if (!userID) return;

    const getalbum = async () => {
      setSavedPlaylist(await GetSavedPlaylist(accesstoken));
      setsavedAlbum(await GetSavedAlbum(accesstoken));
    };

    getalbum();
  }, [accesstoken, userID]);

  return (
    <div className="like_save_wrapper">
      <div className="liked">
        <h2>Saved album</h2>
        <div className="collection-list">
          {savedAlbum &&
            savedAlbum.map((album, index) => {
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
        <h2>Saved playlist</h2>
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
    </div>
  );
};

export default Saved;
