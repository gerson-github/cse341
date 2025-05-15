const Contacts = require("../models/contacts");

exports.getContacts = async (req, res) => {
  try {
    if (req.query.id) {
      const contact = await Contacts.findOne({ id: req.query.id });

      if (!contact) {
        return res.status(404).json({ error: "Contact not found !" });
      }
      return res.json(contact);
    }

    // return all contacts
    const data = await Contacts.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
