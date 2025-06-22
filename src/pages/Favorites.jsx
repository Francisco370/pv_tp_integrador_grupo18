import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Favorites = () => {
  const products = useSelector((state) => state.products.products);
  const favorites = useSelector((state) => state.products.favorites);

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  if (favoriteProducts.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>No hay productos favoritos.</p>;
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Productos Favoritos</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
