import React, { useState } from "react";
import "./Filters.css";

function Filters({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSurfaces, setSelectedSurfaces] = useState([]);

  const sizes = ["Small", "Medium", "Large"];
  const materials = ["Paper", "Canvas", "Metal"];
  const surfaces = ["Glossy", "Matte", "Textured"];

  const handleFilterChange = () => {
    onFilterChange({
      priceRange,
      selectedSizes,
      selectedMaterials,
      selectedSurfaces,
    });
  };

  return (
    <div className="filters">
      {/* filter price */}
      <div className="filter-group">
        <h3>Price</h3>
        <div className="price-slider">
          <span>${priceRange[0]}</span>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value), priceRange[1]])
            }
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
          />
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* material filter */}
      <div className="filter-group">
        <h3>Material</h3>
        {materials.map((material) => (
          <div key={material} className="checkbox-group">
            <input
              type="checkbox"
              id={`material-${material}`}
              onChange={(e) =>
                setSelectedMaterials((prev) =>
                  prev.includes(material)
                    ? prev.filter((m) => m !== material)
                    : [...prev, material]
                )
              }
            />
            <label htmlFor={`material-${material}`}>{material}</label>
            <small>Description</small>
          </div>
        ))}
      </div>

      {/* surface filter */}
      <div className="filter-group">
        <h3>Surface</h3>
        {surfaces.map((surface) => (
          <div key={surface} className="checkbox-group">
            <input
              type="checkbox"
              id={`surface-${surface}`}
              onChange={(e) =>
                setSelectedSurfaces((prev) =>
                  prev.includes(surface)
                    ? prev.filter((s) => s !== surface)
                    : [...prev, surface]
                )
              }
            />
            <label htmlFor={`surface-${surface}`}>{surface}</label>
          </div>
        ))}
      </div>

      {/* size filter */}
      <div className="filter-group">
        <h3>Size</h3>
        {sizes.map((size) => (
          <div key={size} className="checkbox-group">
            <input
              type="checkbox"
              id={`size-${size}`}
              onChange={(e) =>
                setSelectedSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
            />
            <label htmlFor={`size-${size}`}>{size}</label>
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
