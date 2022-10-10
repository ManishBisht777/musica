import Navbar from "./components/navbar/Navbar";
import "./css/main.css";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Collection from "./pages/collection/Collection";
import Playlist from "./pages/playlist/Playlist";

import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <>
      <Navbar />
      <AnimatePresence custom="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/playlist" element={<Playlist />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
