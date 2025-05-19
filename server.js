require("dotenv").config();
const express = require("express");
const contactsRouter = require("./routes/contacts");
const mongoose = require("mongoose");


const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');




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
app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  .use(express.json());

 app.get("/", (req, res) => {
  res.send("API is running...");
});



app.use('/contacts', contactsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
