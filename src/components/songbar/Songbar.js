import React from "react";
import song from "../../song/song.mp3";
import list1 from "../../images/list1.png";

const Songbar = () => {
  return (
    <div className="songbar">
      <img src={list1} alt="list" />
      <audio controls>
        <source src={song} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default Songbar;
