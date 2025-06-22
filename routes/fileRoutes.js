const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const File = require("../models/File");
const User = require("../models/User");
const { uploadFile, getFiles, getFile, deleteFile,uploadFiles } = require("../controllers/fileController");
// const upload = multer({ dest: "uploads/" }); 

const storage = multer.memoryStorage();


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getFiles);
router.get("/:filename", getFile);
router.delete("/:filename", deleteFile);

router.post("/upload/:userId?", upload.single("file"), uploadFiles);




module.exports = router;
