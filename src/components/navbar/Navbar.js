import React from "react";
import logo from "../../images/logo.svg";
import Songbar from "../songbar/Songbar";

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
      <a href="/" aria-label="muscia">
        <img src={logo} alt="musica" />
      </a>
      <ul>
        <li>
          <a aria-label="home" href="/">
            <BiHomeAlt />
          </a>
        </li>
        <li>
          <a aria-label="collection" href="/">
            <img src={playlist} alt="collection-icon" />
          </a>
        </li>
        <li>
          <a aria-label="radio" href="/">
            <img src={radio} alt="radio-icon" />
          </a>
        </li>
        <li>
          <a aria-label="music" href="/">
            <img src={music} alt="music-icon" />
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a aria-label="profile" href="/">
            <img src={profile} alt="rofile-icon" />
          </a>
        </li>
        <li>
          <a aria-label="logout" href="/">
            <img src={logout} alt="logout-icon" />
          </a>
        </li>
      </ul>
      <Songbar />
    </nav>
  );
};

export default Navbar;
