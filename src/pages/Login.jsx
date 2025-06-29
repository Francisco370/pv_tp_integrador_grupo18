import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Correo inválido";
      valid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneralError("");
    if (!validate()) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === formData.email);

    if (!user) {
      setGeneralError("El usuario no existe. Por favor, regístrate.");
      return;
    }
    if (user.password !== formData.password) {
      setGeneralError("Contraseña incorrecta.");
      return;
    }

    dispatch(login({ email: user.email }));
    navigate("/");
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <Typography
        variant="h4"
        component="h2"
        textAlign="center"
        color="text.primary"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: "bold",
          letterSpacing: "0.5px",
          mb: 2,
        }}
      >
        Iniciar sesión
      </Typography>

      {generalError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {generalError}
        </Alert>
      )}

      <TextField
        label="Correo electrónico"
        name="email"
        type="email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
        required
      />

      <TextField
        label="Contraseña"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={handleChange}
        error={Boolean(errors.password)}
        helperText={errors.password}
        required
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
        Ingresar
      </Button>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Typography variant="body2" sx={{ color: "#213547", fontWeight: "bold" }}>
          ¿No tienes cuenta?{" "}
          <Link to="/register" style={{ textDecoration: "underline", color: "#1976d2", fontWeight: "bold" }}>
            Registrarse
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;