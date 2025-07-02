import { configureStore } from "@reduxjs/toolkit";

// Auth
import authReducer from "./auth-slice";

// Admin
import adminProductsReducer from "./admin/products-slice";
import adminOrderReducer from "./admin/order-slice";

// Shop
import shopProductsReducer from "./shop/products-slice";
import shopCartReducer from "./shop/cart-slice";
import shopAddressReducer from "./shop/address-slice";
import shopOrderReducer from "./shop/order-slice";
import shopSearchReducer from "./shop/search-slice";
import shopReviewReducer from "./shop/review-slice";

// Common
import commonFeatureReducer from "./common-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,

    // Admin reducers
    adminProducts: adminProductsReducer,
    adminOrder: adminOrderReducer,

    // Shop reducers
    shopProducts: shopProductsReducer,
    shopCart: shopCartReducer,
    shopAddress: shopAddressReducer,
    shopOrder: shopOrderReducer,
    shopSearch: shopSearchReducer,
    shopReview: shopReviewReducer,

    // Common
    commonFeature: commonFeatureReducer,
  },
});

export default store;
