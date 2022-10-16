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
  SavePlaylist,
} from "../../utils/utils";
import { SetCurrentPlaying } from "../../store/Songslice";

const Playlist = () => {
  const accesstoken = useSelector((state) => state.Auth.accessToken);

  const [tracks, settracks] = useState([]);
  const [PlaylistData, setPlaylistData] = useState([]);

  const [playingtrack, setplayingtrack] = useState([]);

  const disptach = useDispatch();

  const { id, type } = useParams();

  const likeplaylist = "playlist";
  const liketrack = "track";
  const likealnum = "album";

  const AddToCollection = () => {
    SavePlaylist(id);
  };

  const handleLike = (typeid, type) => {
    console.log(type, id);
    like(typeid, type);
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

  console.log(PlaylistData.tracks);

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
              <button>
                <img src={playicon} alt="play" /> play all
              </button>
              <button
                onClick={() => {
                  AddToCollection();
                }}
              >
                <img src={collectionicon} alt="collection" />
                add to collection
              </button>
              <button
                onClick={() => {
                  if (type === "album") handleLike(id, likealnum);
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
          tracks
            .filter((track) => {
              return track.trackurl != null;
            })
            .map((track, index) => {
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
