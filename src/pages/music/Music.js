import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearPlaylist } from "../../store/Songslice";

const Music = () => {
  const { CurrentPlaylistInfo } = useSelector((state) => state.Song);

  const dispatch = useDispatch();

  const clear = () => [dispatch(ClearPlaylist())];

  return (
    <main className="music">
      {CurrentPlaylistInfo.length === 0 ? (
        <h1>Plz select a playlist to play</h1>
      ) : (
        <section>
          <h1>Currently playing</h1>
          <div className="playlist-wrapper">
            <img src={CurrentPlaylistInfo.image} alt="" />
            <article className="playlist-info">
              <h2>{CurrentPlaylistInfo.name}</h2>
              <p>{CurrentPlaylistInfo.description}</p>
              <button onClick={() => clear()}>Clear Playlist</button>
            </article>
            <div
              className="playlist_bg"
              style={{
                background: `url(${CurrentPlaylistInfo.image}) no-repeat center
        center/cover`,
                opacity: 0.1,
              }}
            ></div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Music;
