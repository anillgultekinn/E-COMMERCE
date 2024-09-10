import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getBasketFromStorage = () => {
    if (localStorage.getItem("basket")) {
        return JSON.parse(localStorage.getItem("basket"));
    }
    return [];
}

const initialState = {
    products: getBasketFromStorage(),
    drawer: false,
    totalAmount: 0
}


const writeFromBasketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket))
}


export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findProduct = state.products.find(product => product.id === action.payload.id);

            if (findProduct) {
                // Ürün zaten sepette mevcutsa miktarını güncelle
                findProduct.count += action.payload.count;  // Bu satırda sadece miktar artırılır
            } else {
                // Ürün sepette yoksa, sepete ekle
                state.products.push({ ...action.payload, count: action.payload.count });
            }

            // Güncellenen sepeti local storage'a kaydet
            writeFromBasketToStorage(state.products);
        },

        removeFromBasket: (state, action) => {
            // Ürünün id'sini al
            const productId = action.payload;

            // Sepetteki ürünü bul
            const findProduct = state.products.find(product => product.id === productId);

            if (findProduct) {
                if (findProduct.count > 1) {
                    // Eğer ürün miktarı 1'den büyükse, sadece miktarı azalt
                    findProduct.count -= 1;
                } else {
                    // Eğer miktar 1 ise, ürünü sepetten çıkar
                    state.products = state.products.filter(product => product.id !== productId);
                }

                // Güncellenen sepeti local storage'a kaydet
                writeFromBasketToStorage(state.products);
            }

            // Sepet toplamını güncelle
            state.totalAmount = 0;
            state.products.forEach((product) => {
                state.totalAmount += product.price * product.count;
            });
        },

        setDrawer: (state, action) => {
            state.drawer = !state.drawer;
        },

        calculateBasket: (state) => {
            state.totalAmount = 0;
            state.products && state.products.map((product) => {
                state.totalAmount += product.price * product.count;
            })
        }

    }
})

export const { addToBasket, setDrawer, calculateBasket, removeFromBasket } = basketSlice.actions;

export default basketSlice.reducer;