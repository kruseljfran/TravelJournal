"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const API_BASE = "http://localhost:8080/api"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Lozinke se ne poklapaju")
      return
    }

    if (formData.password.length < 6) {
      setError("Lozinka mora imati najmanje 6 znakova")
      return
    }

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      })

      if (res.ok) {
        setSuccess("Registracija uspješna! Možete se prijaviti.")
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      } else {
        const errorText = await res.text()
        setError(errorText)
      }
    } catch (err) {
      setError("Greška pri registraciji. Pokušajte ponovo.")
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.registerCard} className="card fade-in">
        <div className="card-header text-center">
          <h1 style={styles.title}>Putni dnevnik</h1>
          <p style={styles.subtitle}>Stvorite novi račun</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Korisničko ime</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Unesite korisničko ime"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Unesite email adresu"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Lozinka</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Unesite lozinku"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Potvrdite lozinku</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Ponovite lozinku"
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <button type="submit" className="btn-primary" style={styles.submitButton}>
            Registrirajte se
          </button>
        </form>

        <div style={styles.loginLink}>
          <p>
            Već imate račun?{" "}
            <Link to="/login" style={styles.link}>
              Prijavite se
            </Link>
          </p>
        </div>
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
  registerCard: {
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
  loginLink: {
    textAlign: "center",
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #e9ecef",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "600",
  },
}

export default RegisterPage
