import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./Auth/AuthSlice";
import ProductSlice from "./Product/ProductSlice";
import SearchSlice from "./Product/SearchSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    product: ProductSlice,
    search: SearchSlice,
  },
});

export default store;
