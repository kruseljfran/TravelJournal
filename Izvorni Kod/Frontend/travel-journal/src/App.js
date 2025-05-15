import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SharedPosts from './components/SharedPosts/SharedPosts';
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';
import User from './components/User/User'

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/auth/me', {
      credentials: 'include',
    })
      .then(res => res.ok ? res.json() : null)
      .then(user => {
        if (user) setCurrentUser(user);
      });
  }, []);

  const signOut = async () => {
    try {
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setCurrentUser(null);
    } catch (err) {
      console.error('Error during sign out:', err);
    }
  };

  return (
    <Router>
      <div className="App min-h-screen bg-gray-50 pt-16">
        {/* Show header only when logged in */}
        {currentUser && <Header onSignOut={signOut} />}

        <Routes>
          {/* Login route */}
          <Route path="/login" element={
            currentUser ? (
              <Navigate to="/home" replace />
            ) : (
              <LoginPage onLogin={setCurrentUser} />
            )
          } />

          {/* Home route */}
          <Route path="/home" element={
            currentUser ? (
              <SharedPosts currentUser={currentUser} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />

          {/* User Profile route */}
          <Route path="/profile" element={
            currentUser ? (
              <User currentUser={currentUser} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />


          {/* Default route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
