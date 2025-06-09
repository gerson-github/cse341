const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  // enrolledCourses: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Course' // optional, assuming you have a Course model
  //   }
  // ],
  birthDate: Date,
  registrationDate: Date
});

// Crie o modelo e vincule à coleção 'sales'
module.exports = mongoose.model("students", studentSchema, "students");
