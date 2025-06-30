import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],     // Productos traídos de la API o creados
  favorites: [],    // IDs de productos marcados como favoritos
  selectedProduct: null, // Producto mostrado en detalle
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Carga productos desde API (sin duplicar)
    setProducts(state, action) {
      const apiProducts = action.payload;
      const existingIds = state.products.map(p => p.id);
      const newApiProducts = apiProducts.filter(p => !existingIds.includes(p.id));
      state.products = [...state.products, ...newApiProducts];
    },

    // Guarda producto seleccionado
    setProductDetail(state, action) {
      state.selectedProduct = action.payload;
    },

    // Alternar favorito
    toggleFavorite(state, action) {
      const id = action.payload;
      const isFavorite = state.favorites.includes(id);
      if (isFavorite) {
        state.favorites = state.favorites.filter(favId => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },

    // Eliminar producto
    deleteProduct(state, action) {
      const id = action.payload;
      state.products = state.products.filter(product => product.id !== id);
      state.favorites = state.favorites.filter(favId => favId !== id);
    },

    // Editar producto (asegura que tenga rating)
    updateProduct(state, action) {
      const updatedProduct = {
        ...action.payload,
        rating: action.payload.rating || { rate: 0, count: 0 },
      };
      const index = state.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },

    // Agregar nuevo producto (asegura que tenga rating)
    addProduct(state, action) {
      const product = {
        ...action.payload,
        rating: action.payload.rating || { rate: 0, count: 0 },
      };
      state.products.push(product);
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
