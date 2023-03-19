import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: []
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        SAVE_ORDER: (state, action) => {
            const newOrder = {
                id: action.payload.orderId,
                items: action.payload.cartItems,
                userEmail: action.payload.email,
                userID: action.payload.userID,
                shippingAddress: action.payload.shippingAddress,
                orderTotalAmount: action.payload.totalAmount,
                orderDate: action.payload.date,
                orderTime: action.payload.time,
                orderStatus: "ordered"
            };
            state.orders.push(newOrder);
        },
        CANCEL_ORDER: (state, action) => {
            const orderIndex = state.orders.findIndex(order => order.id === action.payload);
            state.orders[orderIndex].orderStatus = "cancelled";
            // state.orders.splice(orderIndex, 1);
        },
        REMOVE_CANCELLED_ORDER: (state, action) => {
            const orderIndex = state.orders.findIndex(order => order.id === action.payload);
            state.orders.splice(orderIndex, 1);
        },
        EDIT_ORDER_STATUS: (state, action) => {
            const orderIndex = state.orders.findIndex(order => order.id === action.payload.id);
            state.orders[orderIndex].orderStatus = action.payload.status;
        },
    },
});

export const { SAVE_ORDER, CANCEL_ORDER, REMOVE_CANCELLED_ORDER, EDIT_ORDER_STATUS } = orderSlice.actions;
export const { orders } = orderSlice;
export default orderSlice.reducer;