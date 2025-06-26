import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],   // array of item objects
  cartId:    null, // Mongo _id of the Cart document
  isLoading: false,
  error:     null, // optional for future error handling
};

// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/add`,
        { userId, productId, quantity: quantity || 1 }
      );
      return data; // expects { success, data: { _id, items: [...] } }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/get/${userId}`
      );
      return data; // expects { success, data: { _id, items: [...] } }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/update-cart`,
        { userId, productId, quantity }
      );
      return data; // expects { success, data: { _id, items: [...] } }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete cart item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/${userId}/${productId}`
      );
      return data; // expects { success, data: { _id, items: [...] } }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    clearCart(state) {
      state.cartItems = [];
      state.cartId    = null;
    },
  },
  extraReducers: (builder) => {
    const handleFulfilled = (state, action) => {
      state.isLoading = false;
      // action.payload.data: { _id, items }
      state.cartId    = action.payload.data._id;
      state.cartItems = action.payload.data.items;
      state.error     = null;
    };

    builder
      .addCase(addToCart.pending, (s) => { s.isLoading = true; })
      .addCase(addToCart.fulfilled, handleFulfilled)
      .addCase(addToCart.rejected, (s, a) => {
        s.isLoading = false;
        s.error     = a.payload || a.error.message;
      })

      .addCase(fetchCartItems.pending, (s) => { s.isLoading = true; })
      .addCase(fetchCartItems.fulfilled, handleFulfilled)
      .addCase(fetchCartItems.rejected, (s, a) => {
        s.isLoading = false;
        s.error     = a.payload || a.error.message;
      })

      .addCase(updateCartQuantity.pending, (s) => { s.isLoading = true; })
      .addCase(updateCartQuantity.fulfilled, handleFulfilled)
      .addCase(updateCartQuantity.rejected, (s, a) => {
        s.isLoading = false;
        s.error     = a.payload || a.error.message;
      })

      .addCase(deleteCartItem.pending, (s) => { s.isLoading = true; })
      .addCase(deleteCartItem.fulfilled, handleFulfilled)
      .addCase(deleteCartItem.rejected, (s, a) => {
        s.isLoading = false;
        s.error     = a.payload || a.error.message;
      });
  },
});

export const { clearCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
