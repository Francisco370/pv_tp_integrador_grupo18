import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "1rem",
        backgroundColor: "#f0f0f0",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap"
      }}
    >
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "1rem",
          margin: 0,
          padding: 0,
        }}
      >
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/favorites">Favoritos</Link></li>
        <li><Link to="/create-product">Crear Producto</Link></li>
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registro</Link></li>
          </>
        )}
      </ul>

      {user && (
        <div>
          <span>Bienvenido, {user.email}</span>
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "1rem",
              cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
