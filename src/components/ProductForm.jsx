import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../redux/productsSlice";
import { useNavigate, useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
      const existingRating = existingProduct?.rating || { rate: 0, count: 0 };
      dispatch(updateProduct({ id: Number(productId), ...formData, rating: existingRating }));
    } else {
      const newProduct = {
        ...formData,
        id: Date.now(),
        rating: {
          rate: 0,
          count: 0,
        },
      };
      dispatch(addProduct(newProduct));
    }

    navigate("/");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" component="h2" mb={2} textAlign="center">
        {productId ? "Editar Producto" : "Crear Producto"}
      </Typography>

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

      <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
        {productId ? "Actualizar" : "Crear"}
      </Button>
    </Box>
  );
};

export default ProductForm;
