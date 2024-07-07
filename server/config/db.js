const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection successfull!");
  } catch (error) {
    console.log("Error: Database connection unsuccessfull!");
    process.exit(1);
  }
};

module.exports = connectDB;
