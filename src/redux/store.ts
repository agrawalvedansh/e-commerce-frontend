import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { usreReducer } from "./reducer/userReducer";
import { productAPI } from "./api/productAPI";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderAPI";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer:{
        [userAPI.reducerPath]: userAPI.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [usreReducer.name]: usreReducer.reducer,
        [cartReducer.name]: cartReducer.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware, productAPI.middleware, orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

