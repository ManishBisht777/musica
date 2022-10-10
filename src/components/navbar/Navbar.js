import React from "react";
import logo from "../../images/logo.svg";
import Songbar from "../songbar/Songbar";

import { Link } from "react-router-dom";

// icons import
import { BiHomeAlt } from "react-icons/bi";
import logout from "../../images/icons/Logout.svg";
import music from "../../images/icons/music.svg";
import playlist from "../../images/icons/playlist.svg";
import profile from "../../images/icons/profile.svg";
import radio from "../../images/icons/radio.svg";

const Navbar = () => {
  return (
    <nav>
      <Link to="/" aria-label="muscia">
        <img src={logo} alt="musica" />
      </Link>
      <ul>
        <li>
          <Link aria-label="home" to="/">
            <BiHomeAlt />
          </Link>
        </li>
        <li>
          <Link aria-label="collection" to="/collection">
            <img src={playlist} alt="collection-icon" />
          </Link>
        </li>
        <li>
          <Link aria-label="radio" to="/">
            <img src={radio} alt="radio-icon" />
          </Link>
        </li>
        <li>
          <Link aria-label="music" to="/">
            <img src={music} alt="music-icon" />
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link aria-label="profile" to="/">
            <img src={profile} alt="rofile-icon" />
          </Link>
        </li>
        <li>
          <Link aria-label="logout" to="/">
            <img src={logout} alt="logout-icon" />
          </Link>
        </li>
      </ul>
      <Songbar />
    </nav>
  );
};

export default Navbar;