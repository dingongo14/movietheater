import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { Navbar } from "./components/Navbar";
import Genre from "./pages/Genre";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import NotFound from "./pages/NotFound";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <BrowserRouter>
      <Navbar onSelectItem={setSelectedItem} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/genre/:genreId" element={<Genre />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />

      {/* Modal global — renderiza por cima de tudo */}
      {selectedItem && (
        <ProductDetails
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
