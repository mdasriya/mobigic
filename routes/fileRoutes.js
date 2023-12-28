// src/routes/fileRoutes.js (update)
const express = require('express');
const fileController = require('../config/controllers/fileController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/upload', uploadMiddleware.single('file'), fileController.uploadFile);
router.get('/list', fileController.getUserFiles);
router.delete('/remove/:fileId', fileController.removeFile);
router.get('/download/:code', fileController.downloadFile); // New route for downloading files

module.exports = router;
