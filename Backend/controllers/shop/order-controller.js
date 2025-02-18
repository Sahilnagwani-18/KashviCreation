
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const { sendInvoiceEmail } = require("../../helpers/emailService");
const { generateInvoice } = require("../../helpers/invoiceGenerator");




// const createOrder = async (req, res) => {
//   try {
//     const {
//       userId,
//       cartItems,
//       addressInfo,
//       totalAmount,
//       cartId,
//       userEmail,
//     } = req.body;

//     // Validate required fields
//     if (!userId || !cartItems || !addressInfo || !totalAmount || !cartId || !userEmail) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields in the request body.",
//       });
//     }

//     // Check if the cart exists
//     const cart = await Cart.findById(cartId);
//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found.",
//       });
//     }

//     // Check if all products in cartItems are valid
//     for (const item of cartItems) {
//       const product = await Product.findById(item.productId);
//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: `Product with ID ${item.productId} not found.`,
//         });
//       }
//     }

//     // Create order with initial pending status
//     const newlyCreatedOrder = new Order({
//       userId,
//       cartId,
//       cartItems,
//       addressInfo,
//       orderStatus: "pending",
//       paymentMethod: "invoice",
//       paymentStatus: "pending",
//       totalAmount,
//       orderDate: new Date(),
//     });
    

//     await newlyCreatedOrder.save();

//     try {
//       // Generate invoice
//       const invoicePath = await generateInvoice(newlyCreatedOrder);

//       // Send email with invoice
//       const emailSent = await sendInvoiceEmail(userEmail, invoicePath);

//       if (emailSent) {
//         // Update order status to processing if email is sent successfully
//         newlyCreatedOrder.orderStatus = "processing";
//         await newlyCreatedOrder.save();
//       }
//     } catch (emailError) {
//       console.error("Invoice email failed:", emailError);
//       // Optionally, delete the order if email is critical
//       // await Order.findByIdAndDelete(newlyCreatedOrder._id);
//       // return res.status(500).json({ success: false, message: "Failed to send invoice email." });
//     }

//     // Clear the cart
//     await Cart.findByIdAndDelete(cartId);

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully. Invoice sent to email.",
//       orderId: newlyCreatedOrder._id,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error creating order",
//       error: e.message, // Include the actual error message
//     });
//   }
// };


const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      totalAmount,
      cartId,
      userEmail,
    } = req.body;

    // Validate required fields
    if (!userId || !cartItems || !addressInfo || !totalAmount || !cartId || !userEmail) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields in the request body.",
      });
    }

    // Check if the cart exists
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    // Check if all products in cartItems are valid
    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.productId} not found.`,
        });
      }
    }

    // Create order with initial pending status
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: "pending",
      paymentMethod: "invoice",
      paymentStatus: "pending",
      totalAmount,
      orderDate: new Date(),
    });

    // Save the order to the database
    await newlyCreatedOrder.save();

    // Generate the invoice
    const invoicePath = await generateInvoice(newlyCreatedOrder);

    // Update the order with the invoice path
    newlyCreatedOrder.invoicePath = invoicePath;
    await newlyCreatedOrder.save();

    try {
      // Send email with invoice
      const emailSent = await sendInvoiceEmail(userEmail, invoicePath);

      if (emailSent) {
        // Update order status to processing if email is sent successfully
        newlyCreatedOrder.orderStatus = "processing";
        await newlyCreatedOrder.save();
      } else {
        console.error("Email sending failed, but order was created successfully.");
      }
    } catch (emailError) {
      console.error("Invoice email failed:", emailError);
      // Proceed with the order even if email fails
    }

    // Clear the cart
    await Cart.findByIdAndDelete(cartId);

    res.status(201).json({
      success: true,
      message: "Order created successfully. Invoice sent to email.",
      orderId: newlyCreatedOrder._id,
      invoicePath: newlyCreatedOrder.invoicePath, 
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: e.message, // Include the actual error message
    });
  }
};



const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};


const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
};
