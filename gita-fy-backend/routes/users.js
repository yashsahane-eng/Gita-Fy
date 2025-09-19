const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For creating user tokens
require('dotenv').config(); // To get our secret key for JWT

const User = require('../models/User'); // Import our User model

// @route   POST api/users/register
// @desc    Register a new user (NOW SECURE)
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // --- NEW: Check if user already exists ---
    let user = await User.findOne({ email });
    if (user) {
      // 400 means "Bad Request"
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user instance
    user = new User({
      username,
      email,
      password,
    });

    // --- NEW: Hash the password before saving ---
    const salt = await bcrypt.genSalt(10); // Generate a "salt" for encryption
    user.password = await bcrypt.hash(password, salt); // Hash the password

    // Save the user with the hashed password to the database
    await user.save();

    // --- NEW: Create and return a JWT upon successful registration ---
    const payload = {
        user: {
            id: user.id, // The unique ID created by MongoDB
        },
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET, // A secret key we will create
        { expiresIn: '5h' }, // Token expires in 5 hours
        (err, token) => {
            if (err) throw err;
            res.status(201).json({ token }); // Send the token back
        }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// --- NEW: LOGIN ROUTE ---
// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the submitted password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // If credentials are correct, create and return a JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
// ADD THIS BLOCK to routes/users.js

// @route   GET api/users
// @desc    Get current user's data (except password)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // req.user.id is available from our auth middleware
    // We use .select('-password') to exclude the password from being sent
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});