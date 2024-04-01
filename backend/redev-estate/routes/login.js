// login.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // replace with your user model file path

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });

        // If the user doesn't exist, send an error message
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // If the user exists, check the password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        console.log('Valid password:', validPassword); // Log whether the password is valid
        console.log('Password in request:', req.body.password); // Log the password in the request
        console.log('Hashed password in database:', user.password); // Log the hashed password in the database

        // If the password is incorrect, send an error message
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // If the password is correct, generate a token for the user
        const token = jwt.sign({ _id: user._id }, 'your-secret-key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Logged in successfully', token: token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;