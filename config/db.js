const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fileUploads";
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected");

    global.gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
    console.log("✅ GridFS initialized");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
