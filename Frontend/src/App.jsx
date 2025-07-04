// src/App.jsx
import React, { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/shopping-view/ScrollToTop"; 
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AuthVerifyOTP from "./pages/auth/verify-otp";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import FindStore from "./pages/FindStore";
import AboutUs from "./components/shopping-view/Aboutus";
import TermsConditions from "./pages/shopping-view/terms";
import PrivacyPolicy from "./components/shopping-view/privacy";
import ContactUs from "./pages/shopping-view/contact-us";
import Company from "./pages/shopping-view/company";
import Blog from "./pages/shopping-view/blog";
import BulkSales from "./pages/shopping-view/bulksales";
import Influencers from "./pages/shopping-view/influencers";
import "./App.css";

function App() {
  // ▶️ Configure Axios once to send cookies on every request
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
  axios.defaults.withCredentials = true;

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // On mount, check if session cookie is valid
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="w-[800px] h-[600px] bg-black" />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <ScrollToTop />
      <Routes>
        {/* Root just runs the guard logic */}
        <Route
          path="/"
          element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
        />

        {/* Auth pages */}
        <Route
          path="/auth/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="verify-otp" element={<AuthVerifyOTP />} />
        </Route>

        {/* Admin pages */}
        <Route
          path="/admin/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* Shop pages */}
        <Route
          path="/shop/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="store" element={<FindStore />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="terms-condition" element={<TermsConditions />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="company" element={<Company />} />
          <Route path="blog" element={<Blog />} />
          <Route path="bulk-orders" element={<BulkSales />} />
          <Route path="influencers" element={<Influencers />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        {/* Unauthenticated landing */}
        <Route path="/unauth-page" element={<UnauthPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
