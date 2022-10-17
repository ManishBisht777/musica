import React from "react";
import Search from "../../components/searchbar/Search";
import { motion } from "framer-motion";
import { exit, fadeIn, fadeOut } from "../../animation/animation";
import { Link, Outlet } from "react-router-dom";

const Collection = () => {
  return (
    <motion.main
      initial={fadeIn}
      animate={fadeOut}
      exit={exit}
      className="collection"
    >
      <Search />
      <div className="filter">
        <ul>
          <li>
            <Link to="/collection/saved"> my collection</Link>
          </li>
          <li>
            <Link to="/collection/liked">likes</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </motion.main>
  );
};

export default Collection;
