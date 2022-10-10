import React from "react";
import Search from "../../components/searchbar/Search";
import list5 from "../../images/list5.png";

import playicon from "../../images/icons/play.svg";
import hearticon from "../../images/icons/heart.svg";
import collectionicon from "../../images/icons/collection.svg";

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
          <img src={list5} alt="" />

          <p>name of song</p>
          <p>artist</p>
          <p>durtion</p>
          <button>more option</button>
        </article>
        <article className="song">
          <img src={list5} alt="" />

          <p>name of song</p>
          <p>artist</p>
          <p>durtion</p>
          <button>more option</button>
        </article>
        <article className="song">
          <img src={list5} alt="" />

          <p>name of song</p>
          <p>artist</p>
          <p>durtion</p>
          <button>more option</button>
        </article>
        <article className="song">
          <img src={list5} alt="" />

          <p>name of song</p>
          <p>artist</p>
          <p>durtion</p>
          <button>more option</button>
        </article>
      </section>
    </motion.main>
  );
};

export default Playlist;
