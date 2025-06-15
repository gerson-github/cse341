const mongoose = require("mongoose");

// Defina o schema para a coleção "sales"
const ecomSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  image: String,
  category: String,
  rating: Number 
});

// Crie o modelo e vincule à coleção 'sales'
module.exports = mongoose.model("courses", ecomSchema, "courses");

