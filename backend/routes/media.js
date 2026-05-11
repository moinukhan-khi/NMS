const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');

const router = express.Router();

// اپ لوڈ ڈائریکٹری
const uploadDir = process.env.UPLOADS_DIR || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer کی ترتیب
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB تک
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('غلط فائل کی قسم'));
    }
  }
});

// میڈیا اپ لوڈ کریں
router.post('/upload', auth, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'براہ کرم فائل منتخب کریں'
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const mediaType = req.file.mimetype.split('/')[0]; // 'image', 'video', etc.

    res.json({
      message: 'فائل اپ لوڈ ہو گئی',
      url: fileUrl,
      mediaType,
      filename: req.file.filename,
      size: req.file.size
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'اپ لوڈ میں خرابی',
      error: err.message
    });
  }
});

module.exports = router;
