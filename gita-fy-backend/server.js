// Import the tools we installed
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This line loads the .env file

// Create our Express app
const app = express();
const PORT = process.env.PORT || 5000; // Use the port from our .env file or default to 5000

// --- MIDDLEWARE ---
// This allows our React app to send requests to this server
app.use(cors());
// This allows our server to understand JSON data
app.use(express.json());

// --- DATABASE CONNECTION ---
// Get the connection string from our .env file
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  // This message will show in the terminal if the connection is successful
  console.log("MongoDB connected successfully.");
})
.catch(err => {
  // This message will show if there is an error
  console.error("MongoDB connection error:", err);
});


// --- A SIMPLE TEST ROUTE ---
// This is a basic "endpoint" to test if our server is working
app.get('/', (req, res) => {
  res.send('Gita-Fy Backend is running!');
});


// --- API ROUTES ---
// This tells our server to use the user routes we created
app.use('/api/users', require('./routes/users'));

// --- THIS IS THE ONLY NEW LINE YOU NEED TO ADD ---
// This tells our server to use the new history routes
app.use('/api/history', require('./routes/history'));

app.use('/api/users', require('./routes/users'));
app.use('/api/history', require('./routes/history'));

// --- ADD THIS NEW LINE ---
app.use('/api/gita', require('./routes/gita')); 

// --- START THE SERVER ---
// This tells our app to listen for requests on the specified port
app.listen(PORT, () => {
  // This message will show in the terminal once the server is running
  console.log(`Server is running on port: ${PORT}`);
});
