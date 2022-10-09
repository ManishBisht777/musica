import list1 from "../../images/list1.png";
import list2 from "../../images/list2.png";
import list3 from "../../images/list3.png";
import list4 from "../../images/list4.png";
import list5 from "../../images/list5.png";
import list6 from "../../images/list6.png";
import list7 from "../../images/list7.png";
import list8 from "../../images/list8.png";
import list9 from "../../images/list9.png";

import { AiOutlineHeart } from "react-icons/ai";

import heroimg from "../../images/hero.svg";
import Search from "../../components/searchbar/Search";

const Home = () => {
  return (
    <main className="home">
      <Search />
      <section className="top-chart-wrapper">
        <img className="banner" src={heroimg} alt="hero" />
        <article className="top-chart">
          <h1>top charts</h1>
          <article className="playlist">
            <img src={list1} alt="list1" />
            <div className="playlistinfo">
              <h2>golden dog</h2>
              <p>artist</p>
              <p className="time">2:34:45</p>
            </div>
            <div className="favourite">
              <AiOutlineHeart />
            </div>
          </article>
          <article className="playlist">
            <img src={list2} alt="list2" />
            <div className="playlistinfo">
              <h2>golden dog</h2>
              <p>artist</p>
              <p className="time">2:34:45</p>
            </div>
            <div className="favourite">
              <AiOutlineHeart />
            </div>
          </article>
          <article className="playlist">
            <img src={list3} alt="list3" />
            <div className="playlistinfo">
              <h2>golden dog</h2>
              <p>artist</p>
              <p className="time">2:34:45</p>
            </div>
            <div className="favourite">
              <AiOutlineHeart />
            </div>
          </article>
        </article>
      </section>
      <section className="new-release">
        <h2>new releases.</h2>
        <div className="release-box">
          <a href="/">
            <img src={list3} alt="list3" />
          </a>
          <a href="/">
            <img src={list4} alt="list1" />
          </a>
          <a href="/">
            <img src={list5} alt="list2" />
          </a>
          <a href="/">
            <img src={list6} alt="list3" />
          </a>
          <a href="/">
            <img src={list7} alt="list1" />
          </a>
          <a href="/">
            <img src={list8} alt="list1" />
          </a>
          <a href="/">
            <img src={list9} alt="list1" />
          </a>
        </div>
      </section>
      <section className="new-release">
        <h2>new releases.</h2>
        <div className="release-box">
          <a href="/">
            <img src={list1} alt="list1" />
          </a>
          <a href="/">
            <img src={list2} alt="list2" />
          </a>
          <a href="/">
            <img src={list3} alt="list3" />
          </a>
          <a href="/">
            <img src={list4} alt="list1" />
          </a>
          <a href="/">
            <img src={list5} alt="list2" />
          </a>
          <a href="/">
            <img src={list6} alt="list3" />
          </a>
          <a href="/">
            <img src={list7} alt="list1" />
          </a>
        </div>
      </section>
    </main>
  );
};

export default Home;
