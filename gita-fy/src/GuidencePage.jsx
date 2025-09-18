import React, { useState } from 'react';
import UserBar from './UserBar';
import { gitaWisdom } from './gitaData';
import './App.css';

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
      <UserBar onNavigate={onNavigate}/>
      {/* This header has the correct class name */}
      <header className="page-header">
        <h1>Gita-Fy</h1>
        <p className="sanskrit-tagline">
          शाश्वतं ज्ञानम्
          <span className="transliteration">(Shashvatam Jnanam - Eternal Wisdom)</span>
        </p>
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

export default GuidancePage;