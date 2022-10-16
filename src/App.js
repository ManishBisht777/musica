import Navbar from "./components/navbar/Navbar";
import "./css/main.css";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Collection from "./pages/collection/Collection";
import Playlist from "./pages/playlist/Playlist";

import { AnimatePresence } from "framer-motion";
import Login from "./components/login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setToken } from "./store/Authslice";

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
              <Route path="/collection" element={<Collection />} />
              <Route path="/playlist/:type/:id" element={<Playlist />} />
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
