import Navbar from "./components/navbar/Navbar";
import "./css/main.css";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Collection from "./pages/collection/Collection";
import Playlist from "./pages/playlist/Playlist";

import { AnimatePresence } from "framer-motion";
import Login from "./components/login/Login";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return code ? (
    <>
      <Navbar code={code} />
      <AnimatePresence custom="wait">
        <Routes>
          <Route path="/" element={<Home />} code={code} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/playlist" element={<Playlist />} />
        </Routes>
      </AnimatePresence>
    </>
  ) : (
    <>
      <Login />
    </>
  );
}

export default App;
