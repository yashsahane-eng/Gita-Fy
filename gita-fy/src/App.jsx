import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

//==================================================================
// STYLES: All CSS is now inside this file
//==================================================================
const AppStyles = () => (
  <style>{`
    /* --- GLOBAL STYLES --- */
    body { margin: 0; font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif; background-color: #3d2e5b; color: #333; box-sizing: border-box; }
    *, *:before, *:after { box-sizing: inherit; }
    body.grid-center { display: grid; place-items: center; min-height: 100vh; padding: 2rem 1rem; }

    /* --- LOGIN & REGISTER PAGE STYLES --- */
    .login-page-wrapper { display: flex; width: 100vw; height: 100vh; overflow: hidden; }
    .login-image-panel { flex: 1; background-image: url('/shree_krishna.jpg'); background-size: cover; background-position: center; }
    .login-form-panel { flex: 1; display: flex; align-items: center; justify-content: center; position: relative; background-color: #2c1e4d; }
    .decorations-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; overflow: hidden; }
    .login-container { width: 100%; max-width: 380px; background: #fff; padding: 2.5rem; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); z-index: 2; text-align: center; }
    .login-logo h1 { font-size: 2.5rem; color: #6a05ad; margin-bottom: 2rem; }
    .input-group { margin-bottom: 1.5rem; text-align: left; }
    .input-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #555; font-size: 0.9rem; }
    .input-group input { width: 100%; padding: 0.8rem 1rem; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; }
    .options-group { display: flex; align-items: center; margin-bottom: 1.5rem; }
    .remember-me { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; cursor: pointer; color: #555; }
    .login-button { width: auto; padding: 0.8rem 1.8rem; border: none; border-radius: 6px; background: #6a05ad; color: white; font-size: 1rem; font-weight: 700; cursor: pointer; }
    .error-message { color: #c72c41; background-color: #fddfe2; border: 1px solid #f0a0a9; border-radius: 6px; padding: 0.8rem; margin-bottom: 1.5rem; font-weight: 600; }
    .navigation-link { margin-top: 1.5rem; text-align: center; font-size: 0.9rem; color: #555; }
    .navigation-link a { color: #6a05ad; font-weight: 600; text-decoration: none; }
    .decoration { position: absolute; color: #fff; }
    .star { text-shadow: 0 0 10px rgba(255, 255, 255, 0.8); animation: pulse 4s infinite ease-in-out; opacity: 0.7; }
    #star1 { top: 10%; left: 5%; font-size: 1.5rem; } #star2 { top: 20%; right: 10%; font-size: 1rem; } #star3 { top: 50%; left: 15%; font-size: 2rem; } #star4 { top: 80%; left: 8%; font-size: 1.2rem; } #star5 { top: 60%; right: 5%; font-size: 1.8rem; } #star6 { bottom: 10%; right: 15%; font-size: 1rem; } #star7 { bottom: 25%; left: 25%; font-size: 1.5rem; } #star8 { top: 5%; right: 20%; font-size: 0.8rem; }
    #planet1 { bottom: 15%; left: 2%; width: 80px; height: 80px; background: linear-gradient(45deg, #ffafcc, #bde0fe); border-radius: 50%; animation: float 8s infinite ease-in-out; } #planet2 { top: 15%; right: 2%; width: 50px; height: 50px; background: linear-gradient(45deg, #fca5a5, #fcd34d); border-radius: 50%; animation: float 10s infinite ease-in-out; } #planet3 { top: 65%; left: 8%; width: 20px; height: 20px; background: #e5e7eb; border-radius: 50%; animation: float 6s infinite ease-in-out; }
    .flower { color: #fca5a5; text-shadow: 0 0 8px #fecaca; animation: spin 20s infinite linear; opacity: 0.6; }
    #flower1 { top: 5%; left: 20%; font-size: 3rem; } #flower2 { top: 40%; right: 12%; font-size: 2.5rem; } #flower3 { bottom: 5%; right: 5%; font-size: 4rem; } #flower4 { bottom: 15%; left: 15%; font-size: 2rem; } #flower5 { top: 70%; right: 20%; font-size: 3.5rem; } #flower6 { bottom: 85%; left: 30%; font-size: 2.8rem; }
    
    /* --- MAIN APP CONTAINER --- */
    .container { max-width: 900px; width: 100%; margin: 2rem auto; padding: 2.5rem; background: #fff; border-radius: 15px; box-shadow: 0 8px 30px rgba(0,0,0,0.4); position: relative; }
    .page-header { text-align: center; margin-bottom: 2.5rem; }
    .page-header h1 { font-size: 3.2rem; font-weight: 600; color: #8b5cf6; margin: 0; }
    .sanskrit-tagline { font-size: 1.2rem; color: #7f8c8d; margin-top: 0.5rem; font-family: 'Georgia', serif; }
    .sanskrit-tagline .transliteration { display: block; font-size: 0.9rem; margin-top: 0.25rem; font-style: italic; color: #a0a0a0; }
    h2 { font-size: 1.8rem; color: #34495e; margin-bottom: 1.5rem; text-align: center; }
    .emotion-selector { display: flex; justify-content: center; gap: 0.8rem; margin-top: 1.5rem; flex-wrap: wrap; }
    .emotion-selector button { padding: 0.7rem 1.4rem; border: 2px solid #a855f7; border-radius: 30px; background-color: #fff; color: #8b5cf6; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s, color 0.2s; }
    .emotion-selector button:disabled { background-color: #e5e7eb; color: #9ca3af; border-color: #d1d5db; cursor: not-allowed; }
    .emotion-selector button.selected { background-color: #a855f7; color: white; }
    .solution-card { margin-top: 3rem; padding: 2rem 2.5rem; text-align: left; background: linear-gradient(to bottom right, #fdfcff, #f5f0ff); border-radius: 12px; border-left: 5px solid #a855f7; animation: cardFadeIn 0.5s ease-out; }
    .verse-text { font-family: 'Georgia', serif; font-size: 1.3rem; color: #5b21b6; font-style: italic; border-left: 3px solid #d8b4fe; padding-left: 1.5rem; }
    .loading-spinner { border: 4px solid #f3f3f3; border-top: 4px solid #8b5cf6; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 2rem auto; }
    .another-wisdom-container { text-align: center; margin-top: 1.5rem; }
    .another-wisdom-button { background-color: #f5f3ff; color: #6d28d9; border: 1px solid #ddd6fe; border-radius: 50px; padding: 0.7rem 1.5rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease-in-out; }
    .another-wisdom-button:hover { background-color: #ede9fe; transform: translateY(-1px); }
    .another-wisdom-button:disabled { background-color: #e5e7eb; color: #9ca3af; border-color: #d1d5db; cursor: not-allowed; }
    .problem-input-section { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #eee; }
    .problem-textarea { width: 100%; min-height: 80px; padding: 1rem; border: 1px solid #ccc; border-radius: 8px; font-size: 1rem; font-family: 'Segoe UI', sans-serif; resize: vertical; margin-bottom: 1rem; }
    .problem-submit-button { display: block; width: 100%; padding: 1rem; border: none; border-radius: 8px; background: linear-gradient(90deg, #8b5cf6, #6a05ad); color: white; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
    .problem-submit-button:disabled { background: #9ca3af; cursor: not-allowed; }
    .problem-submit-button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
    
    /* --- USER BAR & DROPDOWN --- */
    .user-bar-container { position: absolute; top: 20px; right: 25px; z-index: 100; }
    .user-icon-button { background: none; border: none; cursor: pointer; padding: 8px; border-radius: 50%; display: flex; color: #555; }
    .dropdown-menu { position: absolute; top: 50px; right: 0; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); width: 220px; padding: 8px 0; }
    .dropdown-menu ul { list-style: none; margin: 0; padding: 0; }
    .dropdown-menu li a { display: block; padding: 12px 20px; text-decoration: none; color: #333; }
    .dropdown-menu li a:hover { background-color: #f5f5f5; color: #6a05ad; }
    .dropdown-divider { height: 1px; margin: 8px 0; overflow: hidden; background-color: #e5e7eb; }
    .logout-item a { color: #ef4444; font-weight: 600; }
    
    /* --- PROFILE, HISTORY, SUGGESTIONS, ABOUT PAGES --- */
    .page-container { width: 100%; display: flex; justify-content: center; align-items: flex-start; padding: 5rem 1rem 2rem 1rem; position: relative; }
    .profile-card, .history-card, .suggestions-card, .about-card { width: 100%; max-width: 800px; background: #fff; border-radius: 16px; overflow: hidden; animation: cardFadeIn 0.5s ease-out; }
    .profile-header { background: linear-gradient(135deg, #a855f7, #6a05ad); color: #fff; padding: 2rem; text-align: center; }
    .profile-avatar { width: 90px; height: 90px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 4px solid #fff; }
    .profile-avatar span { font-size: 2.5rem; }
    .profile-body { padding: 1.5rem 2rem; }
    .info-item { display: flex; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid #f0f0f0; }
    .profile-footer { padding: 1.5rem; background: #f9f9f9; text-align: center; }
    .back-button { background: none; border: 1px solid #c4b5fd; color: #8b5cf6; padding: 0.6rem 1.2rem; border-radius: 50px; cursor: pointer; transition: background-color 0.2s, color 0.2s; }
    .back-button:hover { background-color: #8b5cf6; color: #fff; }
    .history-header, .suggestions-header, .about-header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem; background: #f9f9f9; border-bottom: 1px solid #eee; }
    .history-header h1, .suggestions-header h1, .about-header h1 { margin: 0; font-size: 1.5rem; color: #3d1d63; }
    .history-body, .suggestions-body, .about-body { padding: 1rem 2.5rem 2.5rem; max-height: 70vh; overflow-y: auto; }
    .history-list { list-style: none; padding: 0; }
    .history-item { padding: 1.5rem 0; border-bottom: 1px solid #f0f0f0; }
    .suggestion-section { margin-bottom: 2rem; }
    .suggestion-title { font-size: 1.3rem; color: #6a05ad; border-bottom: 2px solid #e9d5ff; padding-bottom: 0.5rem; margin-bottom: 1rem; }
    .suggestion-list { list-style: none; padding: 0; }
    .suggestion-item { margin-bottom: 0.8rem; line-height: 1.7; }
    .suggestion-item a { color: #8b5cf6; text-decoration: none; }
    .about-body p { line-height: 1.8; margin-bottom: 1rem; }
    .about-body strong { color: #3d1d63; }
    .about-links { list-style: none; padding: 0; margin-top: 2rem; }
    .about-links li { margin-bottom: 0.8rem; }
    .about-links a { color: #8b5cf6; text-decoration: none; font-weight: 600; }
    .about-links a:hover { text-decoration: underline; }

    @keyframes cardFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `}</style>
);

