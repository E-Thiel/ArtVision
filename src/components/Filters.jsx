import React, { useState, useEffect } from "react";
import { useFilters } from "../Home";
import {
  getMaterials,
  getSurfaces,
  getDimensions
} from "../api/fetch";
import "./Filters.css";

function Filters() {
  const { setFilters } = useFilters();

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSurfaces, setSelectedSurfaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [materials, setMaterials] = useState([]);
  const [surfaces, setSurfaces] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [materialsData, surfacesData, dimensionsData] = await Promise.all([
          getMaterials(),
          getSurfaces(),
          getDimensions(),
        ]);
        setMaterials(materialsData);
        setSurfaces(surfacesData);
        setSizes(dimensionsData);
      } catch (error) {
        console.error("Failed to fetch filter data:", error);
      }
    };

    fetchFilters();
  }, []);

  const handleFilterChange = () => {
    setFilters({
      priceRange,
      selectedSizes,
      selectedMaterials,
      selectedSurfaces,
      searchQuery,
    });
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value) || 0;
    setPriceRange(newRange);
  };

  const handleMaterialCheckbox = (materialId) => {
    setSelectedMaterials((prev) =>
        prev.includes(materialId)
            ? prev.filter((id) => id !== materialId)
            : [...prev, materialId]
    );
  };

  const handleSurfaceCheckbox = (surfaceId) => {
    setSelectedSurfaces((prev) =>
        prev.includes(surfaceId)
            ? prev.filter((id) => id !== surfaceId)
            : [...prev, surfaceId]
    );
  };

  const handleSizeCheckbox = (dimensionId) => {
    setSelectedSizes((prev) =>
        prev.includes(dimensionId)
            ? prev.filter((id) => id !== dimensionId)
            : [...prev, dimensionId]
    );
  };

  return (
      <div className="filters">
        {/* Search bar */}
        <div className="filter-group">
          <h3>Search</h3>
          <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
          />
        </div>

        {/* Filter price */}
        <div className="filter-group">
          <h3>Price</h3>
          <div className="price-inputs">
            <input
                type="number"
                min="0"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                placeholder="Min Price"
            />
            <span>to</span>
            <input
                type="number"
                min="0"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                placeholder="Max Price"
            />
          </div>
        </div>

        {/* Material filter */}
        <div className="filter-group">
          <h3>Material</h3>
          {materials.map((material) => (
              <div key={material.id} className="checkbox-group">
                <input
                    type="checkbox"
                    id={`material-${material.name}`}
                    checked={selectedMaterials.includes(material.id)}
                    onChange={() => handleMaterialCheckbox(material.id)}
                />
                <label htmlFor={`material-${material.name}`}>{material.name}</label>
              </div>
          ))}
        </div>

        {/* Surface filter */}
        <div className="filter-group">
          <h3>Surface</h3>
          {surfaces.map((surface) => (
              <div key={surface.id} className="checkbox-group">
                <input
                    type="checkbox"
                    id={`surface-${surface.name}`}
                    checked={selectedSurfaces.includes(surface.id)}
                    onChange={() => handleSurfaceCheckbox(surface.id)}
                />
                <label htmlFor={`surface-${surface.name}`}>{surface.name}</label>
              </div>
          ))}
        </div>

        {/* Size filter */}
        <div className="filter-group">
          <h3>Size</h3>
          {sizes.map((size) => (
              <div key={size.id} className="checkbox-group">
                <input
                    type="checkbox"
                    id={`size-${size.name}`}
                    checked={selectedSizes.includes(size.id)}
                    onChange={() => handleSizeCheckbox(size.id)}
                />
                <label htmlFor={`size-${size.name}`}>{size.name}</label>
              </div>
          ))}
        </div>

        <button className="apply-filters" onClick={handleFilterChange}>
          Apply Filters
        </button>
      </div>
  );
}

export default Filters;
