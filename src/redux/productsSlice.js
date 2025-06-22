import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],     // Productos traídos de la API
  favorites: [],    // Array con IDs de productos favoritos
  selectedProduct: null, // Producto seleccionado para detalle
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Guarda los productos obtenidos de la API
    setProducts(state, action) {
      state.products = action.payload;
    },

    // Guarda el producto seleccionado para detalle
    setProductDetail(state, action) {
      state.selectedProduct = action.payload;
    },

    // Alterna entre favorito/no favorito
    toggleFavorite(state, action) {
      const id = action.payload;
      const isFavorite = state.favorites.includes(id);
      if (isFavorite) {
        state.favorites = state.favorites.filter(favId => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },

    // Elimina un producto del array (por id)
    deleteProduct(state, action) {
      const id = action.payload;
      state.products = state.products.filter(product => product.id !== id);
      state.favorites = state.favorites.filter(favId => favId !== id); // también lo saca de favoritos
    },

    // Edita un producto por id
    updateProduct(state, action) {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },

    // Agrega un producto nuevo
    addProduct(state, action) {
      state.products.push(action.payload);
    },
  },
});

export const {
  setProducts,
  setProductDetail,
  toggleFavorite,
  deleteProduct,
  updateProduct,
  addProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
