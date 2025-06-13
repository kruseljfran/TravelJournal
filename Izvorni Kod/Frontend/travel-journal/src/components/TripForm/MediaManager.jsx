"use client"

import { useState, useEffect } from "react"

const MediaManager = ({ tripId }) => {
  const [media, setMedia] = useState([])
  const [locations, setLocations] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    filePath: "",
    mediaType: "image",
    locationId: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [uploadMethod, setUploadMethod] = useState("file") // "file" or "url"

  useEffect(() => {
    if (tripId) {
      fetchMedia()
      fetchTripLocations()
    }
  }, [tripId])

  const fetchMedia = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/media/trip/${tripId}`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setMedia(data)
      }
    } catch (err) {
      console.error("Error fetching media:", err)
    }
  }

  const fetchTripLocations = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/locations/trip/${tripId}`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setLocations(data)
      }
    } catch (err) {
      console.error("Error fetching trip locations:", err)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Extract just the filename and create the path
    const fileName = file.name
    const filePath = `/uploads/${fileName}`

    // Determine media type from file extension
    let mediaType = "image"
    const extension = fileName.toLowerCase().split(".").pop()

    if (["mp4", "webm", "mov", "avi", "mkv"].includes(extension)) {
      mediaType = "video"
    } else if (["mp3", "wav", "ogg", "m4a", "aac"].includes(extension)) {
      mediaType = "audio"
    }

    setFormData({
      ...formData,
      filePath,
      mediaType,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const submitData = {
        filePath: formData.filePath,
        mediaType: formData.mediaType,
        tripId: tripId,
        locationId: formData.locationId || null,
      }

      const response = await fetch("http://localhost:8080/api/media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        const newMedia = await response.json()
        setMedia((prev) => [...prev, newMedia])
        setFormData({ filePath: "", mediaType: "image", locationId: "" })
        setShowForm(false)
      } else {
        const errorText = await response.text()
        console.error("Media creation failed:", errorText)
        setError("Neuspješno dodavanje medija")
      }
    } catch (err) {
      console.error("Error creating media:", err)
      setError("Dogodila se greška")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (mediaId) => {
    if (!window.confirm("Jeste li sigurni da želite obrisati ovaj medij?")) return

    try {
      const response = await fetch(`http://localhost:8080/api/media/${mediaId}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        setMedia((prev) => prev.filter((m) => m.mediaId !== mediaId))
      } else {
        setError("Neuspješno brisanje medija")
      }
    } catch (err) {
      setError("Dogodila se greška")
    }
  }

  const renderMediaPreview = (item) => {
    const isVideo = item.mediaType === "video"
    const isAudio = item.mediaType === "audio"
    const isImage = item.mediaType === "image"

    return (
      <div style={styles.mediaPreview}>
        {isVideo && (
          <video
            src={item.filePath}
            controls
            style={styles.videoPlayer}
            crossOrigin="anonymous"
            onError={(e) => console.error("Video load error:", e)}
          >
            Vaš pregljednik ne podržava video oznaku.
          </video>
        )}
        {isAudio && (
          <audio
            src={item.filePath}
            controls
            style={styles.audioPlayer}
            crossOrigin="anonymous"
            onError={(e) => console.error("Audio load error:", e)}
          >
            Vaš pregljednik ne podržava audio oznaku.
          </audio>
        )}
        {isImage && (
          <img
            src={item.filePath || "/placeholder.svg"}
            alt="Sadržaj medija"
            style={styles.imagePreview}
            onError={(e) => {
              console.error("Image load error:", e)
              e.target.style.display = "none"
            }}
          />
        )}
      </div>
    )
  }

  const getLocationName = (locationId) => {
    const location = locations.find((loc) => loc.locationId === Number.parseInt(locationId))
    if (!location) return "Nepoznata lokacija"

    let name = location.name || "Neimenovana lokacija"
    if (location.placeName) name += `, ${location.placeName}`
    if (location.countryName) name += `, ${location.countryName}`

    return name
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h4>Medijske datoteke</h4>
        <button onClick={() => setShowForm(true)} className="btn-primary" style={styles.addButton}>
          ➕ Dodaj medij
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <div className="card" style={styles.form}>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={styles.uploadToggle}>
              <button
                type="button"
                onClick={() => setUploadMethod("file")}
                className={uploadMethod === "file" ? "btn-primary" : "btn-secondary"}
                style={styles.toggleButton}
              >
              Prenesi datoteku
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod("url")}
                className={uploadMethod === "url" ? "btn-primary" : "btn-secondary"}
                style={styles.toggleButton}
              >
                🔗 Unesi URL
              </button>
            </div>

            {uploadMethod === "file" ? (
              <div className="form-group">
                <label className="form-label">Odaberite datoteku *</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,video/*,audio/*"
                  className="form-control"
                  style={styles.fileInput}
                />
                {formData.filePath && (
                  <div style={styles.selectedFile}>
                    <span>Odabrano: </span>
                    <strong>{formData.filePath.replace("/uploads/", "")}</strong>
                    <span> ({formData.mediaType})</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label">URL datoteke *</label>
                <input
                  type="text"
                  value={formData.filePath}
                  onChange={(e) => setFormData({ ...formData, filePath: e.target.value })}
                  placeholder="Unesite URL datoteke (npr. https://example.com/slika.jpg)"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Tip medija *</label>
              <select
                value={formData.mediaType}
                onChange={(e) => setFormData({ ...formData, mediaType: e.target.value })}
                required
              >
                <option value="image">📷 Slika</option>
                <option value="video">🎥 Video</option>
                <option value="audio">🎵 Audio</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Lokacija (neobavezno)</label>
              <select
                value={formData.locationId}
                onChange={(e) => setFormData({ ...formData, locationId: e.target.value })}
              >
                <option value="">📍 Bez specifične lokacije</option>
                {locations.map((location) => (
                  <option key={location.locationId} value={location.locationId}>
                    📍 {getLocationName(location.locationId)}
                  </option>
                ))}
              </select>
              {locations.length === 0 && (
                <small style={styles.helpText}>
                  💡 Prvo dodajte lokacije u ovo putovanje da biste povezali medije s određenim mjestima
                </small>
              )}
            </div>

            <div style={styles.buttonGroup}>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                Odustani
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading || (uploadMethod === "file" && !formData.filePath)}
              >
                {loading ? "Dodajem..." : "Dodaj medij"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={styles.mediaGrid}>
        {media.map((item) => (
          <div key={item.mediaId} className="card" style={styles.mediaCard}>
            <div style={styles.mediaHeader}>
              <span style={styles.mediaType}>{item.mediaType.toUpperCase()}</span>
              <button onClick={() => handleDelete(item.mediaId)} className="btn-danger" style={styles.deleteButton}>
                🗑️
              </button>
            </div>

            {renderMediaPreview(item)}

            <div style={styles.mediaContent}>
              <p style={styles.filePath}>{item.filePath}</p>
              {item.locationId ? (
                <p style={styles.location}>📍 {getLocationName(item.locationId)}</p>
              ) : (
                <p style={styles.noLocation}>📍 Opći medij putovanja</p>
              )}
              <p style={styles.date}>📅 {new Date(item.uploadedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {media.length === 0 && !showForm && (
        <div style={styles.emptyState}>
          <p>Još nema dodanih medijskih datoteka</p>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            Dodajte svoju prvu medijsku datoteku
          </button>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    marginBottom: "24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  addButton: {
    padding: "8px 16px",
    fontSize: "14px",
  },
  form: {
    marginBottom: "20px",
    padding: "20px",
  },
  uploadToggle: {
    display: "flex",
    marginBottom: "16px",
    gap: "10px",
  },
  toggleButton: {
    flex: 1,
    padding: "8px",
  },
  fileInput: {
    padding: "8px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    width: "100%",
  },
  selectedFile: {
    marginTop: "8px",
    padding: "8px",
    backgroundColor: "#e9ecef",
    borderRadius: "4px",
    fontSize: "14px",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  helpText: {
    color: "#6c757d",
    fontSize: "12px",
    marginTop: "4px",
    fontStyle: "italic",
  },
  mediaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "16px",
  },
  mediaCard: {
    padding: "16px",
  },
  mediaHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  mediaType: {
    background: "#007bff",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  deleteButton: {
    padding: "4px 8px",
    fontSize: "12px",
    minWidth: "auto",
  },
  mediaPreview: {
    marginBottom: "12px",
    textAlign: "center",
  },
  videoPlayer: {
    width: "100%",
    maxHeight: "200px",
    borderRadius: "8px",
  },
  audioPlayer: {
    width: "100%",
  },
  imagePreview: {
    width: "100%",
    maxHeight: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  mediaContent: {
    fontSize: "14px",
  },
  filePath: {
    fontWeight: "bold",
    marginBottom: "8px",
    wordBreak: "break-all",
  },
  location: {
    color: "#28a745",
    marginBottom: "4px",
    fontWeight: "500",
  },
  noLocation: {
    color: "#6c757d",
    marginBottom: "4px",
    fontStyle: "italic",
  },
  date: {
    color: "#6c757d",
    fontSize: "12px",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px",
    color: "#6c757d",
  },
}

export default MediaManager
