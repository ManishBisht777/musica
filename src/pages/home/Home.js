// icons and images import
import { AiOutlineHeart } from "react-icons/ai";
import heroimg from "../../images/hero.svg";

//dependency import

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Search from "../../components/searchbar/Search";
import { motion } from "framer-motion";
import { exit, fadeIn, fadeOut } from "../../animation/animation";

import { useDispatch, useSelector } from "react-redux";

// swiper css impirt
import "swiper/css";
import {
  GetCategories,
  GetCategoryPlaylist,
  GetFeaturedList,
  GetNewReleases,
  GetUser,
} from "../../utils/utils";
import { setUser } from "../../store/Authslice";

// initilize spotify client

const Home = () => {
  const [newRelease, setnewRelease] = useState([]);
  const [FeaturedPlaylist, setFeaturedPlaylist] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [Topchart, setTopchart] = useState([]);
  const dispatch = useDispatch();

  const accesstoken = useSelector((state) => state.Auth.accessToken);

  useEffect(() => {
    if (!accesstoken) return;

    const getdata = async () => {
      setnewRelease(await GetNewReleases(accesstoken));
      setFeaturedPlaylist(await GetFeaturedList(accesstoken));
      setCategories(await GetCategories(accesstoken));
      setTopchart(await GetCategoryPlaylist(accesstoken));
      dispatch(setUser(await GetUser(accesstoken)));
    };

    getdata();
  }, [accesstoken, dispatch]);

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
          <h1>new releases</h1>

          {newRelease &&
            newRelease.map((newalbum, index) => {
              let url = newalbum.url;
              url = url.slice(url.indexOf("album:") + 6);

              return (
                <Link to={`/browse/album/${url}`} key={index}>
                  <article className="playlist">
                    <img src={newalbum.albumUrl} alt={newalbum.title} />
                    <div className="playlistinfo">
                      <h2>{newalbum.name}</h2>
                      <p>{newalbum.artist}</p>
                      <p className="time">2:34:45</p>
                    </div>
                    <div className="favourite">
                      <AiOutlineHeart />
                    </div>
                  </article>
                </Link>
              );
            })}
        </article>
      </section>
      <section className="new-release">
        <h2>top charts</h2>
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
            {Topchart &&
              Topchart.map((chart, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Link to={`/browse/playlist/${chart.playlistid}`}>
                      <img src={chart.image} alt="playlist" loading="lazy" />
                    </Link>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </section>
      <section className="new-release">
        <h2>Browse categories</h2>
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
            {Categories &&
              Categories.map((category, index) => {
                return (
                  <SwiperSlide key={index}>
                    <img
                      src={category.icons[0].url}
                      alt={category.name}
                      loading="lazy"
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </section>
      <section className="new-release">
        <h2>Featured Playlist</h2>
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
                    <Link to={`/browse/playlist/${url}`}>
                      <img
                        src={playlist.playlistUrl}
                        alt="playlist"
                        loading="lazy"
                      />
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
