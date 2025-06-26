const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const mongoose = require("mongoose");

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate input
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(productId) ||
      quantity <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Ensure product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Add or update quantity
    const idx = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (idx === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[idx].quantity += quantity;
    }

    // Save and populate
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });

    // Format response items
    const populatedItems = cart.items
      .filter((item) => item.productId) // filter out deleted products
      .map((item) => ({
        productId: item.productId._id,
        image: item.productId.image,
        title: item.productId.title,
        price: item.productId.price,
        salePrice: item.productId.salePrice,
        quantity: item.quantity,
      }));

    return res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populatedItems },
    });
  } catch (err) {
    console.error("🔥 addToCart failed:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get all items for a user's cart
const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Find and populate
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });

    // If no cart, return empty
    if (!cart) {
      return res.status(200).json({
        success: true,
        data: { items: [], userId, _id: null, createdAt: new Date(), updatedAt: new Date() },
      });
    }

    // Format items
    const items = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      data: { ...cart._doc, items },
    });
  } catch (err) {
    console.error("🔥 fetchCartItems failed:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update quantity for a specific cart item
const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate input
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(productId) ||
      quantity <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const idx = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (idx === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present!",
      });
    }

    cart.items[idx].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const items = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      data: { ...cart._doc, items },
    });
  } catch (err) {
    console.error("🔥 updateCartItemQty failed:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete a product from the cart
const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Validate input
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId && item.productId._id.toString() !== productId
    );
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const items = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      data: { ...cart._doc, items },
    });
  } catch (err) {
    console.error("🔥 deleteCartItem failed:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem,
};
