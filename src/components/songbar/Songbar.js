import React from "react";
import playicon from "../../images/icons/play.svg";
import nexticon from "../../images/icons/next.svg";
import previcon from "../../images/icons/prev.svg";
import volume from "../../images/icons/volume.svg";
import pause from "../../images/icons/pause.svg";
import { useDispatch, useSelector } from "react-redux";

import SongUtil from "./SongUtil";
import { NextSong } from "../../utils/utils";
import { SetCurrentPlaying, SetIndex } from "../../store/Songslice";

const Songbar = () => {
  const {
    CurrentPlayingUrl,
    CurrentPlayingImg,
    CurrentPlayingName,
    CurrentPlayingArtist,
    CurrentPlayingArtistID,
    CurrentPlaylistTracks,
    IsFromPlaylist,
    CurrentPlayingIndex,
  } = useSelector((state) => state.Song);

  const dispatch = useDispatch();

  const accesstoken = useSelector((state) => state.Auth.accessToken);
  const { curTime, duration, playing, setPlaying, setClickedTime } = SongUtil();

  const curPercentage = (curTime / duration) * 100;

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector(".bar__progress");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  const onTimeUpdate = (time) => setClickedTime(time);

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = (eMove) => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  const prevSong = async () => {
    let newsong = "";
    let idx = CurrentPlayingIndex;

    if (IsFromPlaylist) {
      if (idx - 1 < 0) idx = CurrentPlaylistTracks.length;
      newsong = CurrentPlaylistTracks[idx - 1];

      dispatch(SetIndex(idx - 1));
    } else {
      newsong = await NextSong(accesstoken, CurrentPlayingArtistID);
    }

    dispatch(SetCurrentPlaying(newsong));
  };

  const nextsong = async () => {
    let newsong = "";
    let idx = CurrentPlayingIndex;
    if (!IsFromPlaylist)
      newsong = await NextSong(accesstoken, CurrentPlayingArtistID);
    else {
      if (idx + 1 === CurrentPlaylistTracks.length) idx = -1;
      newsong = CurrentPlaylistTracks[idx + 1];
      dispatch(SetIndex(idx + 1));
    }
    dispatch(SetCurrentPlaying(newsong));
  };

  return (
    <div className="songbar">
      {CurrentPlayingUrl ? (
        <>
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
              <button
                onClick={() => {
                  prevSong();
                }}
              >
                <img src={previcon} alt="prev" />
              </button>
              <div className="playpause">
                {playing ? (
                  <button
                    onClick={() => {
                      setPlaying(false);
                    }}
                  >
                    <img src={pause} alt="pause" aria-label="pause-music" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setPlaying(true);
                    }}
                  >
                    <img src={playicon} alt="play" aria-label="play-music" />
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
              <div
                className="bar__progress"
                style={{
                  background: `linear-gradient(to right, #facd66 ${curPercentage}%, white 0)`,
                }}
                onMouseDown={(e) => handleTimeDrag(e)}
              >
                <span
                  className="bar__progress__knob"
                  style={{ left: `${curPercentage - 2}%` }}
                />
              </div>
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
        </>
      ) : (
        <>
          <p>no song chosen</p>
        </>
      )}
    </div>
  );
};

export default Songbar;
