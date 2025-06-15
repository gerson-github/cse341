const mongoose = require("mongoose");
const review = require("../models/ecom_reviews");

exports.getReviews = async (req, res) => {
  try {
    if (req.query.id) {
      const reviewRecord = await review.findById(req.query.id);
      if (!reviewRecord) {
        return res.status(404).json({ error: "review not found !" });
      }
      return res.json(reviewRecord);
    }

    const data = await review.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error:" + err.message });
  }
};

//Post
exports.createReview = async (req, res) => {
  try {
    const { userId, productId, rating, comment, createdAt } = req.body;
    const addReview = new review({
      userId,
      productId,
      rating,
      comment,
      createdAt,
    });
    await addReview.save();
    res.status(201).json(addReview);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error:" + err.message });
  }
};

//put
exports.updateReview = async (req, res) => {
  try {
    const id = req.params.id; // Use req.params.id porque o ID vem da URL como parâmetro

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      // Validate the ID first
      return res.status(400).json({ error: "Invalid review ID format" });
    }

    const updatedReview = await review.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedReview) {
      return res.status(404).json({ error: "Record not found to update!" });
    }

    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};

//Delete
exports.deleteReview = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "invalid review id !" });
    }

    const delReview = await review.findOneAndDelete({ _id: id });

    if (!delReview) {
      return res.status(404).json({ error: "record not found !" });
    }

    res.status(200).json({ message: " Deleted Successfuly !" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};
