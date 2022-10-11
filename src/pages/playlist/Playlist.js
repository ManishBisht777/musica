import React from "react";
import Search from "../../components/searchbar/Search";
import list5 from "../../images/list5.png";

import playicon from "../../images/icons/play.svg";
import hearticon from "../../images/icons/heart.svg";
import collectionicon from "../../images/icons/collection.svg";
import option from "../../images/icons/option.svg";

import { motion } from "framer-motion";
import { exit, fadeIn, fadeOut } from "../../animation/animation";

const Playlist = () => {
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
        <article className="song">
          <div className="stylebx">
            <img src={list5} alt="" />
            <img src={hearticon} alt="heart" />
          </div>
          <div className="stylebx">
            <p>name of song</p>
            <p>artist</p>
          </div>
          <div className="stylebx">
            <p>4.35</p>
            <button>
              <img src={option} alt="option" />
            </button>
          </div>
        </article>
      </section>
    </motion.main>
  );
};

export default Playlist;
