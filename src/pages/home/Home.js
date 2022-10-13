// icons and images import

import list1 from "../../images/list1.png";
import list2 from "../../images/list2.png";
import list3 from "../../images/list3.png";
import { AiOutlineHeart } from "react-icons/ai";
import heroimg from "../../images/hero.svg";

//dependency import

import useAuth from "../../useAuth";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Search from "../../components/searchbar/Search";
import { motion } from "framer-motion";
import { exit, fadeIn, fadeOut } from "../../animation/animation";
import SpotifyWebApi from "spotify-web-api-node";

import { useSelector } from "react-redux";

// swiper css impirt
import "swiper/css";
import { GetFeaturedList, GetNewReleases } from "../../utils/utils";

// initilize spotify client

const spotifyApi = new SpotifyWebApi({
  clientId: "5bcbd8541e76465481838de8f049a1fc",
});

const Home = () => {
  const [newRelease, setnewRelease] = useState([]);
  const [FeaturedPlaylist, setFeaturedPlaylist] = useState([]);

  const accesstoken = useSelector((state) => state.Auth.accessToken);

  const getdata = async () => {
    setnewRelease(await GetNewReleases(accesstoken));
    setFeaturedPlaylist(await GetFeaturedList(accesstoken));
  };

  useEffect(() => {
    if (!accesstoken) return;
    spotifyApi.setAccessToken(accesstoken);

    getdata();
  }, [accesstoken]);

  return (
    <motion.main
      initial={fadeIn}
      animate={fadeOut}
      exit={exit}
      className="home"
    >
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

          <Link to="/playlist">
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
          </Link>
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
          <Swiper
            slidesPerView={2}
            breakpoints={{
              640: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 7,
                spaceBetween: 20,
              },
            }}
            spaceBetween={15}
            className="mySwiper"
          >
            {newRelease &&
              newRelease.map((newalbum, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Link to="/playlist" playlisturl={newalbum.url}>
                      <img src={newalbum.albumUrl} alt={newalbum.title} />
                    </Link>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </section>
      <section className="new-release">
        <h2>Featured Playlist.</h2>
        <div className="release-box">
          <Swiper
            slidesPerView={2}
            breakpoints={{
              640: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 7,
                spaceBetween: 20,
              },
            }}
            spaceBetween={15}
            className="mySwiper"
          >
            {FeaturedPlaylist &&
              FeaturedPlaylist.map((playlist, index) => {
                let url = playlist.url;
                url = url.slice(url.indexOf("playlist:") + 9);

                return (
                  <SwiperSlide key={index}>
                    <Link to={`/playlist/${url}`}>
                      <img src={playlist.playlistUrl} alt="playlist" />
                    </Link>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </section>
    </motion.main>
  );
};

export default Home;
