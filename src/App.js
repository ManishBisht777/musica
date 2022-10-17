import Navbar from "./components/navbar/Navbar";
import "./css/main.css";
import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Collection from "./pages/collection/Collection";
import Playlist from "./pages/playlist/Playlist";

import { AnimatePresence } from "framer-motion";
import Login from "./components/login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setToken } from "./store/Authslice";
import Radio from "./pages/radio/Radio";
import Music from "./pages/music/Music";
import Saved from "./pages/collection/Saved";
import Liked from "./pages/collection/Liked";

function App() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.Auth.accessToken);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return (
    <>
      {token ? (
        <>
          <Navbar />
          <AnimatePresence custom="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collection" element={<Collection />}>
                <Route
                  path="/collection"
                  element={<Navigate to="/collection/saved" />}
                />
                <Route path="saved" element={<Saved />} />
                <Route path="liked" element={<Liked />} />
              </Route>
              <Route path="/browse/:type/:id" element={<Playlist />} />
              <Route path="/radio" element={<Radio />} />
              <Route path="/music" element={<Music />} />
            </Routes>
          </AnimatePresence>
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
}

export default App;
