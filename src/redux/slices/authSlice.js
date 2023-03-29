import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    email: null,
    userName: null,
    userID: null,
    addresses: []
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action) => {
            const { email, userName, userID, isAdmin } = action.payload;
            state.isLoggedIn = true;
            state.isAdmin = isAdmin;
            state.email = email;
            state.userName = userName;
            state.userID = userID;

        },
        REMOVE_ACTIVE_USER: (state) => {
            state.isLoggedIn = false;
            state.isAdmin = false;
            state.email = null;
            state.userName = null;
            state.userID = null;
        },
        SAVE_USER_ADDRESS: (state, action) => {
            console.log("payload = ", action.payload);
            const itemIndex = state.addresses.findIndex(item => item.uid === action.payload.userID);
            console.log("item index = ", itemIndex);
            if (itemIndex >= 0) {
                // address is already saved in state
                // just update the saved address
                console.log("item = ", state.addresses[itemIndex]);
                state.addresses[itemIndex].shippingAddress = action.payload.shippingAddress;
            }
            else {
                // this is a new order
                // add address to state
                state.addresses.push({ uid: action.payload.userID, shippingAddress: action.payload.shippingAddress });
            }
        },
    },

});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, SAVE_USER_ADDRESS } = authSlice.actions;

export const { isLoggedIn, isAdmin, email, userName, userID, addresses } = authSlice;

export default authSlice.reducer;