//==================================================================
// All Components are now inside this file
//==================================================================

function UserBar({ onNavigate, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setIsOpen(!isOpen);
  useEffect(() => {
    function handleClickOutside(event) { if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false); }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);
  const handleNavigationClick = (e, page) => { e.preventDefault(); onNavigate(page); setIsOpen(false); };
  const handleLogoutClick = (e) => { e.preventDefault(); onLogout(); };
  return (
    <div className="user-bar-container" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="user-icon-button"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></button>
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li><a href="#" onClick={(e) => handleNavigationClick(e, 'profile')}>Profile</a></li>
            <li><a href="#" onClick={(e) => handleNavigationClick(e, 'history')}>History</a></li>
            <li><a href="#" onClick={(e) => handleNavigationClick(e, 'suggestions')}>Suggestions</a></li>
            {/* --- NEW LINK ADDED --- */}
            <li><a href="#" onClick={(e) => handleNavigationClick(e, 'about')}>About</a></li>
            <li className="dropdown-divider"></li>
            <li className="logout-item"><a href="#" onClick={handleLogoutClick}>Logout</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}

function GuidancePage({ onNavigate, onLogout }) {
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [lastQuery, setLastQuery] = useState(null);
  const [solution, setSolution] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [customProblem, setCustomProblem] = useState('');

  const getWisdom = async (payload, query) => {
    setIsLoading(true);
    setError('');
    setSolution(null);
    setLastQuery(query);
    try {
      const response = await axios.post('/api/gita/get-wisdom', payload);
      const aiSolution = response.data;
      setSolution(aiSolution);
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = { headers: { 'x-auth-token': token } };
      const historyPayload = query.emotion ? { emotion: query.emotion, ...aiSolution } : { emotion: 'Custom: ' + query.problem.substring(0, 20) + '...', ...aiSolution };
      await axios.post('/api/history', historyPayload, config);
    } catch (err) {
      console.error('AI Error:', err);
      setError('Sorry, wisdom could not be found. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
    setCustomProblem('');
    getWisdom({ emotion }, { emotion });
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customProblem.trim()) return;
    setSelectedEmotion('');
    getWisdom({ problem: customProblem }, { problem: customProblem });
  };
  
  const emotions = ["compassion", "detachment", "fearlessness", "forgiveness", "peace", "humility", "desire", "anger", "greed", "ego", "fear", "delusion", "grief", "jealousy", "surrender", "equanimity", "contentment"];

  return (
    <div className="container">
      <UserBar onNavigate={onNavigate} onLogout={onLogout} />
      <header className="page-header"><h1>Gita-Fy</h1><p className="sanskrit-tagline">शाश्वतं ज्ञानम्<span className="transliteration">(Shashvatam Jnanam - Eternal Wisdom)</span></p></header>
      <main>
        <h2>How are you feeling today?</h2>
        <div className="emotion-selector">{emotions.map(emotion => (<button key={emotion} onClick={() => handleEmotionClick(emotion)} className={selectedEmotion === emotion ? 'selected' : ''} disabled={isLoading}>{emotion.charAt(0).toUpperCase() + emotion.slice(1)}</button>))}</div>
        <div className="problem-input-section">
            <h2>Or, describe your problem</h2>
            <form onSubmit={handleCustomSubmit}>
                <textarea className="problem-textarea" placeholder="e.g., I feel lost in my career and don't know what to do..." value={customProblem} onChange={(e) => setCustomProblem(e.target.value)} disabled={isLoading} />
                <button type="submit" className="problem-submit-button" disabled={isLoading || !customProblem.trim()}>Find Wisdom for My Problem</button>
            </form>
        </div>
        {isLoading && <div className="loading-spinner"></div>}
        {error && !isLoading && <p className="error-message">{error}</p>}
        {solution && !isLoading && (
          <>
            <div className="solution-card"><h3>Wisdom for your situation</h3><h4>{solution.verse}</h4><p className="verse-text">"{solution.text}"</p><p className="explanation">{solution.explanation}</p></div>
            <div className="another-wisdom-container">
              <button className="another-wisdom-button" onClick={() => getWisdom(lastQuery.emotion ? { emotion: lastQuery.emotion } : { problem: lastQuery.problem }, lastQuery)} disabled={isLoading}>Find Another Verse</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function ProfilePage({ onNavigate, onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { 'x-auth-token': token } };
        const res = await axios.get('/api/users', config);
        setUser(res.data);
      } catch (err) { console.error('Could not fetch user data', err); }
      finally { setLoading(false); }
    };
    fetchUserData();
  }, []);
  if (loading) return <div className="page-container"><p>Loading Profile...</p></div>;
  if (!user) return <div className="page-container"><p>Could not load profile.</p></div>
  return (
    <div className="page-container">
      <UserBar onNavigate={onNavigate} onLogout={onLogout} />
      <div className="profile-card">
        <div className="profile-header"><div className="profile-avatar"><span>{user.username.charAt(0).toUpperCase()}</span></div><h2>{user.username}</h2><p>{user.email}</p></div>
        <div className="profile-body">
          <div className="info-item"><strong>Joined On:</strong><span>{new Date(user.createdAt).toLocaleDateString()}</span></div>
          <div className="info-item"><strong>Wisdoms Found:</strong><span>{user.history ? user.history.length : 0}</span></div>
          <div className="info-item"><strong>Last Active:</strong><span>{new Date(user.updatedAt).toLocaleDateString()}</span></div>
        </div>
        <div className="profile-footer"><button onClick={() => onNavigate('guidance')} className="back-button">← Back to Guidance</button></div>
      </div>
    </div>
  );
}

function RegisterPage({ onRegisterSuccess, onNavigate }) {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { username, email, password } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('/api/users/register', { username, email, password });
            localStorage.setItem('token', response.data.token);
            onRegisterSuccess();
        } catch (err) { setError(err.response ? err.response.data.message : 'Registration failed!'); }
    };
    return (
        <div className="login-page-wrapper">
            <div className="login-image-panel"></div>
            <div className="login-form-panel">
                <div className="decorations-bg"><div className="decoration star" id="star1">✦</div><div className="decoration star" id="star2">✧</div><div className="decoration star" id="star3">✨</div><div className="decoration star" id="star4">✦</div><div className="decoration star" id="star5">✧</div><div className="decoration star" id="star6">✨</div><div className="decoration star" id="star7">✦</div><div className="decoration star" id="star8">✧</div><div className="decoration" id="planet1"></div><div className="decoration" id="planet2"></div><div className="decoration" id="planet3"></div><div className="decoration flower" id="flower1">❀</div><div className="decoration flower" id="flower2">✿</div><div className="decoration flower" id="flower3">❀</div><div className="decoration flower" id="flower4">✿</div><div className="decoration flower" id="flower5">❀</div><div className="decoration flower" id="flower6">✿</div></div>
                <div className="login-container">
                    <div className="login-logo"><h1>Create Account</h1></div>
                    {error && <p className="error-message">{error}</p>}
                    <form className="login-form" onSubmit={handleRegisterSubmit}>
                        <div className="input-group"><label htmlFor="username">Username</label><input type="text" id="username" name="username" value={username} onChange={onChange} required /></div>
                        <div className="input-group"><label htmlFor="email">Email Address</label><input type="email" id="email" name="email" value={email} onChange={onChange} required /></div>
                        <div className="input-group"><label htmlFor="password">Password</label><input type="password" id="password" name="password" value={password} onChange={onChange} minLength="6" required /></div>
                        <button type="submit" className="login-button">Sign Up</button>
                    </form>
                    <div className="navigation-link"><p>Already have an account?{' '}<a href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>Log In</a></p></div>
                </div>
            </div>
        </div>
    );
}

function LoginPage({ onLogin, onNavigate }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { email, password } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      onLogin();
    } catch (err) { setError(err.response ? err.response.data.message : 'Login failed!'); }
  };
  return (
    <div className="login-page-wrapper">
      <div className="login-image-panel"></div>
      <div className="login-form-panel">
        <div className="decorations-bg"><div className="decoration star" id="star1">✦</div><div className="decoration star" id="star2">✧</div><div className="decoration star" id="star3">✨</div><div className="decoration star" id="star4">✦</div><div className="decoration star" id="star5">✧</div><div className="decoration star" id="star6">✨</div><div className="decoration star" id="star7">✦</div><div className="decoration star" id="star8">✧</div><div className="decoration" id="planet1"></div><div className="decoration" id="planet2"></div><div className="decoration" id="planet3"></div><div className="decoration flower" id="flower1">❀</div><div className="decoration flower" id="flower2">✿</div><div className="decoration flower" id="flower3">❀</div><div className="decoration flower" id="flower4">✿</div><div className="decoration flower" id="flower5">❀</div><div className="decoration flower" id="flower6">✿</div></div>
        <div className="login-container">
          <div className="login-logo"><h1>Gita-Fy</h1></div>
          {error && <p className="error-message">{error}</p>}
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <div className="input-group"><label htmlFor="email">Email Address</label><input type="email" id="email" name="email" value={email} onChange={onChange} required /></div>
            <div className="input-group"><label htmlFor="password">Password</label><input type="password" id="password" name="password" value={password} onChange={onChange} required /></div>
            <div className="options-group"><label className="remember-me"><input type="checkbox" /> Remember Me</label></div>
            <button type="submit" className="login-button">Log In</button>
          </form>
          <div className="navigation-link"><p>Don't have an account?{' '}<a href="#" onClick={(e) => { e.preventDefault(); onNavigate('register'); }}>Sign Up</a></p></div>
        </div>
      </div>
    </div>
  );
}

