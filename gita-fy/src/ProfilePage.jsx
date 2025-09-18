import React from 'react';
import './ProfilePage.css';

// The 'onNavigate' prop is a function that will let us go back
function ProfilePage({ onNavigate }) {
  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {/* Simple initial for the avatar */}
            <span>A</span>
          </div>
          <h2>Arjuna</h2>
          <p>arjuna@example.com</p>
        </div>
        <div className="profile-body">
          <div className="info-item">
            <strong>Joined On:</strong>
            <span>September 19, 2025</span>
          </div>
          <div className="info-item">
            <strong>Wisdoms Found:</strong>
            <span>12</span>
          </div>
          <div className="info-item">
            <strong>Last Active:</strong>
            <span>Today</span>
          </div>
        </div>
        <div className="profile-footer">
          {/* This button will take us back to the main page */}
          <button onClick={() => onNavigate('guidance')} className="back-button">
            ← Back to Guidance
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;