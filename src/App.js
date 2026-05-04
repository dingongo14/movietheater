import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { Navbar } from "./components/Navbar";
import Genre from "./pages/Genre";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />{" "}
        <Route path="/genre/:genreId" element={<Genre />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
