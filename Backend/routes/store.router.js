const express = require("express");
const router = express.Router();

const store = {
    name: "Kashvi Creation",
    address: "Shop no. Z-1201, Surat Textile Market, Ring Road, Surat, Gujarat",
    phone: "098980 28881",
    latitude: 21.1702, // Surat Latitude
    longitude: 72.8311, // Surat Longitu
};

// Get store details
router.get("/store", (req, res) => {
  res.status(200).json(store);
});

module.exports = router;