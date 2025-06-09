const mongoose = require("mongoose");
const course = require("../models/courses");

exports.getCourses = async (req, res) => {
    try {
      if (req.query.id) {
        const courseRecord = await course.findById(req.query.id );
        if (!courseRecord) {
          return res.status(404).json({ error: "course not found !" });
        }
        return res.json(courseRecord);
      }

      const data = await course.find();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error:" +  err.message });
    }
};

//Post
exports.createCourse = async (req, res) => {
    try {
        const { title, description, durationHours, level, price, instructor, createdAt } = req.body;
        const addCourse = new course({ title, description, durationHours, level, price, instructor, createdAt });
        await addCourse.save();
        res.status(201).json(addCourse)
    } catch (err) {
        res.status(500).json({error: "Internal Server Error:" + err.message});
    }
};

//put
exports.updateCourse = async (req, res) => {
  try {
    
    const id = req.params.id;  // Use req.params.id porque o ID vem da URL como parâmetro

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {          // Validate the ID first
      return res.status(400).json({ error: "Invalid course ID format" });
    }

    const updatedCourse = await course.findOneAndUpdate(        
      { _id: id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: "Record not found to update!" });
    }

    res.status(200).json(updatedCourse);

  } catch (err) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};


//Delete
exports.deleteCourse = async (req, res) => {
  try {
    
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "invalid course id !"});
    }

    const delCourse = await course.findOneAndDelete({ _id: id });

    if (!delCourse) {
      return res.status(404).json({ error: "record not found !" });
    }

    res.status(200).json({ message: " Deleted Successfuly !" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};
