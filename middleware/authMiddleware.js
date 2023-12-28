// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config');
// const config = require('../../config');

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = { userId: decoded.userId };
    next();
  });
}

module.exports = { verifyToken };
