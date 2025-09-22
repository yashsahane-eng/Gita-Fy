// --- IMPORT DEPENDENCIES ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // loads .env locally, Render ignores this and uses Dashboard vars

// --- CREATE EXPRESS APP ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(cors()); // allow cross-origin requests
app.use(express.json()); // parse JSON bodies

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully."))
.catch(err => console.error("❌ MongoDB connection error:", err));

// --- TEST ROUTE ---
app.get('/', (req, res) => {
  res.send('🚀 Gita-Fy Backend is running!');
});

// --- API ROUTES ---
app.use('/api/users', require('./routes/users'));
app.use('/api/history', require('./routes/history'));
app.use('/api/gita', require('./routes/gita'));

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🌐 Server is running on port: ${PORT}`);
});
