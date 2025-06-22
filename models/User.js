const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String }, 
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }] // Reference to File model
});

module.exports = mongoose.model("User", UserSchema);
