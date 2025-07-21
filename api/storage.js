// api/storage.js - Handles file uploads (based on 4-C, adapted for movies)

const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Save the file with its original name
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// POST /api/storage/upload - upload a movie poster image
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  // Respond with the file path for storage in the database
  res.json({ filename: req.file.filename, url: `/uploads/${req.file.filename}` });
});

module.exports = router;