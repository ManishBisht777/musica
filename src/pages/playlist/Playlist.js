import React, { useEffect, useState } from "react";
import Search from "../../components/searchbar/Search";
import list5 from "../../images/list5.png";

import playicon from "../../images/icons/play.svg";
import hearticon from "../../images/icons/heart.svg";
import collectionicon from "../../images/icons/collection.svg";
import option from "../../images/icons/option.svg";

import { motion } from "framer-motion";
import { exit, fadeIn, fadeOut } from "../../animation/animation";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetPlaylistTrack } from "../../utils/utils";

const Playlist = () => {
  const accesstoken = useSelector((state) => state.Auth.accessToken);
  const [tracks, settracks] = useState([]);
  const { id } = useParams();

  const getTracks = async () => {
    settracks(await GetPlaylistTrack(accesstoken, id));
  };

  useEffect(() => {
    if (!accesstoken || !id) return;

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
        <Search />
        <section className="playlist-wrapper">
          <img src={list5} alt="" />
          <article className="playlist-info">
            <h2>tommorow tunes</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ea.
            </p>
            <p>64 songs</p>
            <div className="options">
              <button>
                <img src={playicon} alt="play" /> play all
              </button>
              <button>
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
          tracks.map((track, index) => {
            return (
              <article className="song" key={index}>
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
