import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/productsSlice";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites);
  const isFavorite = favorites.includes(product.id);

  const handleFavoriteChange = () => {
    dispatch(toggleFavorite(product.id));
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        width: "220px",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100px", height: "100px", objectFit: "contain" }}
      />
      <h4 style={{ fontSize: "1rem", margin: "0.5rem 0" }}>
        {product.title.length > 40 ? product.title.slice(0, 40) + "..." : product.title}
      </h4>
      <p style={{ fontWeight: "bold", margin: 0 }}>${product.price}</p>

      <Link to={`/product/${product.id}`}>
        <button
          style={{
            marginTop: "0.5rem",
            padding: "0.3rem 0.6rem",
            cursor: "pointer",
            borderRadius: "4px",
            border: "1px solid #007bff",
            backgroundColor: "#007bff",
            color: "white",
          }}
        >
          Ver más detalles
        </button>
      </Link>
      
      <Link to={`/edit-product/${product.id}`}>
        <button
          style={{
          marginTop: "0.5rem",
          padding: "0.3rem 0.6rem",
          cursor: "pointer",
          borderRadius: "4px",
          border: "1px solid #28a745",
          backgroundColor: "#28a745",
          color: "white",
      }}
        >
        Editar
        </button>
      </Link>

      <label
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <input
          type="checkbox"
          checked={isFavorite}
          onChange={handleFavoriteChange}
          style={{ marginRight: "5px" }}
        />
        ❤️
      </label>
    </div>
  );
}
