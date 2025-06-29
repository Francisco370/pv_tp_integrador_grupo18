import React from "react";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";

const ProductList = ({ products }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;