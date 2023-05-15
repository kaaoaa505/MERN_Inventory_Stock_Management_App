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

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_VALUE(state, action) {
      console.log("todo check store value");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(storeProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(storeProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        console.log(action.payload);

        state.products.push(action.payload);
        toast.success('Product was added successfully.')
      })
      .addCase(storeProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        console.log(action.payload);

        state.message = action.payload;
        toast.error(action.payload)
      });
  },
});

export const { STORE_VALUE } = ProductSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;

export default ProductSlice.reducer;
