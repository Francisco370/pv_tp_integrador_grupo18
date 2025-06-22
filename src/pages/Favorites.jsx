import React from "react";
import { useSelector } from "react-redux";
import ProductList from "../components/ProductList";

const Favorites = () => {
  const products = useSelector((state) => state.products.products);
  const favorites = useSelector((state) => state.products.favorites);

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Productos Favoritos</h2>
      <ProductList products={favoriteProducts} />
    </div>
  );
};

export default Favorites;
