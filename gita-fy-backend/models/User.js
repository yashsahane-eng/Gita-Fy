const mongoose = require('mongoose');

// --- NEW: We first define the blueprint for a single history item ---
const HistorySchema = new mongoose.Schema({
  emotion: {
    type: String,
    required: true
  },
  verse: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now // This automatically sets the date when a wisdom is saved
  }
});


// --- This is your original User data blueprint, now with the history field added ---
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // No two users can have the same username
  },
  email: {
    type: String,
    required: true,
    unique: true // No two users can have the same email
  },
  password: {
    type: String,
    required: true
  },
  // --- THIS IS THE NEW FIELD ---
  // It's an array that will be filled with objects matching the HistorySchema blueprint
  history: [HistorySchema]
}, {
  // This automatically adds `createdAt` and `updatedAt` fields
  timestamps: true 
});

// This creates a "model" from our blueprint that we can use to create new users
const User = mongoose.model('User', UserSchema);

// This makes the User model available to other files in our project
module.exports = User;