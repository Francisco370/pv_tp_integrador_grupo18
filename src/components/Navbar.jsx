import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0', marginBottom: '1rem' }}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', margin: 0, padding: 0 }}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/favorites">Favoritos</Link></li>
        <li><Link to="/create-product">Crear Producto</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
