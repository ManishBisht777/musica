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

import { Link } from "react-router-dom";

import heroimg from "../../images/hero.svg";
import Search from "../../components/searchbar/Search";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { motion } from "framer-motion";
import { exit, fadeIn, fadeOut } from "../../animation/animation";

import useAuth from "../../useAuth";
import { useEffect, useState } from "react";

import SpotifyWebApi from "spotify-web-api-node";
const spotifyApi = new SpotifyWebApi({
  clientId: "5bcbd8541e76465481838de8f049a1fc",
});

const Home = ({ code }) => {
  const [newRelease, setnewRelease] = useState([]);

  const accesstoken = useAuth(code);
  console.log(accesstoken);

  useEffect(() => {
    if (!accesstoken) return;
    spotifyApi.setAccessToken(accesstoken);

    spotifyApi.getNewReleases().then((res) => {
      setnewRelease(
        res.body.albums.items.map((album) => {
          const smallestAlbumImage = album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          }, album.images[0]);

          return {
            artist: album.artists[0].name,
            title: album.name,
            url: album.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
      console.log(res.body.albums.items);
    });
  }, [accesstoken]);

  console.log(newRelease);

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
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }}
            spaceBetween={15}
            className="mySwiper"
          >
            <SwiperSlide>
              <a href="/">
                <img src={list3} alt="list3" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/">
                <img src={list4} alt="list3" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/">
                <img src={list5} alt="list3" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/">
                <img src={list6} alt="list3" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/">
                <img src={list7} alt="list3" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/">
                <img src={list8} alt="list3" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/">
                <img src={list9} alt="list3" />
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <section className="new-release">
        <h2>new releases.</h2>
        <div className="release-box">
          <Swiper
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }}
            spaceBetween={15}
            className="mySwiper"
          >
            <SwiperSlide>
              <a href="/">
                <img src={list1} alt="list3" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/">
                <img src={list2} alt="list3" />
              </a>
            </SwiperSlide>{" "}
            <SwiperSlide>
              <a href="/">
                <img src={list5} alt="list3" />
              </a>
            </SwiperSlide>{" "}
            <SwiperSlide>
              <a href="/">
                <img src={list6} alt="list3" />
              </a>
            </SwiperSlide>{" "}
            <SwiperSlide>
              <a href="/">
                <img src={list7} alt="list3" />
              </a>
            </SwiperSlide>{" "}
            <SwiperSlide>
              <a href="/">
                <img src={list8} alt="list3" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/">
                <img src={list9} alt="list3" />
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </motion.main>
  );
};

export default Home;
