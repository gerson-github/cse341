const mongoose = require("mongoose");

// Defina o schema para a coleção "sales"
const saleSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  email: String,
  favoriteColor: String,
  birthday: Date,
  date: {
    type: Date,
    default: Date.now,
  },
  
});

// Crie o modelo e vincule à coleção 'sales'
module.exports = mongoose.model("contacts", saleSchema, "contacts");
