import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartCount: 0,
    totalAmount: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        ADD_TO_CART: (state, action) => {
            // console.log("product in cart", action.payload);
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                // Item is already in cart
                // update quantity
                action.payload.qty ? state.cartItems[itemIndex].qty += action.payload.qty : state.cartItems[itemIndex].qty += 1;
            }
            else {
                // Item not found
                // Add item to cart
                const tempProduct = { ...action.payload, qty: action.payload.qty ? action.payload.qty : 1, uid: action.payload.uid }
                state.cartItems.push(tempProduct);
                state.cartCount += 1;
            }
        },
        REMOVE_FROM_CART: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload);
            state.cartItems.splice(itemIndex, 1);
            state.cartCount -= 1;
        },
        CALCULATE_TOTAL_AMOUNT: (state) => {
            const total = []
            state.cartItems.map(item => {
                const { price, qty } = item;
                const cartTotal = price * qty;
                total.push(cartTotal);
            });
            state.totalAmount = total.reduce((amount1, amount2) => amount1 + amount2, 0);
        },
        INCREASE_CART_QUANTITY: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            state.cartItems[itemIndex].qty += 1;
        },
        DECREASE_CART_QUANTITY: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            state.cartItems[itemIndex].qty -= 1;
        },
        CLEAR_CART: (state) => {
            state.cartItems = [];
            state.cartCount = 0;
            state.totalAmount = 0;
        },
    },
});

export const {
    ADD_TO_CART,
    CALCULATE_TOTAL_AMOUNT,
    REMOVE_FROM_CART,
    INCREASE_CART_QUANTITY,
    DECREASE_CART_QUANTITY,
    CLEAR_CART
} = cartSlice.actions;

export const { cartItems, cartCount } = cartSlice;

export default cartSlice.reducer;