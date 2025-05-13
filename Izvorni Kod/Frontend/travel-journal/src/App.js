import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SharedPosts from './components/SharedPosts';
import LoginPage from './components/LoginPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/auth/me', {
      credentials: 'include',
    })
      .then(res => res.ok ? res.text() : null)
      .then(user => {
        if (user) setCurrentUser(user);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Travel Journal</h1>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={setCurrentUser} />} />
          <Route path="/home" element={
            currentUser ? (
              <SharedPosts currentUser={currentUser} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
