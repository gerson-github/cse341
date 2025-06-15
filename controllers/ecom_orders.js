const mongoose = require("mongoose");
const order = require("../models/ecom_orders");

exports.getOrders = async (req, res) => {
  try {
    if (req.query.id) {
      const orderRecord = await order.findById(req.query.id);
      if (!orderRecord) {
        return res.status(404).json({ error: "order not found !" });
      }
      return res.json(orderRecord);
    }

    const data = await order.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error:" + err.message });
  }
};

//Post
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalPrice, status, paymentInfo, createdAt } =
      req.body;
    const addOrder = new order({
      userId,
      items,
      totalPrice,
      status,
      paymentInfo,
      createdAt,
    });
    await addOrder.save();
    res.status(201).json(addOrder);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error:" + err.message });
  }
};

//put
exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id; // Use req.params.id porque o ID vem da URL como parâmetro

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      // Validate the ID first
      return res.status(400).json({ error: "Invalid order ID format" });
    }

    const updatedOrder = await order.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Record not found to update!" });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};

//Delete
exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "invalid order id !" });
    }

    const delOrder = await order.findOneAndDelete({ _id: id });

    if (!delOrder) {
      return res.status(404).json({ error: "record not found !" });
    }

    res.status(200).json({ message: " Deleted Successfuly !" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};
