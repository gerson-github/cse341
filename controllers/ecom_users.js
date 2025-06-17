const mongoose = require("mongoose");
const user = require("../models/ecom_users");
const { validationResult } = require("express-validator");

exports.getUsers = async (req, res) => {
  try {
    if (req.query.id) {
      const userRecord = await user.findById(req.query.id);
      if (!userRecord) {
        return res.status(404).json({ error: "user not found !" });
      }
      return res.json(userRecord);
    }

    const data = await user.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error:" + err.message });
  }
};

//Post
exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { firstName, lastName, email, role, address, createdAt } = req.body;
    const addUser = new user({
      firstName,
      lastName,
      email,
      role,
      address,
      createdAt,
    });
    await addUser.save();
    res.status(201).json(addUser);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error:" + err.message });
  }
};

//put
exports.updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const id = req.params.id; // Use req.params.id porque o ID vem da URL como parâmetro

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      // Validate the ID first
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const updatedUser = await user.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "Record not found to update!" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};

//Delete
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "invalid user id !" });
    }

    const delUser = await user.findOneAndDelete({ _id: id });

    if (!delUser) {
      return res.status(404).json({ error: "record not found !" });
    }

    res.status(200).json({ message: " Deleted Successfuly !" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};
