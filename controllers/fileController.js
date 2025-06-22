const { Readable } = require("stream");
const User = require("../models/User");
const File = require("../models/File");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);

    const uploadStream = global.gridfsBucket.openUploadStream(req.file.originalname);
    bufferStream.pipe(uploadStream);

    uploadStream.on("finish", () => {
      res.json({ message: "File uploaded successfully", fileId: uploadStream.id });
    });

    uploadStream.on("error", (err) => {
      console.error(err);
      res.status(500).json({ message: "Error uploading file" });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await global.gridfsBucket.find().toArray();
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "Error fetching files" });
  }
};

const getFile = async (req, res) => {
  try {
    const files = await global.gridfsBucket.find({ filename: req.params.filename }).toArray();
    if (!files.length) return res.status(404).json({ message: "File not found" });

    const file = files[0];
    res.set({
      "Content-Type": file.contentType,
      "Content-Disposition": `attachment; filename="${file.filename}"`,
    });

    const downloadStream = global.gridfsBucket.openDownloadStream(file._id);
    downloadStream.pipe(res);
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ message: "Error fetching file" });
  }
};

const deleteFile = async (req, res) => {
  try {
    const files = await global.gridfsBucket.find({ filename: req.params.filename }).toArray();
    if (!files.length) return res.status(404).json({ message: "File not found" });

    await global.gridfsBucket.delete(files[0]._id);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting file" });
  }
};


//files sending for user 
const uploadFiles = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    let user = null;
    if (userId) { // Only check if userId is provided
      user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }

    const newFile = new File({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      size: req.file.size,
      fileData: req.file.buffer,
      user: userId || null, // Store userId only if available
    });

    await newFile.save();
    
     if (user) {
      user.files.push(newFile._id);
      await user.save();
    }

    return res.status(201).json({
      message: "File uploaded successfully!",
      file: newFile,
      user: user ? user._id : "Guest",
    });
    return res.status(201).json({ message: "File uploaded successfully!", fileId: newFile._id });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ message: "Server error during file upload" });
  }
};


module.exports = { uploadFile, getFiles, getFile, deleteFile,uploadFiles };
