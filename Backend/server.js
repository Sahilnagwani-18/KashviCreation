const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/Kashvi5";

// ✅ Database Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch((err) => console.error("❌ Database Connection Error:", err));

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://kashvi-creation-1nlj.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());

// ✅ Routers
const authRouter          = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter    = require("./routes/admin/order-routes");
const shopProductsRouter  = require("./routes/shop/products-routes");
const shopCartRouter      = require("./routes/shop/cart-routes");
const shopAddressRouter   = require("./routes/shop/address-routes");
const shopOrderRouter     = require("./routes/shop/order-routes");
const shopSearchRouter    = require("./routes/shop/search-routes");
const shopReviewRouter    = require("./routes/shop/review-routes");
const storeRouter         = require("./routes/store.router.js");
const emailRouter         = require("./routes/emailroutes.js");
const commonFeatureRouter = require("./routes/common/feature-routes");

// ✅ API Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api", storeRouter);
app.use("/api", emailRouter);
app.use("/api/common/feature", commonFeatureRouter);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
