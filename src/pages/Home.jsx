import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productsSlice";
import ProductList from "../components/ProductList";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (products.length === 0) {
      const fetchProducts = async () => {
        try {
          const res = await fetch("https://fakestoreapi.com/products");
          const data = await res.json();
          dispatch(setProducts(data));
        } catch (error) {
          console.error("Error al traer productos:", error);
        }
      };

      fetchProducts();
    }
  }, [dispatch, products.length]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Listado de Productos</h2>
      <ProductList products={products} />
    </div>
  );
}