const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // middleware to parse JSON requests.
// const todoRoutes = require("./src/routes/todoRoutes");
require("dotenv").config(); // Load environment variables from .env
const authRoutes = require("./src/routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check MongoDB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
