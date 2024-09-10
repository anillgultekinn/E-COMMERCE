import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],         // Tüm ürünler listesi
    selectedProduct: {},   // Seçilen ürün
    loading: false
};

const BASE_URL = "https://fakestoreapi.com"

export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;    //action a denk geliyor     

},
)

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSelectProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;    //response.data = action 
        })
    }
});

export const { setSelectProduct } = productSlice.actions;

export default productSlice.reducer;