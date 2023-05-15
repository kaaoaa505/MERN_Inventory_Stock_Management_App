import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./Auth/AuthSlice";
import ProductSlice from "./Product/ProductSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        product: ProductSlice
    }
});

export default store;