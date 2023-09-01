import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {},
    isLoggedIn: localStorage.getItem("isLoggedIn") || false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
});


export default authSlice.reducer;