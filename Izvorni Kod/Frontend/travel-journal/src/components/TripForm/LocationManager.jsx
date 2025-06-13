"use client"

import { useState, useEffect, useCallback } from "react"

const LocationManager = ({ tripId, onLocationsChange }) => {
  const [locations, setLocations] = useState([])
  const [countries, setCountries] = useState([])
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [newLocation, setNewLocation] = useState({
    name: "",
    countryId: "",
    placeId: "",
    visitedOn: "",
    notes: "",
    vibeRating: null,
    foodRating: null,
    worthItRating: null,
  })
  const [editingLocation, setEditingLocation] = useState(null)
  const [editFormData, setEditFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [lastUsedCountryId, setLastUsedCountryId] = useState("")
  const [lastUsedPlaceId, setLastUsedPlaceId] = useState("")

  // Search states for dropdowns
  const [countrySearch, setCountrySearch] = useState("")
  const [placeSearch, setPlaceSearch] = useState("")
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showPlaceDropdown, setShowPlaceDropdown] = useState(false)
  const [filteredCountries, setFilteredCountries] = useState([])

  // Edit form search states
  const [editCountrySearch, setEditCountrySearch] = useState("")
  const [editPlaceSearch, setEditPlaceSearch] = useState("")
  const [showEditCountryDropdown, setShowEditCountryDropdown] = useState(false)
  const [showEditPlaceDropdown, setShowEditPlaceDropdown] = useState(false)
  const [editFilteredCountries, setEditFilteredCountries] = useState([])
  const [editFilteredPlaces, setEditFilteredPlaces] = useState([])

  const fetchLocations = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/locations/trip/${tripId}`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        console.log("Fetched locations:", data)
        setLocations(data)
        onLocationsChange?.(data)

        // Update presets from the newest location
        if (data.length > 0) {
          const newestLocation = data[data.length - 1]
          const countryId = newestLocation.countryId ? newestLocation.countryId.toString() : ""
          const placeId = newestLocation.placeId ? newestLocation.placeId.toString() : ""

          setLastUsedCountryId(countryId)
          setLastUsedPlaceId(placeId)
        } else {
          setLastUsedCountryId("")
          setLastUsedPlaceId("")
        }
      }
    } catch (error) {
      console.error("Error fetching locations:", error)
    }
  }, [tripId, onLocationsChange])

  useEffect(() => {
    fetchCountries()
    fetchPlaces()
    if (tripId) {
      fetchLocations()
    }
  }, [tripId, fetchLocations])

  // Reset presets when trip changes
  useEffect(() => {
    setLastUsedCountryId("")
    setLastUsedPlaceId("")
    setNewLocation({
      name: "",
      countryId: "",
      placeId: "",
      visitedOn: "",
      notes: "",
      vibeRating: null,
      foodRating: null,
      worthItRating: null,
    })
    setCountrySearch("")
    setPlaceSearch("")
  }, [tripId])

  const fetchCountries = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/locations/countries", {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        console.log("Fetched countries:", data)
        setCountries(data)
        setFilteredCountries(data)
        setEditFilteredCountries(data)
      }
    } catch (error) {
      console.error("Error fetching countries:", error)
    }
  }

  const fetchPlaces = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/locations/places", {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        console.log("Fetched places:", data)
        setPlaces(data)
        setFilteredPlaces(data)
        setEditFilteredPlaces(data)
      }
    } catch (error) {
      console.error("Error fetching places:", error)
    }
  }

  // Filter countries based on search
  const filterCountries = (searchTerm, isEdit = false) => {
    const filtered = countries.filter((country) => country.countryName.toLowerCase().includes(searchTerm.toLowerCase()))
    if (isEdit) {
      setEditFilteredCountries(filtered)
    } else {
      setFilteredCountries(filtered)
    }
  }

  // Filter places based on search and selected country
  const filterPlaces = (searchTerm, selectedCountryId, isEdit = false) => {
    let placesToFilter = places

    // First filter by country if one is selected
    if (selectedCountryId) {
      placesToFilter = places.filter((place) => {
        const placeCountryId = place.country ? place.country.countryId : place.countryId
        return placeCountryId === Number.parseInt(selectedCountryId)
      })
    }

    // Then filter by search term
    const filtered = placesToFilter.filter((place) => place.placeName.toLowerCase().includes(searchTerm.toLowerCase()))

    if (isEdit) {
      setEditFilteredPlaces(filtered)
    } else {
      setFilteredPlaces(filtered)
    }
  }

  const handleCountrySearch = (searchTerm, isEdit = false) => {
    if (isEdit) {
      setEditCountrySearch(searchTerm)
      setShowEditCountryDropdown(true)
    } else {
      setCountrySearch(searchTerm)
      setShowCountryDropdown(true)
    }
    filterCountries(searchTerm, isEdit)
  }

  const handlePlaceSearch = (searchTerm, isEdit = false) => {
    if (isEdit) {
      setEditPlaceSearch(searchTerm)
      setShowEditPlaceDropdown(true)
    } else {
      setPlaceSearch(searchTerm)
      setShowPlaceDropdown(true)
    }

    const selectedCountryId = isEdit ? editFormData.countryId : newLocation.countryId
    filterPlaces(searchTerm, selectedCountryId, isEdit)
  }

  const handleCountrySelect = (country, isEdit = false) => {
    if (isEdit) {
      setEditFormData({ ...editFormData, countryId: country.countryId.toString(), placeId: "" })
      setEditCountrySearch(country.countryName)
      setShowEditCountryDropdown(false)
      setEditPlaceSearch("")
      // Filter places for selected country
      filterPlaces("", country.countryId.toString(), true)
    } else {
      setNewLocation({ ...newLocation, countryId: country.countryId.toString(), placeId: "" })
      setCountrySearch(country.countryName)
      setShowCountryDropdown(false)
      setPlaceSearch("")
      // Filter places for selected country
      filterPlaces("", country.countryId.toString(), false)
    }
  }

  const handlePlaceSelect = (place, isEdit = false) => {
    if (isEdit) {
      setEditFormData({ ...editFormData, placeId: place.placeId.toString() })
      setEditPlaceSearch(place.placeName)
      setShowEditPlaceDropdown(false)
    } else {
      setNewLocation({ ...newLocation, placeId: place.placeId.toString() })
      setPlaceSearch(place.placeName)
      setShowPlaceDropdown(false)
    }
  }

  const applyPresets = useCallback(() => {
    if (lastUsedCountryId && countries.length > 0) {
      const country = countries.find((c) => c.countryId.toString() === lastUsedCountryId)
      if (country) {
        setCountrySearch(country.countryName)
        setNewLocation((prev) => ({ ...prev, countryId: lastUsedCountryId }))
      }
    }

    if (lastUsedPlaceId && places.length > 0) {
      const place = places.find((p) => p.placeId.toString() === lastUsedPlaceId)
      if (place) {
        setPlaceSearch(place.placeName)
        setNewLocation((prev) => ({ ...prev, placeId: lastUsedPlaceId }))
      }
    }

    // Update filtered places for the preset country
    if (lastUsedCountryId) {
      filterPlaces("", lastUsedCountryId, false)
    }
  }, [lastUsedCountryId, lastUsedPlaceId, countries, places])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Step 1: Create the location
      const locationData = {
        name: newLocation.name,
        countryId: newLocation.countryId ? Number.parseInt(newLocation.countryId) : null,
        placeId: newLocation.placeId ? Number.parseInt(newLocation.placeId) : null,
      }

      console.log("Creating location with data:", locationData)

      const locationResponse = await fetch("http://localhost:8080/api/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(locationData),
      })

      if (!locationResponse.ok) {
        const errorText = await locationResponse.text()
        console.error("Location error response:", errorText)
        throw new Error(`Neuspješno stvaranje lokacije: ${locationResponse.status}`)
      }

      const locationId = await locationResponse.json()
      console.log("Created location with ID:", locationId)

      // Step 2: Add the location to the trip (create WasLocation)
      if (tripId) {
        const wasLocationData = {
          tripId: Number.parseInt(tripId),
          locationId: locationId,
          visitedOn: newLocation.visitedOn || null,
          notes: newLocation.notes || "",
          vibeRating: newLocation.vibeRating > 0 ? newLocation.vibeRating : null,
          foodRating: newLocation.foodRating > 0 ? newLocation.foodRating : null,
          worthItRating: newLocation.worthItRating > 0 ? newLocation.worthItRating : null,
        }

        console.log("Adding location to trip with data:", wasLocationData)

        const visitResponse = await fetch("http://localhost:8080/api/locations/visit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(wasLocationData),
        })

        if (!visitResponse.ok) {
          const errorText = await visitResponse.text()
          console.error("Visit error response:", errorText)
          throw new Error(`Neuspješno dodavanje lokacije u putovanje: ${visitResponse.status}`)
        }
      }

      // Update the last used values for next location
      setLastUsedCountryId(newLocation.countryId)
      setLastUsedPlaceId(newLocation.placeId)

      await fetchLocations()
      alert("Lokacija je uspješno dodana!")

      // Reset form but keep the presets
      setNewLocation({
        name: "",
        countryId: lastUsedCountryId,
        placeId: lastUsedPlaceId,
        visitedOn: "",
        notes: "",
        vibeRating: null,
        foodRating: null,
        worthItRating: null,
      })
    } catch (error) {
      console.error("Error adding location:", error)
      alert("Greška pri dodavanju lokacije: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditLocation = (location) => {
    console.log("Editing location:", location)
    setEditingLocation(location.locationId)

    const countryId = location.countryId ? location.countryId.toString() : ""
    const placeId = location.placeId ? location.placeId.toString() : ""

    setEditFormData({
      name: location.name,
      countryId: countryId,
      placeId: placeId,
      visitedOn: location.visitedOn || "",
      notes: location.notes || "",
      vibeRating: location.vibeRating,
      foodRating: location.foodRating,
      worthItRating: location.worthItRating,
    })

    // Set search values for edit form
    const country = countries.find((c) => c.countryId.toString() === countryId)
    const place = places.find((p) => p.placeId.toString() === placeId)

    setEditCountrySearch(country ? country.countryName : "")
    setEditPlaceSearch(place ? place.placeName : "")

    // Filter places for the selected country
    if (countryId) {
      filterPlaces("", countryId, true)
    }
  }

  const handleUpdateLocation = async (locationId) => {
    setIsLoading(true)

    try {
      // Update the location basic info
      const locationData = {
        name: editFormData.name,
        countryId: editFormData.countryId ? Number.parseInt(editFormData.countryId) : null,
        placeId: editFormData.placeId ? Number.parseInt(editFormData.placeId) : null,
      }

      console.log("Updating location with data:", locationData)

      const locationResponse = await fetch(`http://localhost:8080/api/locations/${locationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(locationData),
      })

      if (!locationResponse.ok) {
        const errorText = await locationResponse.text()
        console.error("Location update error:", errorText)
        throw new Error("Neuspješno ažuriranje lokacije")
      }

      // Update the WasLocation data
      const wasLocationData = {
        tripId: Number.parseInt(tripId),
        locationId: locationId,
        visitedOn: editFormData.visitedOn || null,
        notes: editFormData.notes || "",
        vibeRating: editFormData.vibeRating > 0 ? editFormData.vibeRating : null,
        foodRating: editFormData.foodRating > 0 ? editFormData.foodRating : null,
        worthItRating: editFormData.worthItRating > 0 ? editFormData.worthItRating : null,
      }

      console.log("Updating trip location with data:", wasLocationData)

      const visitResponse = await fetch(`http://localhost:8080/api/locations/visit/${tripId}/${locationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(wasLocationData),
      })

      if (!visitResponse.ok) {
        const errorText = await visitResponse.text()
        console.error("Visit update error:", errorText)
        throw new Error("Neuspješno ažuriranje podataka o posjetu")
      }

      setEditingLocation(null)
      setEditFormData({})
      setEditCountrySearch("")
      setEditPlaceSearch("")
      await fetchLocations()
      alert("Lokacija je uspješno ažurirana!")
    } catch (error) {
      console.error("Error updating location:", error)
      alert("Greška pri ažuriranju lokacije: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingLocation(null)
    setEditFormData({})
    setEditCountrySearch("")
    setEditPlaceSearch("")
    setShowEditCountryDropdown(false)
    setShowEditPlaceDropdown(false)

    // Reapply presets when canceling edit
    applyPresets()
  }

  const handleRemoveLocation = async (locationId) => {
    if (!window.confirm("Jeste li sigurni da želite ukloniti ovu lokaciju?")) {
      return
    }

    try {
      const response = await fetch(`http://localhost:8080/api/locations/visit/${tripId}/${locationId}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        await fetchLocations()
        alert("Lokacija je uspješno uklonjena!")
      } else {
        throw new Error("Neuspješno uklanjanje lokacije")
      }
    } catch (error) {
      console.error("Error removing location:", error)
      alert("Greška pri uklanjanju lokacije: " + error.message)
    }
  }

  const renderStarRating = (rating, onRatingChange, label, isEdit = false) => {
    const formData = isEdit ? editFormData : newLocation
    const setFormData = isEdit ? setEditFormData : setNewLocation

    return (
      <div className="star-rating">
        <div className="rating-header">
          <span className="rating-label">{label}:</span>
          {rating > 0 && (
            <button
              type="button"
              className="clear-rating"
              onClick={() => setFormData({ ...formData, [onRatingChange]: null })}
              title="Obriši ocjenu"
            >
              ✕
            </button>
          )}
        </div>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (rating || 0) ? "filled" : ""}`}
              onClick={() => setFormData({ ...formData, [onRatingChange]: star })}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                color: star <= (rating || 0) ? "#ffd700" : "#ddd",
                marginRight: "2px",
              }}
            >
              ★
            </span>
          ))}
        </div>
        <span className="rating-text">{rating > 0 ? `${rating}/5` : "Nije ocijenjeno"}</span>
      </div>
    )
  }

  const handleClearCountry = (isEdit = false) => {
    if (isEdit) {
      setEditFormData({ ...editFormData, countryId: "", placeId: "" })
      setEditCountrySearch("")
      setEditPlaceSearch("")
      setShowEditCountryDropdown(false)
      setShowEditPlaceDropdown(false)
      // Reset places to show all places
      setEditFilteredPlaces(places)
    } else {
      setNewLocation({ ...newLocation, countryId: "", placeId: "" })
      setCountrySearch("")
      setPlaceSearch("")
      setShowCountryDropdown(false)
      setShowPlaceDropdown(false)
      // Reset places to show all places
      setFilteredPlaces(places)
    }
  }

  const renderSearchableDropdown = (
    searchValue,
    onSearchChange,
    options,
    onSelect,
    placeholder,
    showDropdown,
    setShowDropdown,
    disabled = false,
    onClear = null,
  ) => (
    <div className="searchable-dropdown" style={{ position: "relative" }}>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            width: "100%",
            padding: "8px",
            paddingRight: onClear && searchValue ? "35px" : "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            backgroundColor: disabled ? "#f5f5f5" : "white",
          }}
        />
        {onClear && searchValue && (
          <button
            type="button"
            onClick={onClear}
            style={{
              position: "absolute",
              right: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              color: "#999",
              padding: "0",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Obriši odabir"
          >
            ✕
          </button>
        )}
      </div>
      {showDropdown && options.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderTop: "none",
            borderRadius: "0 0 4px 4px",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {options.map((option) => (
            <div
              key={option.countryId || option.placeId}
              onClick={() => onSelect(option)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
            >
              {option.countryName || option.placeName}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderEditForm = (location) => (
    <div className="edit-form" style={styles.editForm}>
      <h5>Uredi lokaciju</h5>
      <div className="form-group">
        <label>Naziv lokacije:</label>
        <input
          type="text"
          value={editFormData.name}
          onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Zemlja:</label>
        {renderSearchableDropdown(
          editCountrySearch,
          (value) => handleCountrySearch(value, true),
          editFilteredCountries,
          (country) => handleCountrySelect(country, true),
          "Pretražite i odaberite zemlju",
          showEditCountryDropdown,
          setShowEditCountryDropdown,
          false,
          () => handleClearCountry(true),
        )}
      </div>

      <div className="form-group">
        <label>Mjesto:</label>
        {renderSearchableDropdown(
          editPlaceSearch,
          (value) => handlePlaceSearch(value, true),
          editFilteredPlaces,
          (place) => handlePlaceSelect(place, true),
          "Pretražite i odaberite mjesto",
          showEditPlaceDropdown,
          setShowEditPlaceDropdown,
          !editFormData.countryId,
        )}
        {!editFormData.countryId && (
          <small style={{ color: "#666", fontSize: "12px" }}>Prvo odaberite zemlju da biste vidjeli mjesta</small>
        )}
      </div>

      <div className="form-group">
        <label>Datum posjeta:</label>
        <input
          type="date"
          value={editFormData.visitedOn}
          onChange={(e) => setEditFormData({ ...editFormData, visitedOn: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Bilješke:</label>
        <textarea
          value={editFormData.notes}
          onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
          placeholder="Vaše misli o ovoj lokaciji..."
        />
      </div>

      <div className="ratings-section">
        <h4>Ocjene (neobavezno)</h4>

        {renderStarRating(editFormData.vibeRating, "vibeRating", "Ocjena atmosfere", true)}
        {renderStarRating(editFormData.foodRating, "foodRating", "Ocjena hrane", true)}
        {renderStarRating(editFormData.worthItRating, "worthItRating", "Ocjena vrijednosti", true)}
      </div>

      <div style={styles.editButtons}>
        <button type="button" onClick={handleCancelEdit} className="btn-secondary" disabled={isLoading}>
          Odustani
        </button>
        <button
          type="button"
          onClick={() => handleUpdateLocation(location.locationId)}
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? "Ažuriram..." : "Spremi promjene"}
        </button>
      </div>
    </div>
  )

  // Apply presets when lastUsedCountryId or lastUsedPlaceId changes
  useEffect(() => {
    if (countries.length > 0 && places.length > 0) {
      applyPresets()
    }
  }, [lastUsedCountryId, lastUsedPlaceId, applyPresets, countries, places])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowCountryDropdown(false)
      setShowPlaceDropdown(false)
      setShowEditCountryDropdown(false)
      setShowEditPlaceDropdown(false)
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <div className="location-manager">
      <h3>Upravljanje lokacijama</h3>

      <form onSubmit={handleSubmit} className="location-form">
        <div className="form-group">
          <label>Naziv lokacije:</label>
          <input
            type="text"
            value={newLocation.name}
            onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Zemlja:</label>
          {renderSearchableDropdown(
            countrySearch,
            (value) => handleCountrySearch(value, false),
            filteredCountries,
            (country) => handleCountrySelect(country, false),
            "Pretražite i odaberite zemlju",
            showCountryDropdown,
            setShowCountryDropdown,
            false,
            () => handleClearCountry(false),
          )}
        </div>

        <div className="form-group">
          <label>Mjesto:</label>
          {renderSearchableDropdown(
            placeSearch,
            (value) => handlePlaceSearch(value, false),
            filteredPlaces,
            (place) => handlePlaceSelect(place, false),
            "Pretražite i odaberite mjesto",
            showPlaceDropdown,
            setShowPlaceDropdown,
            !newLocation.countryId,
          )}
          {!newLocation.countryId && (
            <small style={{ color: "#666", fontSize: "12px" }}>Prvo odaberite zemlju da biste vidjeli mjesta</small>
          )}
        </div>

        <div className="form-group">
          <label>Datum posjeta:</label>
          <input
            type="date"
            value={newLocation.visitedOn}
            onChange={(e) => setNewLocation({ ...newLocation, visitedOn: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Bilješke:</label>
          <textarea
            value={newLocation.notes}
            onChange={(e) => setNewLocation({ ...newLocation, notes: e.target.value })}
            placeholder="Vaše misli o ovoj lokaciji..."
          />
        </div>

        <div className="ratings-section">
          <h4>Ocjene (neobavezno)</h4>
          <p className="rating-help">Kliknite na zvjezdice za ocjenjivanje ili ostavite neocijenjeno</p>

          {renderStarRating(newLocation.vibeRating, "vibeRating", "Ocjena atmosfere")}
          {renderStarRating(newLocation.foodRating, "foodRating", "Ocjena hrane")}
          {renderStarRating(newLocation.worthItRating, "worthItRating", "Ocjena vrijednosti")}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Dodajem lokaciju..." : "Dodaj lokaciju"}
        </button>
      </form>

      <div className="locations-list">
        <h4>Lokacije putovanja ({locations.length})</h4>
        {locations.map((location) => (
          <div key={location.locationId} className="location-item" style={styles.locationItem}>
            {editingLocation === location.locationId ? (
              renderEditForm(location)
            ) : (
              <>
                <div className="location-info">
                  <h5>{location.name}</h5>
                  <p>
                    {location.placeName && `${location.placeName}, `}
                    {location.countryName}
                  </p>
                  {location.visitedOn && <p>Posjećeno: {location.visitedOn}</p>}
                  {location.notes && <p>Bilješke: {location.notes}</p>}
                  <div className="ratings">
                    {location.vibeRating && <span>Atmosfera: {"★".repeat(location.vibeRating)}</span>}
                    {location.foodRating && <span>Hrana: {"★".repeat(location.foodRating)}</span>}
                    {location.worthItRating && <span>Vrijednost: {"★".repeat(location.worthItRating)}</span>}
                  </div>
                </div>
                <div style={styles.locationActions}>
                  <button
                    onClick={() => handleEditLocation(location)}
                    className="btn-secondary"
                    style={styles.editButton}
                  >
                    ✏️ Uredi
                  </button>
                  <button
                    onClick={() => handleRemoveLocation(location.locationId)}
                    className="btn-danger"
                    style={styles.removeButton}
                  >
                    🗑️ Ukloni
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .rating-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        
        .rating-label {
          font-weight: 500;
          font-size: 14px;
        }
        
        .clear-rating {
          background: #ff4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .clear-rating:hover {
          background: #cc0000;
        }
        
        .stars {
          margin-bottom: 4px;
        }
        
        .rating-text {
          font-size: 12px;
          color: #666;
        }
        
        .ratings-section {
          border: 1px solid #ddd;
          padding: 16px;
          border-radius: 8px;
          margin: 16px 0;
        }
        
        .rating-help {
          font-size: 12px;
          color: #666;
          margin-bottom: 16px;
          font-style: italic;
        }
        
        .star-rating {
          margin-bottom: 12px;
        }

        .searchable-dropdown {
          position: relative;
        }
      `}</style>
    </div>
  )
}

const styles = {
  locationItem: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    backgroundColor: "#fff",
  },
  locationActions: {
    display: "flex",
    gap: "8px",
    marginTop: "12px",
  },
  editButton: {
    padding: "6px 12px",
    fontSize: "14px",
    minWidth: "auto",
  },
  removeButton: {
    padding: "6px 12px",
    fontSize: "14px",
    minWidth: "auto",
  },
  editForm: {
    border: "2px solid #007bff",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#f8f9ff",
  },
  editButtons: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    marginTop: "16px",
  },
}

export default LocationManager
