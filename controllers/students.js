const mongoose = require("mongoose");
const student = require("../models/students");

exports.getStudent = async (req, res) => {
    try {
      if (req.query.id) {
        const studentRecord = await student.findById(req.query.id );
        if (!studentRecord) {
          return res.status(404).json({ error: "student not found !" });
        }
        return res.json(studentRecord);
      }

      const data = await student.find();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error:" +  err.message });
    }
};

//Post
exports.createStudent = async (req, res) => {
    try {

        const { firstName, lastName, email, phone, birthDate, registrationDate } = req.body;
        const addStudent = new student({ firstName, lastName, email, phone, birthDate, registrationDate });
        await addStudent.save();
        res.status(201).json(addStudent)
    } catch (err) {
        res.status(500).json({error: "Internal Server Error:" + err.message});
    }
};

//put
exports.updateStudent = async (req, res) => {
  try {
    
    const id = req.params.id;  // Use req.params.id porque o ID vem da URL como parâmetro

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {          // Validate the ID first
      return res.status(400).json({ error: "Invalid student ID format" });
    }

    const updatedStudent = await student.findOneAndUpdate(        // Update student by ID
      { _id: id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Record not found to update!" });
    }

    res.status(200).json(updatedStudent);

  } catch (err) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};


//Delete
exports.deleteStudent = async (req, res) => {
  try {
    
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "invalid student id !"});
    }

    const delStudent = await student.findOneAndDelete({ _id: id });

    if (!delStudent) {
      return res.status(404).json({ error: "record not found !" });
    }

    res.status(200).json({ message: " Deleted Successfuly !" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};
