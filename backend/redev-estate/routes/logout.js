const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization:', authHeader); // Add this line

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'your-secret-key', (err, user) => {
      if (err) {
        console.log(err); // Add this line
        return res.status(403).json({ message: 'Invalid or expired token.' });
      }

      // With JWT, there's no server-side logout logic to implement.
      // The client should discard the token to "log out".
      res.status(200).json({ message: 'Logged out successfully' });
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;