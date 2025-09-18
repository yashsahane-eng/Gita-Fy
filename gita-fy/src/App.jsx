import React, { useState, useEffect, useRef } from 'react'; // Import useEffect and useRef
import LoginPage from './LoginPage';
import { gitaWisdom } from './gitaData';
import './App.css';

// --- NEW: UserBar Component ---
// This component handles the user icon and dropdown menu.
function UserBar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref to detect clicks outside the dropdown

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Effect to close the dropdown if you click outside of it
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
            <li><a href="#">Profile</a></li>
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


// --- GuidancePage Component ---
function GuidancePage() {
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [solution, setSolution] = useState(null);

  const findSolution = (emotion) => {
    setSelectedEmotion(emotion);
    const solutions = gitaWisdom[emotion];
    const randomSolution = solutions[Math.floor(Math.random() * solutions.length)];
    setSolution(randomSolution);
  };

  const emotions = Object.keys(gitaWisdom);

  return (
    <div className="container">
      <UserBar /> {/* <-- ADDED THE USER BAR HERE */}
      <header>
        <h1>Gita-fy</h1>
        <p>Find timeless wisdom for your modern problems.</p>
      </header>
      
      <main>
        <h2>How are you feeling today?</h2>
        <div className="emotion-selector">
          {emotions.map(emotion => (
            <button 
              key={emotion} 
              onClick={() => findSolution(emotion)} 
              className={selectedEmotion === emotion ? 'selected' : ''}
            >
              {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
            </button>
          ))}
        </div>
        
        {solution && (
          <div className="solution-card">
            <h3>Wisdom for when you're feeling {selectedEmotion}</h3>
            <h4>{solution.verse}</h4>
            <p className="verse-text">"{solution.text}"</p>
            <p className="explanation">{solution.explanation}</p>
          </div>
        )}
      </main>
    </div>
  );
}


// --- Main App Component ---
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? <GuidancePage /> : <LoginPage onLogin={handleLogin} />}
    </>
  );
}

export default App;