const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "xyz",
  client_secret: "xyz",
});

module.exports = paypal;
