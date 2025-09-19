import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; // We will reuse the login page styles for a consistent look

// This component will receive functions from App.jsx to work
function RegisterPage({ onRegisterSuccess, onNavigate }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const newUser = { username, email, password };
      // Send the data to the backend endpoint you already built
      const response = await axios.post('/api/users/register', newUser);
      console.log('Registration Successful! Token:', response.data.token);
      // This tells the main App component that login was successful
      onRegisterSuccess();
    } catch (err) {
      // If the backend sends an error (like "User already exists"), show it
      setError(err.response ? err.response.data.message : 'Registration failed!');
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-image-panel"></div>
      <div className="login-form-panel">
        <div className="decorations-bg">
            <div className="decoration star" id="star1">✦</div><div className="decoration star" id="star2">✧</div><div className="decoration star" id="star3">✨</div><div className="decoration star" id="star4">✦</div><div className="decoration star" id="star5">✧</div><div className="decoration star" id="star6">✨</div><div className="decoration star" id="star7">✦</div><div className="decoration star" id="star8">✧</div><div className="decoration" id="planet1"></div><div className="decoration" id="planet2"></div><div className="decoration" id="planet3"></div><div className="decoration flower" id="flower1">❀</div><div className="decoration flower" id="flower2">✿</div><div className="decoration flower" id="flower3">❀</div><div className="decoration flower" id="flower4">✿</div><div className="decoration flower" id="flower5">❀</div><div className="decoration flower" id="flower6">✿</div>
        </div>
        <div className="login-container">
          <div className="login-logo"><h1>Create Account</h1></div>
          {error && <p className="error-message">{error}</p>}
          <form className="login-form" onSubmit={handleRegisterSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" value={username} onChange={onChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={email} onChange={onChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={password} onChange={onChange} minLength="6" required />
            </div>
            <button type="submit" className="login-button">Sign Up</button>
          </form>
          <div className="navigation-link">
            <p>
              Already have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;