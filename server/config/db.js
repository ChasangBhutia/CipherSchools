const mongoose = require("mongoose");

const connectDb = async () => {
  const URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(`Error Connecting MongoDb: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
