import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as ProductService from "../../services/ProductService";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const storeProduct = createAsyncThunk(
  "products/store",
  async (formData, thunkAPI) => {
    try {
      return await ProductService.store(formData);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/index",
  async (_, thunkAPI) => {
    try {
      return await ProductService.index();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_VALUE(state, action) {},
  },
  extraReducers: (builder) => {
    builder
    .addCase(storeProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(storeProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

      state.products.push(action.payload);
      toast.success('Product was added successfully.')
    })
    .addCase(storeProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;

      state.message = action.payload;
      toast.error(action.payload)
    })
    .addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

      state.products = action.payload;
    })
    .addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;

      state.message = action.payload;
      toast.error(action.payload)
    });
  },
});

export const { STORE_VALUE } = ProductSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;

export default ProductSlice.reducer;
