const mongoose = require("mongoose");

// Defina o schema
const ecomSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  role: String,
  address: String,
  createdAt: Date,
  date: {
    type: Date,
    default: Date.now,
  },
});

// Crie o modelo
module.exports = mongoose.model("ecom_users", ecomSchema, "ecom_users");
