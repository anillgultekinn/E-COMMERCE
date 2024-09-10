import { configureStore } from '@reduxjs/toolkit'
import appSlice from './slices/appSlice'
import productSlice from './slices/productSlice'
import basketSlice from './slices/basketSlice'

export const store = configureStore({
    reducer: {
        app: appSlice,
        product: productSlice,
        basket: basketSlice,
    },
})