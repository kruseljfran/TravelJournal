"use client"

import { useState } from "react"

const TripForm = ({ onTripCreated, onCancel, initialTrip = null }) => {
  const [formData, setFormData] = useState({
    title: initialTrip?.title || "",
    description: initialTrip?.description || "",
    startDate: initialTrip?.startDate || "",
    endDate: initialTrip?.endDate || "",
    totalCost: initialTrip?.totalCost || "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validation
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setError("End date must be after start date")
      setLoading(false)
      return
    }

    try {
      const url = initialTrip
        ? `http://localhost:8080/api/trips/${initialTrip.tripId}`
        : "http://localhost:8080/api/trips"

      const method = initialTrip ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          totalCost: Number.parseInt(formData.totalCost) || 0,
        }),
      })

      if (response.ok) {
        const trip = await response.json()
        onTripCreated(trip)
        if (!initialTrip) {
          // Reset form only for new trips
          setFormData({
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            totalCost: "",
          })
        }
      } else {
        setError("Failed to save trip. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.overlay}>
      <div className="card fade-in" style={styles.formContainer}>
        <div className="card-header">
          <h2 className="card-title">{initialTrip ? "✏️ Edit Trip" : "✈️ Create New Trip"}</h2>
          <p className="card-subtitle">{initialTrip ? "Update your travel details" : "Plan your next adventure"}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Trip Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Summer in Europe"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your trip..."
              rows="4"
              required
              style={styles.textarea}
            />
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Total Budget (USD)</label>
            <input
              type="number"
              name="totalCost"
              value={formData.totalCost}
              onChange={handleChange}
              placeholder="0"
              min="0"
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div style={styles.buttonGroup}>
            <button type="button" onClick={onCancel} className="btn-secondary" style={styles.button} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={styles.button} disabled={loading}>
              {loading ? "Saving..." : initialTrip ? "Update Trip" : "Create Trip"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  },
  formContainer: {
    width: "100%",
    maxWidth: "600px",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  textarea: {
    resize: "vertical",
    minHeight: "100px",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    marginTop: "24px",
  },
  button: {
    minWidth: "120px",
  },
}

export default TripForm
