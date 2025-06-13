"use client"

import { useState, useEffect } from "react"
import TripForm from "../TripForm/TripForm"

const TripList = ({ currentUser }) => {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTrip, setEditingTrip] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/trips/my-trips", {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setTrips(data)
      } else {
        setError("Neuspješno dohvaćanje putovanja")
      }
    } catch (err) {
      setError("Dogodila se greška pri dohvaćanju putovanja")
    } finally {
      setLoading(false)
    }
  }

  const handleTripCreated = (trip) => {
    if (editingTrip) {
      // Update existing trip
      setTrips((prev) => prev.map((t) => (t.tripId === trip.tripId ? trip : t)))
      setEditingTrip(null)
    } else {
      // Add new trip
      setTrips((prev) => [trip, ...prev])
    }
    setShowForm(false)
  }

  const handleEditTrip = (trip) => {
    setEditingTrip(trip)
    setShowForm(true)
  }

  const handleDeleteTrip = async (tripId) => {
    if (!window.confirm("Jeste li sigurni da želite obrisati ovo putovanje?")) {
      return
    }

    try {
      const response = await fetch(`http://localhost:8080/api/trips/${tripId}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        setTrips((prev) => prev.filter((trip) => trip.tripId !== tripId))
      } else {
        setError("Neuspješno brisanje putovanja")
      }
    } catch (err) {
      setError("Dogodila se greška pri brisanju putovanja")
    }
  }

  const handleCreatePost = async (tripId) => {
    const trip = trips.find((t) => t.tripId === tripId)
    const content = `${trip.title}! ${trip.description}`

    try {
      // First, get the trip details to ensure we have the full object
      const tripResponse = await fetch(`http://localhost:8080/api/trips/${tripId}`, {
        credentials: "include",
      })

      if (!tripResponse.ok) {
        throw new Error("Neuspješno dohvaćanje detalja putovanja")
      }

      const tripData = await tripResponse.json()

      // Create the post with proper object references
      const postData = {
        content: content,
        user: { userId: currentUser.userId },
        trip: { tripId: tripId },
      }

      const response = await fetch("http://localhost:8080/api/shared-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        alert("Putovanje je uspješno podijeljeno! Provjerite početnu stranicu da vidite svoju objavu.")
      } else {
        const errorData = await response.text()
        console.error("Server error:", errorData)
        setError(`Neuspješno stvaranje objave: ${response.status}`)
      }
    } catch (err) {
      console.error("Error sharing trip:", err)
      setError(`Dogodila se greška pri stvaranju objave: ${err.message}`)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("hr-HR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (loading) {
    return (
      <div style={styles.container} className="container">
        <div className="spinner"></div>
        <p className="text-center">Učitavam vaša putovanja...</p>
      </div>
    )
  }

  return (
    <div style={styles.container} className="container">
      <div style={styles.header}>
        <div>
          <h1>Moja putovanja</h1>
          <p style={styles.subtitle}>Upravljajte svojim putnim avanturama</p>
        </div>
        <button
          onClick={() => {
            setEditingTrip(null)
            setShowForm(true)
          }}
          className="btn-primary"
          style={styles.createButton}
        >
          ➕ Stvori novo putovanje
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {trips.length === 0 ? (
        <div className="card text-center" style={styles.emptyState}>
          <h3>Još nema putovanja</h3>
          <p>Počnite planirati svoju prvu avanturu!</p>
          <button
            onClick={() => {
              setEditingTrip(null)
              setShowForm(true)
            }}
            className="btn-primary"
            style={styles.emptyButton}
          >
            Stvorite svoje prvo putovanje
          </button>
        </div>
      ) : (
        <div style={styles.tripsGrid}>
          {trips.map((trip) => (
            <div key={trip.tripId} className="card fade-in" style={styles.tripCard}>
              <div className="card-header">
                <div style={styles.tripHeader}>
                  <div>
                    <h3 className="card-title">{trip.title}</h3>
                    <p className="card-subtitle">
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </p>
                  </div>
                  <div style={styles.tripActions}>
                    <button onClick={() => handleEditTrip(trip)} className="btn-secondary" style={styles.actionButton}>
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteTrip(trip.tripId)}
                      className="btn-danger"
                      style={styles.actionButton}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>

              <div style={styles.tripContent}>
                <p style={styles.description}>{trip.description}</p>

                <div style={styles.tripStats}>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>Trajanje</span>
                    <span style={styles.statValue}>{calculateDuration(trip.startDate, trip.endDate)} dana</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>Budžet</span>
                    <span style={styles.statValue}>${trip.totalCost}</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>Stvoreno</span>
                    <span style={styles.statValue}>{new Date(trip.createdAt).toLocaleDateString("hr-HR")}</span>
                  </div>
                </div>

                <div style={styles.tripActions}>
                  <button
                    onClick={() => handleCreatePost(trip.tripId)}
                    className="btn-success"
                    style={styles.shareButton}
                  >
                    📤 Podijeli putovanje
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <TripForm
          onTripCreated={handleTripCreated}
          onCancel={() => {
            setShowForm(false)
            setEditingTrip(null)
          }}
          initialTrip={editingTrip}
        />
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "20px",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#6c757d",
    marginBottom: "0",
  },
  createButton: {
    padding: "12px 24px",
    fontSize: "1rem",
    fontWeight: "600",
  },
  emptyState: {
    padding: "60px 40px",
  },
  emptyButton: {
    marginTop: "20px",
    padding: "12px 24px",
  },
  tripsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
    gap: "24px",
  },
  tripCard: {
    overflow: "hidden",
    transition: "all 0.3s ease",
  },
  tripHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  tripActions: {
    display: "flex",
    gap: "8px",
  },
  actionButton: {
    padding: "8px 12px",
    fontSize: "14px",
    minWidth: "auto",
  },
  tripContent: {
    padding: "0",
  },
  description: {
    color: "#4a5568",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  tripStats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "20px",
    padding: "16px",
    background: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
  },
  statItem: {
    textAlign: "center",
  },
  statLabel: {
    display: "block",
    fontSize: "0.85rem",
    color: "#6c757d",
    marginBottom: "4px",
    fontWeight: "500",
  },
  statValue: {
    display: "block",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#2d3748",
  },
  shareButton: {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    fontWeight: "600",
  },
}

export default TripList
