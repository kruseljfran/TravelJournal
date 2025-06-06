"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const API_BASE = "http://localhost:8080/api"

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      const meRes = await fetch(`${API_BASE}/auth/me`, {
        credentials: "include",
      })
      const user = await meRes.json()
      onLogin(user)
      navigate("/home")
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.loginCard} className="card fade-in">
        <div className="card-header text-center">
          <h1 style={styles.title}>Travel Journal</h1>
          <p style={styles.subtitle}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn-primary" style={styles.submitButton}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  loginCard: {
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    marginBottom: "8px",
  },
  subtitle: {
    color: "#6c757d",
    marginBottom: "0",
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
  },
}

export default LoginPage
