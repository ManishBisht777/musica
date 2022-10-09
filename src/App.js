import Navbar from "./components/navbar/Navbar";
import "./css/main.css";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Collection from "./pages/collection/Collection";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
    </>
  );
}

export default App;
