import { createSlice } from "@reduxjs/toolkit";

// Recuperar usuario desde localStorage si existe
const getSessionUser = () => {
  const savedUser = localStorage.getItem("sessionUser");
  return savedUser ? JSON.parse(savedUser) : null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getSessionUser(), // Estado persistido
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("sessionUser", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("sessionUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;