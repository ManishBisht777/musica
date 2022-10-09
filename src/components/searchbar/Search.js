import React from "react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <div className="search">
      <BsSearch /> <input type="text" placeholder="serach your song here" />
    </div>
  );
};

export default Search;
