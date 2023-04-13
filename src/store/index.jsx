import { configureStore } from "@reduxjs/toolkit";
import products from './slices/products.slice'
import isLoading from "./slices/isLoading.slice";
import prod from "./slices/prod.slice";

export default configureStore({
    reducer: {
        products,
        isLoading,
        prod
    }
})