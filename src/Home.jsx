import React, { useState } from "react";
import "./Home.css";
import Filters from "./components/Filters";
import Product from "./components/Product.jsx";

function Home() {
    const [filters, setFilters] = useState({});

  return (
    <div className="home-page">
      <div className="filters-section">
        <Filters onFilterChange={setFilters} />
      </div>
      <div className="products-section">
        <Product filters={filters} />
      </div>
    </div>
  );
}

export default Home;
