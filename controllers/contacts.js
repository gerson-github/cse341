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

//Post
exports.createContact = async (req, res) => {
    try {
        const { id, firstName, lastName,  email, favoriteColor, birthday } = req.body;
        const addContact = new Contacts({ id, firstName, lastName,  email, favoriteColor, birthday });
        await addContact.save();
        res.status(201).json(addContact)
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

//Put
exports.updateContact = async (req, res) => {
    try {
        const updContact =await Contacts.findOneAndUpdate(
            {id: req.params.id},
            req.body,
            { new: true} // ret updated doc
        );

        if (!updContact) {
            return res.status(404).json({ error: "record not found to update !!"});
        }

        res.json(updContact);

    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

//Delete
exports.deleteContact = async (req, res) => {
    try {
        const delContact = await Contacts.findOneAndDelete ({ id: req.params.id })

        if (!delContact) {
            return res.status(404).json({ error: "contato nao existe !!"});
        }

        res.json( { message: " Deleted Successfuly !"})

    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

