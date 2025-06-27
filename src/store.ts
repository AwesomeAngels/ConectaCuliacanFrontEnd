import { configureStore } from "@reduxjs/toolkit";
import { authApi } from './state/auth/authApi.ts';
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from "./state/auth/authReducer.ts";
import userReducer from './state/UserSlice.ts';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        authReducer,
        userReducer,
    },
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat(authApi.middleware),
})
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;