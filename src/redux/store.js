import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import useReducer from "./userSlice"

export const store = configureStore({
    reducer: {
        user: userReducer
    }
});
export default store;