import React from "react";
import Search from "../../components/searchbar/Search";

import list1 from "../../images/list6.png";
import list2 from "../../images/list8.png";
import list3 from "../../images/list9.png";
import list4 from "../../images/list10.png";

const Collection = () => {
  return (
    <main className="collection">
      <Search />
      <div className="filter">
        <button>my collection</button>
        <button>likes</button>
      </div>
      <div className="collection-list">
        <article className="collection-item">
          <img src={list1} alt="" />
          <article>
            <h2>Song name</h2>
            <p>artist</p>
          </article>
        </article>
        <article className="collection-item">
          <img src={list2} alt="" />
          <article>
            <h2>Song name</h2>
            <p>artist</p>
          </article>
        </article>
        <article className="collection-item">
          <img src={list3} alt="" />
          <article>
            <h2>Song name</h2>
            <p>artist</p>
          </article>
        </article>
        <article className="collection-item">
          <img src={list4} alt="" />
          <article>
            <h2>Song name</h2>
            <p>artist</p>
          </article>
        </article>
      </div>
    </main>
  );
};

export default Collection;
