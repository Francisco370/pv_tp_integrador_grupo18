import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../redux/productsSlice";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const products = useSelector((state) => state.products.products);
  const existingProduct = products.find((p) => p.id === Number(productId));

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        title: existingProduct.title,
        price: existingProduct.price,
        description: existingProduct.description,
        category: existingProduct.category,
        image: existingProduct.image,
      });
    }
  }, [existingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productId) {
      dispatch(updateProduct({ id: Number(productId), ...formData }));
    } else {
      dispatch(addProduct(formData));
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>{productId ? "Editar Producto" : "Crear Producto"}</h2>
      <TextField
        label="Título"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Precio"
        name="price"
        value={formData.price}
        onChange={handleChange}
        type="number"
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Categoría"
        name="category"
        value={formData.category}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="URL Imagen"
        name="image"
        value={formData.image}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        {productId ? "Actualizar" : "Crear"}
      </Button>
    </form>
  );
};

export default ProductForm;
