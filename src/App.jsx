import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx'; // Tu página actual con el listado
import ProductDetail from './pages/ProductDetail.jsx';
import Favorites from './pages/Favorites.jsx';
import ProductForm from './components/ProductForm.jsx';

function App() {
  return (
    <>
      <Navbar /> {/* El menú de navegación será visible en todas las páginas */}
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/create-product" element={<ProductForm />} />
          <Route path="/edit-product/:productId" element={<ProductForm />} />
          {/* Puedes añadir una ruta para Not Found */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>
    </>
  );
}

export default App;
