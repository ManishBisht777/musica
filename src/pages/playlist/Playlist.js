import React, { useEffect, useState } from "react";
import Search from "../../components/searchbar/Search";

import playicon from "../../images/icons/play.svg";
import hearticon from "../../images/icons/heart.svg";
import collectionicon from "../../images/icons/collection.svg";
import option from "../../images/icons/option.svg";

import { motion } from "framer-motion";
import { exit, fadeIn, fadeOut } from "../../animation/animation";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  GetAlbumTracks,
  GetPlaylistTrack,
  like,
  Save,
} from "../../utils/utils";
import { SetCurrentPlaying, SetPlaylist } from "../../store/Songslice";

const Playlist = () => {
  const accesstoken = useSelector((state) => state.Auth.accessToken);

  const [tracks, settracks] = useState([]);
  const [PlaylistData, setPlaylistData] = useState([]);

  const [playingtrack, setplayingtrack] = useState([]);

  const disptach = useDispatch();

  const { id, type } = useParams();

  const likeplaylist = "playlist";
  const liketrack = "track";
  const likeAlbum = "album";

  const handleSave = (typeid, type) => {
    console.log(typeid, type);
    Save(typeid, type);
  };

  const handleLike = (typeid, type) => {
    console.log(type, id);
    like(typeid, type);
  };

  const playAllTracks = () => {
    const playlistinfo = {
      name: PlaylistData.name,
      image: PlaylistData.image,
      description: PlaylistData.description,
    };

    disptach(
      SetPlaylist({
        playlistInfo: playlistinfo,
        playlistTracks: tracks,
      })
    );

    const playlistFirstSong = {
      trackurl: tracks[0].trackurl,
      name: tracks[0].name,
      artist: tracks[0].artist,
      image: tracks[0].image,
      artistid: tracks[0].artistid,
    };

    disptach(SetCurrentPlaying(playlistFirstSong));
  };

  useEffect(() => {
    if (playingtrack.length === 0) return;

    const trackinfo = {
      trackurl: playingtrack.trackurl,
      name: playingtrack.name,
      artist: playingtrack.artist,
      image: playingtrack.image,
      artistid: playingtrack.artistid,
    };

    disptach(SetCurrentPlaying(trackinfo));
  }, [playingtrack, disptach]);

  useEffect(() => {
    settracks(PlaylistData.tracks);
  }, [PlaylistData]);

  useEffect(() => {
    if (!accesstoken || !id || !type) return;

    const getTracks = async () => {
      if (type === "playlist")
        setPlaylistData(await GetPlaylistTrack(accesstoken, id));
      else if (type === "album")
        setPlaylistData(await GetAlbumTracks(accesstoken, id));
    };

    getTracks();
  }, [accesstoken, id, type]);

  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <motion.main
      initial={fadeIn}
      animate={fadeOut}
      exit={exit}
      className="playlist-page"
    >
      <section>
        <Search />
        <section className="playlist-wrapper">
          <img src={PlaylistData.image} alt="" />
          <article className="playlist-info">
            <h2>{PlaylistData.name}</h2>
            <p>{PlaylistData.description}</p>
            <p>{PlaylistData.total} Songs</p>
            <div className="options">
              <button
                onClick={() => {
                  playAllTracks();
                }}
              >
                <img src={playicon} alt="play" /> play all
              </button>
              <button
                onClick={() => {
                  if (type === "album") handleSave(id, likeAlbum);
                  else if (type === "playlist") handleSave(id, likeplaylist);
                }}
              >
                <img src={collectionicon} alt="collection" />
                add to collection
              </button>
              <button
                onClick={() => {
                  if (type === "album") handleLike(id, likeAlbum);
                  else if (type === "playlist") handleLike(id, likeplaylist);
                }}
              >
                <img src={hearticon} alt="heart" />
              </button>
            </div>
          </article>
        </section>
        <div
          className="playlist_bg"
          style={{
            background: `url(${PlaylistData.image}) no-repeat center
        center/cover`,
            opacity: 0.1,
          }}
        ></div>
      </section>

      <section className="song-wrapper">
        {tracks &&
          tracks.map((track, index) => {
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
                  <button
                    onClick={(e) => {
                      handleLike(track.id, liketrack);
                    }}
                  >
                    <img src={hearticon} alt="heart" />
                  </button>
                </div>
                <div className="stylebx">
                  <p>{track.name}</p>
                  <p className="artist_name">{track.artist}</p>
                </div>
                <div className="stylebx">
                  <p>{msToMinutesAndSeconds(track.duration)}</p>
                  <button>
                    <img src={option} alt="option" />
                  </button>
                </div>
              </article>
            );
          })}
      </section>
    </motion.main>
  );
};

export default Playlist;
