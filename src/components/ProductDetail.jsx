import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAll,
  getMaterials,
  getSurfaces,
  getByArtist,
} from "../api/fetch";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [moreFromArtist, setMoreFromArtist] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [products, materialData, surfaceData] = await Promise.all([
          getAll(),
          getMaterials(),
          getSurfaces(),
        ]);

        const selectedProduct = products.find((p) => p.id === parseInt(id));
        if (!selectedProduct) {
          return;
        }

        const materialObj = materialData.find((m) => m.id === selectedProduct.id_material);
        const surfaceObj = surfaceData.find((s) => s.id === selectedProduct.id_surface);

        const sizeString = `${selectedProduct.width} x ${selectedProduct.height}`;

        const productWithProps = {
          ...selectedProduct,
          material: materialObj ? materialObj.name : "Unknown",
          surface: surfaceObj ? surfaceObj.name : "Unknown",
          size: sizeString,
          image: selectedProduct.share_path,
          artistName: selectedProduct.name || "Unknown",
          date: selectedProduct.uploaded_date || "",
        };

        setProduct(productWithProps);

        const artistId = selectedProduct.id_user;
        const otherWorks = products.filter(
            (p) => p.id_user === artistId && p.id !== selectedProduct.id
        );
        setMoreFromArtist(otherWorks);

        const artistReviews = await getByArtist(artistId);
        setReviews(artistReviews);
      } catch (error) {
        console.error("Failed to fetch product details:", error.message);
      }
    };

    fetchProductData();
  }, [id]);

  const renderStars = (rating) => {
    return (
        <div className="stars">
          {[...Array(5)].map((_, index) => (
              <img
                  key={index}
                  src={`/svg/rating/${index < rating ? "star-full" : "star-empty"}.svg`}
                  alt={index < rating ? "Full Star" : "Empty Star"}
                  className="star-icon"
              />
          ))}
        </div>
    );
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
      <div className="product-detail-page">
        <button className="back-button" onClick={() => navigate("/")}>
          &lt; Back
        </button>

        <div className="product-detail">
          <div className="product-image-section">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="wishlist-icon">♥️</div>
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-price">${product.price}</p>
            <div className="product-meta">
              <div className="product-meta-item">
                <p className="meta-label">Material:</p>
                <p className="meta-value">{product.material}</p>
              </div>
              <div className="product-meta-item">
                <p className="meta-label">Surface:</p>
                <p className="meta-value">{product.surface}</p>
              </div>
              <div className="product-meta-item">
                <p className="meta-label">Size:</p>
                <p className="meta-value">{product.size}</p>
              </div>
            </div>

            <div className="product-artist">
              <p>
                <strong>Artist:</strong> {product.artistName}
              </p>
              <p className="product-date">Uploaded: {product.date}</p>
            </div>
            <div className="product-actions">
              <button className="add-to-cart-button">Add to cart</button>
            </div>
            <p className="product-description">{product.description}</p>
          </div>
        </div>

        <section className="reviews-section">
          <h2>Latest reviews</h2>
          {reviews.length > 0 ? (
              <div className="reviews">
                {reviews.map((review) => (
                    <div key={review.id} className="review">
                      {renderStars(review.rating)}
                      <h3>{review.title}</h3>
                      <p>{review.body}</p>
                      <p className="review-author">
                        <strong>Author:</strong> {review.reviewerName || "Unknown"}
                      </p>
                      <p className="review-date">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                ))}
              </div>
          ) : (
              <p>No reviews available for this artist.</p>
          )}
        </section>

        <section className="more-from-artist-section">
          <h2>More from the artist</h2>
          <div className="more-products">
            {moreFromArtist.length > 0 ? (
                moreFromArtist.map((artwork) => (
                    <div
                        key={artwork.id}
                        className="more-product-card"
                        onClick={() => navigate(`/product/${artwork.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                      <img
                          src={artwork.share_path}
                          alt={artwork.title}
                          className="more-product-image"
                      />
                      <p className="more-product-title">{artwork.title}</p>
                    </div>
                ))
            ) : (
                <p>No other works from this artist</p>
            )}
          </div>
        </section>
      </div>
  );
}

export default ProductDetail;
