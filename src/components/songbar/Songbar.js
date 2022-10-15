import React from "react";
import playicon from "../../images/icons/play.svg";
import nexticon from "../../images/icons/next.svg";
import previcon from "../../images/icons/prev.svg";
import volume from "../../images/icons/volume.svg";
import { useDispatch, useSelector } from "react-redux";

import SongUtil from "./SongUtil";
import { NextSong } from "../../utils/utils";
import { SetCurrentPlaying } from "../../store/Songslice";

const Songbar = () => {
  const {
    CurrentPlayingUrl,
    CurrentPlayingImg,
    CurrentPlayingName,
    CurrentPlayingArtist,
    CurrentPlayingArtistID,
  } = useSelector((state) => state.Song);

  const dispatch = useDispatch();

  const accesstoken = useSelector((state) => state.Auth.accessToken);
  // const { curTime, duration, playing, setPlaying, setClickedTime } = SongUtil();

  const { playing, setPlaying } = SongUtil();

  const nextsong = async () => {
    const newsong = await NextSong(accesstoken, CurrentPlayingArtistID);

    dispatch(SetCurrentPlaying(newsong));
  };

  return (
    <>
      {CurrentPlayingUrl ? (
        <div className="songbar">
          <audio id="Song" src={CurrentPlayingUrl} controls></audio>
          <article className="current-song">
            <img src={CurrentPlayingImg} alt="list" />
            <article>
              <h2>{CurrentPlayingName}</h2>
              <p>{CurrentPlayingArtist}</p>
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
              <button
                onClick={() => {
                  nextsong();
                }}
              >
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
