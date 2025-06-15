const mongoose = require("mongoose");

// Defina o schema
const ecomSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  image: String,
  category: String,
  rating: Number,
});

// Crie o modelo
module.exports = mongoose.model("ecom_products", ecomSchema, "ecom_products");
