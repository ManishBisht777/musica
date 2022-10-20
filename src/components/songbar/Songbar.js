import React from "react";
// import playicon from "../../images/icons/play.svg";
// import nexticon from "../../images/icons/next.svg";
// import previcon from "../../images/icons/prev.svg";
// import volume from "../../images/icons/volume.svg";
// import pause from "../../images/icons/pause.svg";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import { NextSong } from "../../utils/utils";
import { SetCurrentPlaying, SetIndex } from "../../store/Songslice";
import "react-h5-audio-player/lib/styles.css";

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
          <article className="current-song">
            <img src={CurrentPlayingImg} alt="list" />
            <article>
              <h2>{CurrentPlayingName}</h2>
              <p>{CurrentPlayingArtist}</p>
            </article>
          </article>

          <AudioPlayer
            src={CurrentPlayingUrl}
            showSkipControls
            showJumpControls={false}
            autoPlay
            onClickPrevious={() => {
              prevSong();
            }}
            onClickNext={() => {
              nextsong();
            }}
            onEnded={() => {
              nextsong();
            }}
            className="player"
          ></AudioPlayer>
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
