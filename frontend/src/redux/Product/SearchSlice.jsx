import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    productsBySearch: [],
};

const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        PRODUCTS_BY_SEARCH(state, action){
            const {products, searchText} = action.payload;
            const productsResult = products.filter(product => {
                return product.name.toLowerCase().includes(searchText.toLowerCase()) || product.category.toLowerCase().includes(searchText.toLowerCase());
            });

            state.productsBySearch = productsResult;
        }
    }
});

export const {PRODUCTS_BY_SEARCH} = SearchSlice.actions;

export const selectProductsBySearch = (state) => state.search.productsBySearch;

export default SearchSlice.reducer;