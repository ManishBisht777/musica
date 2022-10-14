import React from "react";
// import song from "../../song/song.mp3";
import list1 from "../../images/list1.png";
import playicon from "../../images/icons/play.svg";
import nexticon from "../../images/icons/next.svg";
import previcon from "../../images/icons/prev.svg";
import volume from "../../images/icons/volume.svg";
import { useSelector } from "react-redux";

import SongUtil from "./SongUtil";

// import SpotifyPlayer from "react-spotify-player";

{
  /* <SpotifyPlayer uri="spotify:album:6AJaDEafyyyWWXHZQtcFGe" theme="black" />; */
}

const Songbar = () => {
  const trackurl = useSelector((state) => state.Song.CurrentPlaying);

  const { curTime, duration, playing, setPlaying, setClickedTime } = SongUtil();

  return (
    <>
      {trackurl ? (
        <div className="songbar">
          <audio id="Song" src={trackurl} controls></audio>
          <article className="current-song">
            <img src={list1} alt="list" />
            <article>
              <h2>season in</h2>
              <p>artist</p>
            </article>
          </article>
          <div className="audio-box">
            <div className="audio-controls">
              <button>
                <img src={previcon} alt="prev" />
              </button>
              <div className="playpause">
                {playing ? (
                  <button
                    onClick={() => {
                      setPlaying(false);
                    }}
                  >
                    stop
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setPlaying(true);
                    }}
                  >
                    <img src={playicon} alt="play" />
                  </button>
                )}
              </div>
              <button>
                <img src={nexticon} alt="next" />
              </button>
            </div>
            <div className="audio">
              <input
                type="range"
                id="seek-slider"
                max="100"
                aria-label="song"
              />
            </div>
          </div>
          <div className="volume-output">
            <img src={volume} alt="volume" />
            <input
              type="range"
              id="volume-slider"
              max="100"
              aria-label="volume-bar"
            />
          </div>
        </div>
      ) : (
        <>
          <p>no song chosen</p>
        </>
      )}
    </>
  );
};

export default Songbar;
