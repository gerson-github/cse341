const mongoose = require("mongoose");

// Defina o schema para a coleção "sales"
const saleSchema = new mongoose.Schema({
  name: String, // exemplo de campo
  value: Number, // exemplo de campo
  // adicione outros campos que sua coleção 'sales' tenha
  date: { type: Date, default: Date.now }, // exemplo de um campo adicional
  // outros campos conforme necessário...
});

// Crie o modelo e vincule à coleção 'sales'
module.exports = mongoose.model("contacts", saleSchema, "contacts");