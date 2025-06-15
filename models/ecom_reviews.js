const mongoose = require("mongoose");

// Defina o schema
const ecomSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  rating: Number,
  comment: String,
  createdAt: Date,
  date: {
    type: Date,
    default: Date.now,
  },
});

// Crie o modelo
module.exports = mongoose.model("ecom_reviews", ecomSchema, "ecom_reviews");
