const mongoose = require("mongoose");

// Defina o schema para a coleção "sales"
const coursesSchema = new mongoose.Schema({
  title: String,
  description: String,
  durationHours: Number,
  level: String,
  price: Number,
  instructor: String,
  createdAt: Date,
  date: {
    type: Date,
    default: Date.now,
  },
 
});

// Crie o modelo e vincule à coleção 'sales'
module.exports = mongoose.model("courses", coursesSchema, "courses");
