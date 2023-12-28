// src/controllers/fileController.js
const fs = require('fs');
const File = require('../../models/file');

async function uploadFile(req, res) {
  try {
    const userId = req.user.userId; // Extracted from the token in authMiddleware

    const { originalname, path } = req.file;

    // Generate a unique 6-digit code
    const code = shortid.generate().substring(0, 6);

    // Move the file to the uploads directory
    const newFilePath = `./src/uploads/${code}_${originalname}`;
    fs.renameSync(path, newFilePath);

    // Save file information to the database
    const newFile = new File({ userId, filename: originalname, code });
    await newFile.save();

    res.status(201).json({ code });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getUserFiles(req, res) {
  try {
    const userId = req.user.userId;

    const files = await File.find({ userId });

    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function removeFile(req, res) {
  try {
    const userId = req.user.userId;
    const fileId = req.params.fileId;

    // Ensure that the file belongs to the logged-in user
    const file = await File.findOne({ _id: fileId, userId });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Remove the file from the file system
    fs.unlinkSync(`./src/uploads/${file.code}_${file.filename}`);

    // Remove the file from the database
    await file.remove();

    res.status(200).json({ message: 'File removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function downloadFile(req, res) {
  try {
    const code = req.params.code;

    // Find the file with the given code
    const file = await File.findOne({ code });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Send the file for download
    const filePath = `./src/uploads/${file.code}_${file.filename}`;
    res.download(filePath, file.filename);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { uploadFile, getUserFiles, removeFile, downloadFile };
