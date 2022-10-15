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
import { GetPlaylistTrack, SavePlaylist } from "../../utils/utils";
import { SetCurrentPlaying } from "../../store/Songslice";

const Playlist = () => {
  const accesstoken = useSelector((state) => state.Auth.accessToken);
  const [tracks, settracks] = useState([]);
  const [PlaylistData, setPlaylistData] = useState([]);

  const [playingtrack, setplayingtrack] = useState([]);

  const disptach = useDispatch();
  console.log(useSelector((state) => state.Song.CurrentPlaying));

  const { id } = useParams();

  const AddToCollection = () => {
    SavePlaylist(id);
  };

  useEffect(() => {
    if (!playingtrack) return;

    console.log(playingtrack);

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
    if (!accesstoken || !id) return;

    const getTracks = async () => {
      setPlaylistData(await GetPlaylistTrack(accesstoken, id));
    };

    getTracks();
  }, [accesstoken, id]);

  return (
    <motion.main
      initial={fadeIn}
      animate={fadeOut}
      exit={exit}
      className="playlist-page"
    >
      <section className="playlist-bg">
        {/* <img src={PlaylistData.image} alt="" /> */}
        <Search />
        <section className="playlist-wrapper">
          <img src={PlaylistData.image} alt="" />
          <article className="playlist-info">
            <h2>{PlaylistData.name}</h2>
            <p>{PlaylistData.description}</p>
            <p>{PlaylistData.total}</p>
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
              <button>
                <img src={hearticon} alt="heart" />
              </button>
            </div>
          </article>
        </section>
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
                    <img src={hearticon} alt="heart" />
                  </div>
                  <div className="stylebx">
                    <p>{track.name}</p>
                    <p>{track.artist}</p>
                  </div>
                  <div className="stylebx">
                    <p>4.35</p>
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
