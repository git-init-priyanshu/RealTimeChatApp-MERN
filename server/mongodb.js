require("dotenv").config();

// Import the required modules
const mongoose = require("mongoose");

// Connection URL from .env file
const mongoURI = process.env.MONGO_URI;

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

// Call the function to connect to MongoDB
module.exports = connectToMongoDB;
