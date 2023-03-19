import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    email: null,
    userName: null,
    userID: null
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

    },

});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const { isLoggedIn, isAdmin, email, userName, userID } = authSlice;

export default authSlice.reducer;