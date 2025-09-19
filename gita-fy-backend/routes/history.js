const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import our security guard middleware
const User = require('../models/User'); // Import the User model

// @route   GET api/history
// @desc    Get all of the logged-in user's history
// @access  Private (because we use the 'auth' middleware)
router.get('/', auth, async (req, res) => {
  try {
    // req.user.id is available because our 'auth' middleware added it
    const user = await User.findById(req.user.id).select('history');
    res.json(user.history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/history
// @desc    Save a new wisdom to the user's history
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    // Get the data sent from the React app
    const { emotion, verse, text, explanation } = req.body;

    const newHistoryItem = {
      emotion,
      verse,
      text,
      explanation,
    };

    // Find the logged-in user in the database
    const user = await User.findById(req.user.id);

    // Add the new history item to the beginning of their history array
    user.history.unshift(newHistoryItem);

    // Save the updated user back to the database
    await user.save();

    // Send the updated history back as confirmation
    res.json(user.history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;