function HistoryPage({ onNavigate, onLogout }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { 'x-auth-token': token } };
                const res = await axios.get('/api/history', config);
                setHistory(res.data);
            } catch (err) { console.error('Could not fetch history', err); }
            finally { setLoading(false); }
        };
        fetchHistory();
    }, []);
    return (
      <div className="page-container">
        <UserBar onNavigate={onNavigate} onLogout={onLogout} />
        <div className="history-card">
            <div className="history-header"><h1>Your Wisdom History</h1><button onClick={() => onNavigate('guidance')} className="back-button">← Back to Guidance</button></div>
            <div className="history-body">
                {loading ? (<p>Loading...</p>) : history.length === 0 ? (<p>No history yet.</p>) : (<ul>{history.map((item, index) => (<li key={index} className="history-item"><p><strong>{item.emotion}</strong></p><p>{item.verse}</p><blockquote>"{item.text}"</blockquote></li>))}</ul>)}
            </div>
        </div>
      </div>
    );
}

function SuggestionsPage({ onNavigate, onLogout }) {
    return (
      <div className="page-container">
        <UserBar onNavigate={onNavigate} onLogout={onLogout} />
        <div className="suggestions-card">
            <div className="suggestions-header"><h1>Further Guidance</h1><button onClick={() => onNavigate('guidance')} className="back-button">← Back to Guidance</button></div>
            <div className="suggestions-body">
                <div className="suggestion-section">
                    <h2 className="suggestion-title">Recommended Reading</h2>
                    <ul className="suggestion-list">
                        <li className="suggestion-item"><a href="https://www.amazon.com/Bhagavad-Gita-Eknath-Easwaran/dp/1586380192" target="_blank" rel="noopener noreferrer">The Bhagavad Gita by Eknath Easwaran</a></li>
                        <li className="suggestion-item"><a href="https://www.gita-society.com/scriptures/gita-unveiled-english.pdf" target="_blank" rel="noopener noreferrer">The Bhagavad Gita by Swami Sivananda (PDF)</a></li>
                    </ul>
                </div>
                <div className="suggestion-section">
                    <h2 className="suggestion-title">Online Discourses</h2>
                    <ul className="suggestion-list">
                        <li><a href="https://www.youtube.com/watch?v=pYquV_bV_jA&list=PLjF8gGBEXce00M12vXAnQ-T_dote-h_h_" target="_blank" rel="noopener noreferrer">Lectures by Swami Sarvapriyananda</a></li>
                        <li><a href="https://www.youtube.com/@Sadhguru" target="_blank" rel="noopener noreferrer">Sadhguru on the Gita</a></li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    );
}

