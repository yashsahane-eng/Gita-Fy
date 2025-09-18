import React from 'react';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const handleLoginClick = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="login-page-wrapper">
      {/* Column 1: The Image Panel */}
      <div className="login-image-panel">
        {/* This div is intentionally empty. The background image is set in CSS. */}
      </div>

      {/* Column 2: The Form Panel */}
      <div className="login-form-panel">
        
        {/* Container for all the background decorations */}
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

        {/* The Login Form Container */}
        <div className="login-container">
            <div className="login-logo">
                {/* You can place a logo here if you have one */}
                <h1>Gita-Fy</h1>
            </div>
            <form className="login-form" onSubmit={handleLoginClick}>
                <div className="input-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required />
                </div>
                <div className="options-group">
                    <label className="remember-me">
                        <input type="checkbox" />
                        Remember Me
                    </label>
                </div>
                <button type="submit" className="login-button">Log In</button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;