// src/store/shop/order-slice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading:   false,
  orderId:     null,
  orderList:   [],
  orderDetails:null,
  error:       null,   // ← capture createNewOrder errors here
};

// 1️⃣ Create order thunk with rejectWithValue
export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shop/order/create`,
        orderData
      );
      return response.data;
    } catch (err) {
      // If server returned JSON error body, forward it
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      // Fallback generic message
      return rejectWithValue({ message: err.message });
    }
  }
);

// 2️⃣ Other thunks (no change needed)
export const capturePayment = createAsyncThunk(
  "order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/order/capture`,
      { paymentId, payerId, orderId }
    );
    return response.data;
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/order/list/${userId}`
    );
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/order/details/${id}`
    );
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // — createNewOrder —
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error     = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading   = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId     = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        // If rejectWithValue was used, payload holds the server’s error object
        state.error     = action.payload?.message || action.error.message;
      })

      // — getAllOrdersByUserId —
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })

      // — getOrderDetails —
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading    = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading    = false;
        state.orderDetails = null;
      })

      // — capturePayment —
      .addCase(capturePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(capturePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        // handle any returned data…
      })
      .addCase(capturePayment.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { resetOrderDetails, clearOrderError } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
