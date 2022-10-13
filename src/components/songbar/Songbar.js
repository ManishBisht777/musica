import React from "react";
// import song from "../../song/song.mp3";
import list1 from "../../images/list1.png";
import playicon from "../../images/icons/play.svg";
import nexticon from "../../images/icons/next.svg";
import previcon from "../../images/icons/prev.svg";
import volume from "../../images/icons/volume.svg";
import SpotifyPlayer from "react-spotify-player";

{
  /* <div className="songbar">
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
            <button>
              <img src={playicon} alt="play" />
            </button>
          </div>
          <button>
            <img src={nexticon} alt="next" />
          </button>
        </div>
        <div className="audio">
          <input type="range" id="seek-slider" max="100" aria-label="song" />
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
    </div> */
}

<SpotifyPlayer uri="spotify:album:6AJaDEafyyyWWXHZQtcFGe" theme="black" />;
const Songbar = () => {
  return (
    <audio
      src="https://p.scdn.co/mp3-preview/f64f1b822853d3de0f453c02be68b72a19ace7c8?cid=5bcbd8541e76465481838de8f049a1fc"
      controls
    ></audio>
  );
};

export default Songbar;
