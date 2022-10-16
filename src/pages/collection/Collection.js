import React, { useEffect, useState } from "react";
import Search from "../../components/searchbar/Search";

import { motion } from "framer-motion";
import { exit, fadeIn, fadeOut } from "../../animation/animation";
import { useDispatch, useSelector } from "react-redux";
import {
  GetLikedPlaylist,
  GetLikedTracks,
  GetSavedPlaylist,
} from "../../utils/utils";
import { Link } from "react-router-dom";
import { SetCurrentPlaying } from "../../store/Songslice";

const Collection = () => {
  const accesstoken = useSelector((state) => state.Auth.accessToken);
  const userID = useSelector((state) => state.Auth.id);

  const [collections, setcollections] = useState([]);
  const [likedTracks, setlikedTracks] = useState([]);
  const [likedPlaylist, setlikedPlaylist] = useState([]);
  const [playingtrack, setplayingtrack] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accesstoken) return;
    if (!userID) return;

    const getalbum = async () => {
      setcollections(await GetSavedPlaylist(accesstoken));
      setlikedTracks(await GetLikedTracks(accesstoken));
      setlikedPlaylist(await GetLikedPlaylist(accesstoken));
    };

    getalbum();
  }, [accesstoken, userID]);

  useEffect(() => {
    if (playingtrack.length === 0) return;

    const trackinfo = {
      trackurl: playingtrack.trackurl,
      name: playingtrack.name,
      artist: playingtrack.artist,
      image: playingtrack.image,
      artistid: playingtrack.artistid,
    };

    dispatch(SetCurrentPlaying(trackinfo));
  }, [playingtrack, dispatch]);

  return (
    <motion.main
      initial={fadeIn}
      animate={fadeOut}
      exit={exit}
      className="collection"
    >
      <Search />
      <div className="filter">
        <button>my collection</button>
        <button>likes</button>
      </div>

      <div className="liked">
        <h2>your collection</h2>
        <div className="collection-list">
          {collections &&
            collections.map((collection, index) => {
              return (
                <Link to={`/browse/playlist/${collection.id}`} key={index}>
                  <article className="collection-item">
                    <img src={collection.image} alt={collection.name} />
                    <article>
                      <h2>{collection.name}</h2>
                      <p>{collection.artist}</p>
                    </article>
                  </article>
                </Link>
              );
            })}
        </div>
      </div>

      <div className="liked">
        <h2>Liked playlist</h2>
        <div className="collection-list">
          {likedPlaylist &&
            likedPlaylist.map((playlist, index) => {
              return (
                <Link to={`/browse/playlist/${playlist.id}`} key={index}>
                  <article className="collection-item">
                    <img src={playlist.image} alt={playlist.name} />
                    <article>
                      <h2>{playlist.name}</h2>
                      <p>{playlist.artist}</p>
                    </article>
                  </article>
                </Link>
              );
            })}
        </div>
      </div>

      <div className="liked">
        <h2>liked tracks</h2>
        {likedTracks &&
          likedTracks.map((track, index) => {
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
                </div>
                <div className="stylebx">
                  <p>{track.name}</p>
                  <p className="artist_name">{track.artist}</p>
                </div>
              </article>
            );
          })}
      </div>
    </motion.main>
  );
};

export default Collection;
