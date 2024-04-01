const jwt = require('jsonwebtoken');
const config = require('../../config/keys');

module.exports = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers['authorization'];
  console.log('Authorization:', authHeader); // Log the Authorization header

  // Check if no token
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  // Verify token
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('JWT verification error:', err); // Log the error from jwt.verify()
    res.status(400).json({ message: 'Invalid token.' });
  }
};