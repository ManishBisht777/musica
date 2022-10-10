import React from "react";
// import song from "../../song/song.mp3";
import list1 from "../../images/list1.png";
import playicon from "../../images/icons/play.svg";
import nexticon from "../../images/icons/next.svg";
import previcon from "../../images/icons/prev.svg";

const Songbar = () => {
  return (
    <div className="songbar">
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
          <input type="range" id="seek-slider" max="100" />
        </div>
      </div>
      <input
        className="volume-output"
        type="range"
        id="volume-slider"
        max="100"
      />
    </div>
  );
};

export default Songbar;
