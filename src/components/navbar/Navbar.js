import React from "react";
import logo from "../../images/Logo.png";
import { HiHome } from "react-icons/hi";
import { BsFillCollectionPlayFill } from "react-icons/bs";

const Navbar = () => {
  return (
    <nav>
      <a href="/" aria-label="muscia">
        <img src={logo} alt="musica" />
      </a>
      <ul>
        <li>
          <a aria-label="home" href="/">
            <HiHome />
            home
          </a>
        </li>
        <li>
          <a aria-label="home" href="/">
            <HiHome />
            home
          </a>
        </li>
        <li>
          <a aria-label="home" href="/">
            <HiHome />
            home
          </a>
        </li>
        <li>
          <a aria-label="home" href="/">
            <HiHome />
            home
          </a>
        </li>
        <li>
          <a aria-label="home" href="/">
            <HiHome />
            home
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a aria-label="collection" href="/">
            <BsFillCollectionPlayFill />
            Profile
          </a>
        </li>
        <li>
          <a aria-label="collection" href="/">
            <BsFillCollectionPlayFill />
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
