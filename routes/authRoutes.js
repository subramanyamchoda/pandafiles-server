const express = require("express");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
const { googleLogin, logout, getUser, uploadAvatar, getUserFiles, deleteFile, downloadFile } = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");
const { authenticateUser } = require("../middleware/authMiddleware"); // Ensure user is authenticated
const File = require("../models/File");
const User = require("../models/User");

const router = express.Router();

router.post("/google", googleLogin);
router.post("/logout", logout);
router.get("/users", authenticateUser, getUser);
router.post("/upload-avatar", authenticateUser, upload.single("avatar"), uploadAvatar);

// for user personal files
router.get("/user/:userId/files", getUserFiles);
router.get("/download/:fileId", downloadFile);
router.delete("/delete/:fileId", deleteFile);
module.exports = router;
