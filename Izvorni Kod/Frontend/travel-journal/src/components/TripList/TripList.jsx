"use client"

import { useState, useEffect } from "react"
import TripForm from "../TripForm/TripForm"

const TripList = ({ currentUser }) => {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTrip, setEditingTrip] = useState(null)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

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
      setTrips((prev) => prev.map((t) => (t.tripId === trip.tripId ? trip : t)))
      setEditingTrip(null)
    } else {
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
      const tripResponse = await fetch(`http://localhost:8080/api/trips/${tripId}`, {
        credentials: "include",
      })

      if (!tripResponse.ok) {
        throw new Error("Neuspješno dohvaćanje detalja putovanja")
      }

      const tripData = await tripResponse.json()

      // kreiraj post
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
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const filteredTrips = trips.filter((trip) => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return trip.title.toLowerCase().includes(searchLower) || trip.description.toLowerCase().includes(searchLower)
  })

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
          <h1 style={{ fontSize: "1.8rem", marginBottom: "5px" }}>Moja putovanja</h1>
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
          ➕ Novo
        </button>
      </div>

      {/* trazilica */}
      <div style={styles.searchContainer}>
        <div style={styles.searchInputWrapper}>
          <input
            type="text"
            placeholder="🔍 Pretražite..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} style={styles.clearSearchButton} title="Obriši">
              ✕
            </button>
          )}
        </div>
        {searchTerm && (
          <p style={styles.searchResults}>
            {filteredTrips.length} od {trips.length}
          </p>
        )}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {filteredTrips.length === 0 && !searchTerm ? (
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
            Stvorite prvo putovanje
          </button>
        </div>
      ) : (
        <div style={styles.tripsList}>
          {filteredTrips.map((trip) => (
            <div key={trip.tripId} style={styles.tripRow}>
              <div style={styles.tripMain}>
                <div style={styles.tripInfo}>
                  <h3 style={styles.tripTitle}>{trip.title}</h3>
                  <p style={styles.tripDescription}>{trip.description}</p>
                </div>
                <div style={styles.tripMeta}>
                  <span style={styles.metaItem}>
                    📅 {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </span>
                  <span style={styles.metaItem}>⏱️ {calculateDuration(trip.startDate, trip.endDate)}d</span>
                  <span style={styles.metaItem}>💰 ${trip.totalCost}</span>
                </div>
              </div>
              <div style={styles.tripActions}>
                <button
                  onClick={() => handleCreatePost(trip.tripId)}
                  className="btn-success"
                  style={styles.shareBtn}
                  title="Podijeli"
                >
                  📤
                </button>
                <button
                  onClick={() => handleEditTrip(trip)}
                  className="btn-secondary"
                  style={styles.actionBtn}
                  title="Uredi"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDeleteTrip(trip.tripId)}
                  className="btn-danger"
                  style={styles.actionBtn}
                  title="Obriši"
                >
                  🗑️
                </button>
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
    padding: "15px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "10px",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "rgb(73, 80, 87)",
    marginBottom: "0",
  },
  createButton: {
    padding: "8px 16px",
    fontSize: "0.9rem",
    fontWeight: "600",
  },
  emptyState: {
    padding: "30px 20px",
  },
  emptyButton: {
    marginTop: "10px",
    padding: "8px 16px",
  },
  tripsList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  tripRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    background: "#fff",
    border: "1px solid #e9ecef",
    borderRadius: "6px",
    transition: "all 0.2s ease",
    cursor: "pointer",
  },
  tripMain: {
    flex: 1,
    minWidth: 0,
  },
  tripInfo: {
    marginBottom: "6px",
  },
  tripTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    margin: "0 0 4px 0",
    color: "#2d3748",
  },
  tripDescription: {
    fontSize: "0.85rem",
    color: "#4a5568",
    margin: "0",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  tripMeta: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  metaItem: {
    fontSize: "0.75rem",
    color: "#6c757d",
    background: "#f8f9fa",
    padding: "2px 6px",
    borderRadius: "3px",
  },
  tripActions: {
    display: "flex",
    gap: "4px",
    marginLeft: "12px",
  },
  actionBtn: {
    padding: "6px 8px",
    fontSize: "12px",
    minWidth: "auto",
    border: "none",
  },
  shareBtn: {
    padding: "6px 8px",
    fontSize: "12px",
    minWidth: "auto",
    border: "none",
  },
  searchContainer: {
    marginBottom: "15px",
  },
  searchInputWrapper: {
    position: "relative",
    maxWidth: "300px",
  },
  searchInput: {
    width: "100%",
    padding: "8px 12px",
    paddingRight: "30px",
    fontSize: "0.9rem",
    border: "1px solid #e9ecef",
    borderRadius: "4px",
    outline: "none",
  },
  clearSearchButton: {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    fontSize: "12px",
    color: "#6c757d",
    cursor: "pointer",
    padding: "2px",
  },
  searchResults: {
    marginTop: "4px",
    fontSize: "0.8rem",
    color: "#6c757d",
    fontStyle: "italic",
  },
}

export default TripList
