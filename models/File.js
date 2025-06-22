const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    fileData: { type: Buffer, required: true }, // Store file as Buffer
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", FileSchema);
