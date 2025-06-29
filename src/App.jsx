import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import ProductDetail from "./pages/ProductDetail";
import ProductForm from "./components/ProductForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./router/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <main style={{ flexGrow: 1, width: '100%', maxWidth: 1200, margin: '0 auto', padding: '1rem' }}>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas privadas */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-product"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-product/:productId"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
