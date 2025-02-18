const express = require("express");
const router = express.Router();
const { sendContactMessage } = require("../controllers/emailcontroller");

// Route to handle Contact Us form submissions
router.post("/contact-message", sendContactMessage);

module.exports = router;