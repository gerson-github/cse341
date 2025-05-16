require("dotenv").config();
const express = require("express");
const contactsRouter = require("./cse341/routes/contacts");
const mongoose = require("mongoose");
//const Sample = require("./models/sample");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DB = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

/*****************************
 routes
 **********************/
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use('/contacts', contactsRouter);



// Sample route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// app.post("/sample", async (req, res) => {
//   try {
//     const data = new Sample(req.body);
//     const saved = await data.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.get("/sample", async (req, res) => {
//   const data = await Sample.find();
//   res.json(data);
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
