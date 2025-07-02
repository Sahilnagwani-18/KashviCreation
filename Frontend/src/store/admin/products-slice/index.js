import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  error: null,
};

// ✅ Add Product
export const addNewProduct = createAsyncThunk(
  "adminProducts/addNewProduct", // Removed slash
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/add`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return result?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add product");
    }
  }
);

// ✅ Fetch All Products
export const fetchAllProducts = createAsyncThunk(
  "adminProducts/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/get`,
        { withCredentials: true }
      );
      return result?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch products");
    }
  }
);

// ✅ Edit Product
export const editProduct = createAsyncThunk(
  "adminProducts/editProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return result?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to edit product");
    }
  }
);

// ✅ Delete Product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/delete/${id}`,
        { withCredentials: true }
      );
      return result?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete product");
    }
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔁 Fetch All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data || [];
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.productList = [];
      });

    // Optionally: You can handle loading/error for add/edit/delete as well if needed
  },
});

export default AdminProductsSlice.reducer;
