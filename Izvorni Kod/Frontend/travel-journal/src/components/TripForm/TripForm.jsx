"use client"

import { useState } from "react"
import MediaManager from "./MediaManager"
import ExpenseManager from "./ExpenseManager"
import LocationManager from "./LocationManager"

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
  const [currentStep, setCurrentStep] = useState(1)
  const [createdTrip, setCreatedTrip] = useState(initialTrip)

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
      setError("Datum završetka mora biti nakon datuma početka")
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
        setCreatedTrip(trip)

        // Always move to next step after saving basic info
        setCurrentStep(2)
      } else {
        setError("Neuspješno spremanje putovanja. Molimo pokušajte ponovno.")
      }
    } catch (err) {
      setError("Dogodila se greška. Molimo pokušajte ponovno.")
    } finally {
      setLoading(false)
    }
  }

  const handleFinish = () => {
    onTripCreated(createdTrip)
  }

  const handleSkipToStep = (step) => {
    if (createdTrip) {
      setCurrentStep(step)
    } else {
      alert("Molimo prvo spremite detalje putovanja")
    }
  }

  const renderStepNavigation = () => {
    if (!createdTrip) return null

    return (
      <div style={styles.stepNavigation}>
        <button
          onClick={() => setCurrentStep(1)}
          className={currentStep === 1 ? "btn-primary" : "btn-secondary"}
          style={styles.navButton}
        >
          1. Detalji putovanja
        </button>
        <button
          onClick={() => setCurrentStep(2)}
          className={currentStep === 2 ? "btn-primary" : "btn-secondary"}
          style={styles.navButton}
        >
          2. Lokacije
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          className={currentStep === 3 ? "btn-primary" : "btn-secondary"}
          style={styles.navButton}
        >
          3. Mediji
        </button>
        <button
          onClick={() => setCurrentStep(4)}
          className={currentStep === 4 ? "btn-primary" : "btn-secondary"}
          style={styles.navButton}
        >
          4. Troškovi
        </button>
      </div>
    )
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Naziv putovanja</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="npr. Ljeto u Europi"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Opis</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Opišite svoje putovanje..."
                  rows="4"
                  required
                  style={styles.textarea}
                />
              </div>

              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label className="form-label">Datum početka</label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label className="form-label">Datum završetka</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Ukupni budžet</label>
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
                <button
                  type="button"
                  onClick={onCancel}
                  className="btn-secondary"
                  style={styles.button}
                  disabled={loading}
                >
                  Odustani
                </button>
                <button type="submit" className="btn-primary" style={styles.button} disabled={loading}>
                  {loading ? "Spremam..." : createdTrip ? "Ažuriraj i nastavi" : "Spremi i nastavi"}
                </button>
              </div>
            </form>

            {createdTrip && (
              <div style={styles.quickActions}>
                <p style={styles.quickActionsText}>Putovanje spremljeno! Sada možete:</p>
                <div style={styles.quickActionButtons}>
                  <button onClick={() => setCurrentStep(2)} className="btn-success" style={styles.quickButton}>
                    Dodaj lokacije
                  </button>
                  <button onClick={() => setCurrentStep(3)} className="btn-success" style={styles.quickButton}>
                    Dodaj medije
                  </button>
                  <button onClick={() => setCurrentStep(4)} className="btn-success" style={styles.quickButton}>
                    Dodaj troškove
                  </button>
                  <button onClick={handleFinish} className="btn-primary" style={styles.quickButton}>
                    Završi
                  </button>
                </div>
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div>
            <div style={styles.stepIndicator}>
              <h3>📍 Upravljanje lokacijama</h3>
              <p>Dodajte i upravljajte mjestima koja ćete posjetiti na ovom putovanju</p>
            </div>
            <LocationManager tripId={createdTrip?.tripId} />
            <div style={styles.buttonGroup}>
              <button onClick={() => setCurrentStep(1)} className="btn-secondary" style={styles.button}>
                ← Natrag na detalje putovanja
              </button>
              <button onClick={() => setCurrentStep(3)} className="btn-primary" style={styles.button}>
                Sljedeće: Mediji →
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <div style={styles.stepIndicator}>
              <h3>📸 Upravljanje medijima</h3>
              <p>Prenesite i organizirajte fotografije, videozapise i druge medije s vašeg putovanja</p>
            </div>
            <MediaManager tripId={createdTrip?.tripId} />
            <div style={styles.buttonGroup}>
              <button onClick={() => setCurrentStep(2)} className="btn-secondary" style={styles.button}>
                ← Natrag na lokacije
              </button>
              <button onClick={() => setCurrentStep(4)} className="btn-primary" style={styles.button}>
                Sljedeće: Troškovi →
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div>
            <div style={styles.stepIndicator}>
              <h3>💰 Upravljanje troškovima</h3>
              <p>Pratite i kategorizirajte troškove vašeg putovanja</p>
            </div>
            <ExpenseManager tripId={createdTrip?.tripId} />
            <div style={styles.buttonGroup}>
              <button onClick={() => setCurrentStep(3)} className="btn-secondary" style={styles.button}>
                ← Natrag na medije
              </button>
              <button onClick={handleFinish} className="btn-success" style={styles.button}>
                Završi putovanje
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div style={styles.overlay}>
      <div className="card fade-in" style={styles.formContainer}>
        <div className="card-header">
          <h2 className="card-title">
            {initialTrip
              ? "✏️ Uredi putovanje"
              : currentStep === 1
                ? "✈️ Stvori novo putovanje"
                : `✈️ ${createdTrip?.title}`}
          </h2>
          <p className="card-subtitle">
            {initialTrip
              ? "Ažurirajte detalje putovanja i upravljajte sadržajem putovanja"
              : currentStep === 1
                ? "Planirajte svoju sljedeću avanturu"
                : `Korak ${currentStep} od 4`}
          </p>
        </div>

        {renderStepNavigation()}
        {renderStep()}
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
    maxWidth: "900px",
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
  stepIndicator: {
    textAlign: "center",
    marginBottom: "24px",
    padding: "20px",
    background: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
  },
  stepNavigation: {
    display: "flex",
    gap: "8px",
    marginBottom: "24px",
    padding: "16px",
    background: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
    flexWrap: "wrap",
  },
  navButton: {
    padding: "8px 16px",
    fontSize: "14px",
    minWidth: "auto",
    flex: "1",
    minWidth: "140px",
  },
  quickActions: {
    marginTop: "24px",
    padding: "20px",
    background: "#e8f5e8",
    borderRadius: "8px",
    border: "1px solid #c3e6c3",
  },
  quickActionsText: {
    margin: "0 0 16px 0",
    fontWeight: "500",
    color: "#2d5a2d",
  },
  quickActionButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  quickButton: {
    padding: "8px 16px",
    fontSize: "14px",
    minWidth: "auto",
  },
}

export default TripForm
