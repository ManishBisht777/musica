import React, { useEffect, useState } from "react";
import Search from "../../components/searchbar/Search";

import { motion } from "framer-motion";
import { exit, fadeIn, fadeOut } from "../../animation/animation";
import { useSelector } from "react-redux";
import { GetSavedPlaylist } from "../../utils/utils";
import { Link } from "react-router-dom";

const Collection = () => {
  const accesstoken = useSelector((state) => state.Auth.accessToken);
  const userID = useSelector((state) => state.Auth.id);

  const [collections, setcollections] = useState([]);

  useEffect(() => {
    if (!accesstoken) return;
    if (!userID) return;

    const getalbum = async () => {
      setcollections(await GetSavedPlaylist(accesstoken));
    };

    getalbum();
  }, [accesstoken, userID]);

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
    </motion.main>
  );
};

export default Collection;
