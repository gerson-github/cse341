const express = require("express");
const router = express.Router();
// const Contacts = require("../models/contacts");
const contactController = require("../controllers/contacts");


router.get("/", contactController.getContacts);

// GET by query parameter (?id=1)
// router.get("/", async (req, res) => {
//   try {
//     // Se o query param "id" existir, busca por ele
//     if (req.query.id) {
//       const contact = await Contacts.findOne({ id: req.query.id });
//       if (!contact) {
//         return res.status(404).json({ error: "Contact not found" });
//       }
//       return res.json(contact);
//     }

//     // Caso não tenha ?id, retorna todos os contatos
//     const data = await Contacts.find();
//     res.json(data);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;
