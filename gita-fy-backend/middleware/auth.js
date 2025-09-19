const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // Get the token from the request header
  const token = req.header('x-auth-token');

  // Check if no token is provided
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // If there is a token, verify it
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // The token contains the user's ID. We add it to the request object
    // so our routes can know who is making the request.
    req.user = decoded.user;
    next(); // Move on to the next piece of middleware or the route itself
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};