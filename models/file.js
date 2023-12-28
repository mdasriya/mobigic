// src/models/file.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  code: { type: String, required: true, unique: true },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
