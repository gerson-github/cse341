const mongoose = require("mongoose");
const product = require("../models/ecom_products");

exports.getProducts = async (req, res) => {
  try {
    if (req.query.id) {
      const productRecord = await product.findById(req.query.id);
      if (!productRecord) {
        return res.status(404).json({ error: "product not found !" });
      }
      return res.json(productRecord);
    }

    const data = await product.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error:" + err.message });
  }
};

//Post
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, stock, image, category, rating } =
      req.body;
    const addProduct = new product({
      title,
      description,
      price,
      stock,
      image,
      category,
      rating,
    });
    await addProduct.save();
    res.status(201).json(addProduct);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error:" + err.message });
  }
};

//put
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id; // Use req.params.id porque o ID vem da URL como parâmetro

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      // Validate the ID first
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const updatedProduct = await product.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Record not found to update!" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};

//Delete
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "invalid product id !" });
    }

    const delProduct = await product.findOneAndDelete({ _id: id });

    if (!delProduct) {
      return res.status(404).json({ error: "record not found !" });
    }

    res.status(200).json({ message: " Deleted Successfuly !" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};
