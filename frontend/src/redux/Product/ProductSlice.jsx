import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "../../services/ProductService";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  productsTotal: 0,
  earning: 0,
  outOfStock: 0,
  categories: [],
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

export const deleteProduct = createAsyncThunk(
  "products/destroy",
  async (productId, thunkAPI) => {
    try {
      return await ProductService.destroy(productId);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const showProduct = createAsyncThunk(
  "products/show",
  async (productId, thunkAPI) => {
    try {
      return await ProductService.show(productId);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({id, formData}, thunkAPI) => {
    try {
      return await ProductService.update(id, formData);
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
    PRODUCTS_TOTAL(state, action) {
      const products = action.payload;
      const productsTotalsArray = [];

      products.map(product => {
        const {price, quantity} = product;
        const total = price * quantity;
        return productsTotalsArray.push(total);
      });

      const productsTotalValue = productsTotalsArray.reduce( (a,b) => {
        return a + b;
      }, 0);

      state.productsTotal = productsTotalValue;
    },
    PRODUCTS_OUT_OF_STOCK(state, action) {
      const products = action.payload;
      let count = 0;

      products.map(product => {
        const { quantity} = product;

        if(parseInt(quantity) === 0){
          count++;
        }
        
        return count;
      });

      state.outOfStock = count;
    },
    PRODUCTS_CATEGORIES(state, action) {
      const products = action.payload;
      let categoriesArray = [];

      products.map(product => {
        const { category} = product;

        if(categoriesArray.includes(category)){
          return categoriesArray;
        }
        
        return categoriesArray.push(category);
      });

      state.categories = categoriesArray.length;
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
      toast.error(action.payload);
    })
    .addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

      toast.success('Product was deleted successfully.')
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;

      state.message = action.payload;
      toast.error(action.payload)
    })
    .addCase(showProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(showProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

      state.product = action.payload;
    })
    .addCase(showProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;

      state.message = action.payload;
      toast.error(action.payload)
    })
    .addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

      toast.success('Product was updated successfully.')
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;

      state.message = action.payload;
      toast.error(action.payload)
    });
  },
});

export const { PRODUCTS_TOTAL, PRODUCTS_OUT_OF_STOCK, PRODUCTS_CATEGORIES } = ProductSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;
export const selectProduct = (state) => state.product.product;
export const selectProductsTotal = (state) => state.product.productsTotal;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectCategories = (state) => state.product.categories;

export default ProductSlice.reducer;
