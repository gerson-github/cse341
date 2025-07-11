const mongoose = require("mongoose");

// Defina o schema
const ecomSchema = new mongoose.Schema({
  userId: Number,
  items: String,
  totalPrice: Number,
  status: String,
  paymentInfo: String,
  createdAt: Date,
  date: {
    type: Date,
    default: Date.now,
  },
});

// Crie o modelo
module.exports = mongoose.model("ecom_orders", ecomSchema, "ecom_orders");
