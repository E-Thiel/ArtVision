import React, { useState, useContext, createContext } from "react";
import "./Home.css";
import Filters from "./components/Filters/Filters.jsx";
import Product from "./components/Products/Product.jsx";
import HeroSection from "./components/HeroSection/HeroSection.jsx";

const FilterContext = createContext();

export const useFilters = () => useContext(FilterContext);

function Home() {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <FilterContext.Provider value={{ filters, setFilters, searchQuery, setSearchQuery }}>
      <HeroSection />
      <div className="home-page">
        <div className="filters-section">
          <Filters />
        </div>
        <div className="products-section">
          <Product />
        </div>
      </div>
    </FilterContext.Provider>
  );
}

export default Home;
