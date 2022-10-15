import React, { useEffect, useState } from "react";
import Search from "../../components/searchbar/Search";

import { motion } from "framer-motion";
import { exit, fadeIn, fadeOut } from "../../animation/animation";
import { useSelector } from "react-redux";
import { GetSavedPlaylist } from "../../utils/utils";

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
              <article className="collection-item" key={index}>
                <img src={collection.image} alt={collection.name} />
                <article>
                  <h2>{collection.name}</h2>
                  <p>{collection.artist}</p>
                </article>
              </article>
            );
          })}
      </div>
    </motion.main>
  );
};

export default Collection;