//==================================================================
// NEW COMPONENT 8: AboutPage
//==================================================================
function AboutPage({ onNavigate, onLogout }) {
    return (
      <div className="page-container">
        <UserBar onNavigate={onNavigate} onLogout={onLogout} />
        <div className="about-card">
            <div className="about-header">
                <h1>About This Project</h1>
                <button onClick={() => onNavigate('guidance')} className="back-button">← Back to Guidance</button>
            </div>
            <div className="about-body">
                <p>
                    This project was created by <strong>Yash Dilip Sahane</strong>, a final year Electronics and Telecommunication engineering student from Smt. Kashibai Navale College Of Engineering, Pune.
                </p>
                <p>
                    Gita-Fy aims to bring the timeless wisdom of the Bhagavad Gita to a modern audience, offering guidance and clarity for everyday problems through the power of AI.
                </p>
                <ul className="about-links">
                    <li>
                        <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/yash-sahane-5a6340219" target="_blank" rel="noopener noreferrer">yash-sahane-5a6340219</a>
                    </li>
                    <li>
                        <strong>GitHub:</strong> <a href="https://github.com/yashsahane-eng" target="_blank" rel="noopener noreferrer">yashsahane-eng</a>
                    </li>
                    <li>
                        <strong>Email:</strong> <a href="mailto:yashsahane.skncoe.entc@gmail.com">yashsahane.skncoe.entc@gmail.com</a>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    );
}


