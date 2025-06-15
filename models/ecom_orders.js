const mongoose = require("mongoose");

// Defina o schema para a coleção "sales"
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

// Crie o modelo e vincule à coleção 'sales'
module.exports = mongoose.model("courses", ecomSchema, "courses");


