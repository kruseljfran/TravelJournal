"use client"

import "./App.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import SharedPosts from "./components/SharedPosts/SharedPosts"
import PostDetail from "./components/PostDetail/PostDetail"
import LoginPage from "./components/LoginPage/LoginPage"
import RegisterPage from "./components/RegisterPage/RegisterPage"
import Header from "./components/Header/Header"
import User from "./components/User/User"
import TripList from "./components/TripList/TripList"

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8080/api/auth/me", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((user) => {
        if (user) setCurrentUser(user)
      })
  }, [])

  const signOut = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      setCurrentUser(null)
    } catch (err) {
      console.error("Error during sign out:", err)
    }
  }

  return (
    <Router>
      <div className="App min-h-screen">
        {/* header samo ako je korisnik ulogiran */}
        {currentUser && <Header onSignOut={signOut} />}

        {/* header padding */}
        <div style={{ paddingTop: currentUser ? "80px" : "0" }}>
          <Routes>
            {/* Login */}
            <Route
              path="/login"
              element={currentUser ? <Navigate to="/home" replace /> : <LoginPage onLogin={setCurrentUser} />}
            />

            {/* Register */}
            <Route path="/register" element={currentUser ? <Navigate to="/home" replace /> : <RegisterPage />} />

            {/* Home */}
            <Route
              path="/home"
              element={currentUser ? <SharedPosts currentUser={currentUser} /> : <Navigate to="/login" replace />}
            />

            {/* Post detail */}
            <Route
              path="/post/:postId"
              element={currentUser ? <PostDetail currentUser={currentUser} /> : <Navigate to="/login" replace />}
            />

            {/* Trips */}
            <Route
              path="/trips"
              element={currentUser ? <TripList currentUser={currentUser} /> : <Navigate to="/login" replace />}
            />

            {/* Profile */}
            <Route
              path="/profile"
              element={currentUser ? <User currentUser={currentUser} /> : <Navigate to="/login" replace />}
            />

            {/* Default */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
