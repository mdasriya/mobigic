// src/routes/authRoutes.js
const express = require('express');
const authController = require('../config/controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// Protect routes after this middleware to ensure the user is authenticated
router.use(authMiddleware.verifyToken);

// Add other authenticated routes here

module.exports = router;
