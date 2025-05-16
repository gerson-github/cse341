const express = require("express");
const router = express.Router();
// const Contacts = require("../models/contacts");
const contactController = require("../controllers/contacts");


router.get("/", contactController.getContacts);   //get - read
router.post("/", contactController.createContact); //post - create
router.put("/:id", contactController.updateContact); //put - update
router.delete("/:id", contactController.deleteContact); //delete


module.exports = router;
