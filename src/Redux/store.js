import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from '../Redux/Slices/AuthSlice';
const store = configureStore({
    reducer: {
        auth: authSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
});

export default store;