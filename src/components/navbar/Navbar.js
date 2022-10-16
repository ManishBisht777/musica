import React, { useState } from "react";
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
import { BiMenu } from "react-icons/bi";

const Navbar = () => {
  const [togglenav, settogglenav] = useState(false);

  return (
    <nav>
      <Link to="/" aria-label="muscia">
        <img src={logo} alt="musica" />
      </Link>

      <button
        className="hamburger"
        aria-expanded={togglenav}
        aria-label="toggle-menu"
        onClick={() => {
          settogglenav(!togglenav);
        }}
      >
        <BiMenu />
      </button>
      <div className="navlinks">
        <ul>
          <li>
            <Link
              aria-label="home"
              to="/"
              onClick={() => {
                settogglenav(!togglenav);
              }}
            >
              <BiHomeAlt />
            </Link>
          </li>
          <li>
            <Link
              aria-label="collection"
              to="/collection"
              onClick={() => {
                settogglenav(!togglenav);
              }}
            >
              <img src={playlist} alt="collection-icon" />
            </Link>
          </li>
          <li>
            <Link
              aria-label="radio"
              to="/radio"
              onClick={() => {
                settogglenav(!togglenav);
              }}
            >
              <img src={radio} alt="radio-icon" />
            </Link>
          </li>
          <li>
            <Link
              aria-label="music"
              to="/music"
              onClick={() => {
                settogglenav(!togglenav);
              }}
            >
              <img src={music} alt="music-icon" />
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link
              aria-label="profile"
              to="/"
              onClick={() => {
                settogglenav(!togglenav);
              }}
            >
              <img src={profile} alt="rofile-icon" />
            </Link>
          </li>
          <li>
            <Link
              aria-label="logout"
              to="/"
              onClick={() => {
                settogglenav(!togglenav);
              }}
            >
              <img src={logout} alt="logout-icon" />
            </Link>
          </li>
        </ul>
      </div>

      <Songbar />
    </nav>
  );
};

export default Navbar;
