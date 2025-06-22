import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../redux/productsSlice";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (productId) {
      const productToEdit = products.find((p) => p.id === parseInt(productId));
      if (productToEdit) {
        setFormData({
          title: productToEdit.title,
          price: productToEdit.price,
          description: productToEdit.description,
          category: productToEdit.category,
          image: productToEdit.image,
        });
      }
    }
  }, [productId, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productId) {
      dispatch(updateProduct({ id: parseInt(productId), ...formData }));
    } else {
      // Generar un id único simple para el nuevo producto
      const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
      dispatch(addProduct({ id: newId, ...formData }));
    }
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>{productId ? "Editar Producto" : "Crear Producto"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>URL Imagen:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          {productId ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
