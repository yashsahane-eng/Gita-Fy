import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

// We now accept an 'onNavigate' function to switch to the register page
function LoginPage({ onLogin, onNavigate }) {
  // Add state to track user input and errors
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // This function now sends data to the backend
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Send the user's data to the backend
      const response = await axios.post('/api/users/login', { email, password });
      console.log('Login Successful! Token:', response.data.token);
      // Save the token to remember the user
      localStorage.setItem('token', response.data.token);
      onLogin(); // Call the onLogin function from App.jsx on success
    } catch (err) {
      // Display any error messages from the backend
      setError(err.response ? err.response.data.message : 'Login failed!');
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-image-panel"></div>
      <div className="login-form-panel">
        <div className="decorations-bg">
            <div className="decoration star" id="star1">✦</div>
            <div className="decoration star" id="star2">✧</div>
            <div className="decoration star" id="star3">✨</div>
            <div className="decoration star" id="star4">✦</div>
            <div className="decoration star" id="star5">✧</div>
            <div className="decoration star" id="star6">✨</div>
            <div className="decoration star" id="star7">✦</div>
            <div className="decoration star" id="star8">✧</div>
            <div className="decoration" id="planet1"></div>
            <div className="decoration" id="planet2"></div>
            <div className="decoration" id="planet3"></div>
            <div className="decoration flower" id="flower1">❀</div>
            <div className="decoration flower" id="flower2">✿</div>
            <div className="decoration flower" id="flower3">❀</div>
            <div className="decoration flower" id="flower4">✿</div>
            <div className="decoration flower" id="flower5">❀</div>
            <div className="decoration flower" id="flower6">✿</div>
        </div>
        <div className="login-container">
          <div className="login-logo">
            <h1>Gita-Fy</h1>
          </div>
          {/* Add a place to display error messages */}
          {error && <p className="error-message">{error}</p>}
          {/* Update the form to use the new submit handler */}
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              {/* Add name, value, and onChange to connect the input to our state */}
              <input type="email" id="email" name="email" value={email} onChange={onChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              {/* Add name, value, and onChange to connect the input to our state */}
              <input type="password" id="password" name="password" value={password} onChange={onChange} required />
            </div>
            <div className="options-group">
              <label className="remember-me">
                <input type="checkbox" /> Remember Me
              </label>
            </div>
            <button type="submit" className="login-button">Log In</button>
          </form>
          {/* --- ADD THIS NEW SECTION FOR THE SIGN UP LINK --- */}
          <div className="navigation-link">
            <p>
              Don't have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('register'); }}>
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;