//==================================================================
// FINAL APP COMPONENT (The Manager)
//==================================================================
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('login'); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        setIsLoggedIn(true);
        setCurrentPage('guidance');
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('guidance');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const navigate = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (isLoggedIn) {
        document.body.className = 'grid-center';
    } else {
        document.body.className = '';
    }
  }, [isLoggedIn, currentPage]);

  return (
    <>
      <AppStyles />
      {isLoggedIn ? (
        <>
          {currentPage === 'guidance' && <GuidancePage onNavigate={navigate} onLogout={handleLogout} />}
          {currentPage === 'profile' && <ProfilePage onNavigate={navigate} onLogout={handleLogout} />}
          {currentPage === 'history' && <HistoryPage onNavigate={navigate} onLogout={handleLogout} />}
          {currentPage === 'suggestions' && <SuggestionsPage onNavigate={navigate} onLogout={handleLogout} />}
          {/* --- NEW ROUTE ADDED --- */}
          {currentPage === 'about' && <AboutPage onNavigate={navigate} onLogout={handleLogout} />}
        </>
      ) : (
        <>
          {currentPage === 'login' && <LoginPage onLogin={handleAuthSuccess} onNavigate={navigate} />}
          {currentPage === 'register' && <RegisterPage onRegisterSuccess={handleAuthSuccess} onNavigate={navigate} />}
        </>
      )}
    </>
  );
}

export default App;