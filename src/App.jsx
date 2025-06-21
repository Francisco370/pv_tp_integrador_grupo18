import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Tu página actual con el listado
import ProductDetailPage from './pages/ProductDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import ProductFormPage from './pages/ProductFormPage';
import Navbar from './components/Navbar'; // Un componente de navegación que crearás

function App() {
  return (
    <>
      <Navbar /> {/* El menú de navegación será visible en todas las páginas */}
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/create-product" element={<ProductFormPage />} />
          <Route path="/edit-product/:productId" element={<ProductFormPage />} />
          {/* Puedes añadir una ruta para Not Found */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>
    </>
  );
}

export default App;