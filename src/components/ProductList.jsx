import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  if (!products.length) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>
      No hay productos para mostrar.
    </p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;