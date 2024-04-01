// register.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

// Make your route handler async
router.post('/', async (req, res) => {
  
    const { email, password, name, phone, address } = req.body;
  
    // Validate incoming data
    if (!email || !password || !name || !phone || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
  
    // Create new user with hashed password
    const newUser = new User({ email, password: hashedPassword, name, phone, address });
  
    try {
        // Save user to database
        await newUser.save();
      
        // Send success response
        res.status(201).json({ message: 'User registered successfully' });
      } catch (err) {
        console.error(err); // Log the error
        return res.status(500).json({ message: 'Error saving user to database' });
      }
});

module.exports = router;