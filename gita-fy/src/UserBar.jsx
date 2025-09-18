import React, { useState, useEffect, useRef } from 'react';
import './UserBar.css'; // We will create this CSS file next

function UserBar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="user-bar-container" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="user-icon-button">
        {/* User Icon SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <ul>
             <li><a href="#" onClick={() => onNavigate('profile')}>Profile</a></li>
            <li><a href="#">History</a></li>
            <li><a href="#">Suggestions</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Address</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserBar;