"use client"

import { useState, useEffect } from "react"

const ExpenseManager = ({ tripId }) => {
  const [expenses, setExpenses] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    currency: "USD",
    data: "",
    description: "",
  })
  const [editingExpense, setEditingExpense] = useState(null)
  const [editFormData, setEditFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Category dropdown states
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [filteredCategories, setFilteredCategories] = useState([
    "Prijevoz",
    "Smještaj",
    "Hrana i piće",
    "Aktivnosti",
    "Kupovina",
    "Zabava",
    "Zdravstvo",
    "Ostalo",
  ])
  const [showEditCategoryDropdown, setShowEditCategoryDropdown] = useState(false)
  const [filteredEditCategories, setFilteredEditCategories] = useState([
    "Prijevoz",
    "Smještaj",
    "Hrana i piće",
    "Aktivnosti",
    "Kupovina",
    "Zabava",
    "Zdravstvo",
    "Ostalo",
  ])

  // Currency dropdown states
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)
  const [filteredCurrencies, setFilteredCurrencies] = useState([])
  const [showEditCurrencyDropdown, setShowEditCurrencyDropdown] = useState(false)
  const [filteredEditCurrencies, setFilteredEditCurrencies] = useState([])

  const categories = ["Prijevoz", "Smještaj", "Hrana i piće", "Aktivnosti", "Kupovina", "Zabava", "Zdravstvo", "Ostalo"]

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "HRK", name: "Croatian Kuna", symbol: "kn" },
    { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
    { code: "SEK", name: "Swedish Krona", symbol: "kr" },
    { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
    { code: "DKK", name: "Danish Krone", symbol: "kr" },
    { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  ]

  useEffect(() => {
    if (tripId) {
      fetchExpenses()
    }
    // Initialize filtered currencies
    setFilteredCurrencies(currencies)
    setFilteredEditCurrencies(currencies)
  }, [tripId])

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/expenses/trip/${tripId}`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setExpenses(data)
      }
    } catch (err) {
      console.error("Error fetching expenses:", err)
    }
  }

  // Category handlers
  const handleCategoryInputChange = (e) => {
    const value = e.target.value
    setFormData({ ...formData, category: value })

    const filtered = categories.filter((cat) => cat.toLowerCase().includes(value.toLowerCase()))
    setFilteredCategories(filtered)
    setShowCategoryDropdown(true)
  }

  const handleEditCategoryInputChange = (e) => {
    const value = e.target.value
    setEditFormData({ ...editFormData, category: value })

    const filtered = categories.filter((cat) => cat.toLowerCase().includes(value.toLowerCase()))
    setFilteredEditCategories(filtered)
    setShowEditCategoryDropdown(true)
  }

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, category })
    setShowCategoryDropdown(false)
    setFilteredCategories(categories)
  }

  const handleEditCategorySelect = (category) => {
    setEditFormData({ ...editFormData, category })
    setShowEditCategoryDropdown(false)
    setFilteredEditCategories(categories)
  }

  // Currency handlers
  const handleCurrencyInputChange = (e) => {
    const value = e.target.value
    setFormData({ ...formData, currency: value })

    const filtered = currencies.filter(
      (curr) =>
        curr.code.toLowerCase().includes(value.toLowerCase()) || curr.name.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredCurrencies(filtered)
    setShowCurrencyDropdown(true)
  }

  const handleEditCurrencyInputChange = (e) => {
    const value = e.target.value
    setEditFormData({ ...editFormData, currency: value })

    const filtered = currencies.filter(
      (curr) =>
        curr.code.toLowerCase().includes(value.toLowerCase()) || curr.name.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredEditCurrencies(filtered)
    setShowEditCurrencyDropdown(true)
  }

  const handleCurrencySelect = (currencyCode) => {
    setFormData({ ...formData, currency: currencyCode })
    setShowCurrencyDropdown(false)
    setFilteredCurrencies(currencies)
  }

  const handleEditCurrencySelect = (currencyCode) => {
    setEditFormData({ ...editFormData, currency: currencyCode })
    setShowEditCurrencyDropdown(false)
    setFilteredEditCurrencies(currencies)
  }

  const handleEditExpense = (expense) => {
    setEditingExpense(expense.expenseId)
    setEditFormData({
      category: expense.category || "",
      amount: expense.amount ? expense.amount.toString() : "",
      currency: expense.currency || "USD",
      data: expense.data || expense.date || "",
      description: expense.description || "",
    })
  }

  const handleUpdateExpense = async (expenseId) => {
    if (!expenseId) {
      setError("ID troška nije pronađen")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`http://localhost:8080/api/expenses/${expenseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...editFormData,
          tripId,
          amount: Number.parseInt(editFormData.amount),
        }),
      })

      if (response.ok) {
        const updatedExpense = await response.json()
        setExpenses((prev) => prev.map((e) => (e.expenseId === expenseId ? updatedExpense : e)))
        setEditingExpense(null)
        setEditFormData({})
        alert("Trošak je uspješno ažuriran!")
      } else {
        const errorData = await response.text()
        console.error("Update error:", errorData)
        setError("Neuspješno ažuriranje troška")
      }
    } catch (err) {
      console.error("Network error:", err)
      setError("Dogodila se greška")
    } finally {
      setLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingExpense(null)
    setEditFormData({})
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:8080/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          tripId,
          amount: Number.parseInt(formData.amount),
        }),
      })

      if (response.ok) {
        const newExpense = await response.json()
        setExpenses((prev) => [...prev, newExpense])
        setFormData({
          category: "",
          amount: "",
          currency: "USD",
          data: "",
          description: "",
        })
        setShowForm(false)
      } else {
        setError("Neuspješno dodavanje troška")
      }
    } catch (err) {
      setError("Dogodila se greška")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (expense) => {
    if (!window.confirm("Jeste li sigurni da želite obrisati ovaj trošak?")) return

    try {
      const response = await fetch(`http://localhost:8080/api/expenses/${expense.expenseId}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        setExpenses((prev) => prev.filter((e) => e.expenseId !== expense.expenseId))
      } else {
        setError("Neuspješno brisanje troška")
      }
    } catch (err) {
      setError("Dogodila se greška")
    }
  }

  const getTotalByCategory = () => {
    const totals = {}
    expenses.forEach((expense) => {
      if (!totals[expense.category]) {
        totals[expense.category] = 0
      }
      totals[expense.category] += expense.amount
    })
    return totals
  }

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0)
  }

  const renderEditForm = (expense) => (
    <div style={styles.editForm}>
      <h5>Uredi trošak</h5>
      <div className="row">
        <div className="col-6">
          <div className="form-group" style={{ position: "relative" }}>
            <label className="form-label">Kategorija</label>
            <input
              type="text"
              value={editFormData.category}
              onChange={handleEditCategoryInputChange}
              onFocus={() => {
                setShowEditCategoryDropdown(true)
                setFilteredEditCategories(categories)
              }}
              onBlur={() => {
                setTimeout(() => setShowEditCategoryDropdown(false), 200)
              }}
              placeholder="Počnite tipkati ili odaberite kategoriju..."
              required
            />

            {showEditCategoryDropdown && filteredEditCategories.length > 0 && (
              <div style={styles.categoryDropdown}>
                {filteredEditCategories.map((cat, index) => (
                  <div
                    key={`edit-cat-${index}`}
                    style={styles.categoryOption}
                    onMouseDown={() => handleEditCategorySelect(cat)}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label className="form-label">Iznos</label>
            <input
              type="number"
              value={editFormData.amount}
              onChange={(e) => setEditFormData({ ...editFormData, amount: e.target.value })}
              placeholder="0"
              min="0"
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <div className="form-group" style={{ position: "relative" }}>
            <label className="form-label">Valuta</label>
            <input
              type="text"
              value={editFormData.currency}
              onChange={handleEditCurrencyInputChange}
              onFocus={() => {
                setShowEditCurrencyDropdown(true)
                setFilteredEditCurrencies(currencies)
              }}
              onBlur={() => {
                setTimeout(() => setShowEditCurrencyDropdown(false), 200)
              }}
              placeholder="Počnite tipkati ili odaberite valutu..."
              required
            />

            {showEditCurrencyDropdown && filteredEditCurrencies.length > 0 && (
              <div style={styles.categoryDropdown}>
                {filteredEditCurrencies.map((curr, index) => (
                  <div
                    key={`edit-curr-${index}`}
                    style={styles.categoryOption}
                    onMouseDown={() => handleEditCurrencySelect(curr.code)}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
                  >
                    <span style={styles.currencyCode}>{curr.code}</span>
                    <span style={styles.currencyName}>{curr.name}</span>
                    <span style={styles.currencySymbol}>{curr.symbol}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label className="form-label">Datum</label>
            <input
              type="date"
              value={editFormData.data}
              onChange={(e) => setEditFormData({ ...editFormData, data: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Opis</label>
        <textarea
          value={editFormData.description}
          onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
          placeholder="Za što je bio ovaj trošak?"
          rows="3"
          required
        />
      </div>

      <div style={styles.editButtons}>
        <button type="button" onClick={handleCancelEdit} className="btn-secondary" disabled={loading}>
          Odustani
        </button>
        <button
          type="button"
          onClick={() => handleUpdateExpense(expense.expenseId)}
          className="btn-primary"
          disabled={loading}
        >
          {loading ? "Ažuriram..." : "Spremi promjene"}
        </button>
      </div>
    </div>
  )

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h4>Troškovi</h4>
        <button onClick={() => setShowForm(true)} className="btn-primary" style={styles.addButton}>
          ➕ Dodaj trošak
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <div className="card" style={styles.form}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group" style={{ position: "relative" }}>
                  <label className="form-label">Kategorija</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={handleCategoryInputChange}
                    onFocus={() => {
                      setShowCategoryDropdown(true)
                      setFilteredCategories(categories)
                    }}
                    onBlur={() => {
                      setTimeout(() => setShowCategoryDropdown(false), 200)
                    }}
                    placeholder="Počnite tipkati ili odaberite kategoriju..."
                    required
                  />

                  {showCategoryDropdown && filteredCategories.length > 0 && (
                    <div style={styles.categoryDropdown}>
                      {filteredCategories.map((cat, index) => (
                        <div
                          key={`cat-${index}`}
                          style={styles.categoryOption}
                          onMouseDown={() => handleCategorySelect(cat)}
                          onMouseEnter={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
                          onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  )}

                  {showCategoryDropdown && filteredCategories.length === 0 && formData.category && (
                    <div style={styles.categoryDropdown}>
                      <div style={styles.noResults}>Nema rezultata za "{formData.category}"</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className="form-label">Iznos</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="form-group" style={{ position: "relative" }}>
                  <label className="form-label">Valuta</label>
                  <input
                    type="text"
                    value={formData.currency}
                    onChange={handleCurrencyInputChange}
                    onFocus={() => {
                      setShowCurrencyDropdown(true)
                      setFilteredCurrencies(currencies)
                    }}
                    onBlur={() => {
                      setTimeout(() => setShowCurrencyDropdown(false), 200)
                    }}
                    placeholder="Počnite tipkati ili odaberite valutu..."
                    required
                  />

                  {showCurrencyDropdown && filteredCurrencies.length > 0 && (
                    <div style={styles.categoryDropdown}>
                      {filteredCurrencies.map((curr, index) => (
                        <div
                          key={`curr-${index}`}
                          style={styles.categoryOption}
                          onMouseDown={() => handleCurrencySelect(curr.code)}
                          onMouseEnter={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
                          onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
                        >
                          <span style={styles.currencyCode}>{curr.code}</span>
                          <span style={styles.currencyName}>{curr.name}</span>
                          <span style={styles.currencySymbol}>{curr.symbol}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {showCurrencyDropdown && filteredCurrencies.length === 0 && formData.currency && (
                    <div style={styles.categoryDropdown}>
                      <div style={styles.noResults}>Nema rezultata za "{formData.currency}"</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className="form-label">Datum</label>
                  <input
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Opis</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Za što je bio ovaj trošak?"
                rows="3"
                required
              />
            </div>

            <div style={styles.buttonGroup}>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                Odustani
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Dodajem..." : "Dodaj trošak"}
              </button>
            </div>
          </form>
        </div>
      )}

      {expenses.length > 0 && (
        <div className="card" style={styles.summary}>
          <h5>Sažetak troškova</h5>
          <div style={styles.summaryGrid}>
            {Object.entries(getTotalByCategory()).map(([category, total], index) => (
              <div key={`summary-${category}-${index}`} style={styles.summaryItem}>
                <span style={styles.categoryName}>{category}</span>
                <span style={styles.categoryTotal}>${total}</span>
              </div>
            ))}
          </div>
          <div style={styles.totalRow}>
            <strong>Ukupno: ${getTotalExpenses()}</strong>
          </div>
        </div>
      )}

      <div style={styles.expenseList}>
        {expenses.map((expense, index) => (
          <div key={expense.expenseId || `expense-${index}`} className="card" style={styles.expenseCard}>
            {editingExpense === expense.expenseId ? (
              renderEditForm(expense)
            ) : (
              <>
                <div style={styles.expenseHeader}>
                  <div>
                    <span style={styles.category}>{expense.category}</span>
                    <span style={styles.amount}>
                      ${expense.amount} {expense.currency}
                    </span>
                  </div>
                  <div style={styles.expenseActions}>
                    <button
                      onClick={() => handleEditExpense(expense)}
                      className="btn-secondary"
                      style={styles.editButton}
                    >
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(expense)} className="btn-danger" style={styles.deleteButton}>
                      🗑️
                    </button>
                  </div>
                </div>
                <div style={styles.expenseContent}>
                  <p style={styles.description}>{expense.description}</p>
                  <p style={styles.date}>📅 {expense.data || expense.date}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {expenses.length === 0 && !showForm && (
        <div style={styles.emptyState}>
          <p>Još nema dodanih troškova</p>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            Dodajte svoj prvi trošak
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
  buttonGroup: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  },
  summary: {
    marginBottom: "20px",
    padding: "20px",
    background: "#f8f9fa",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
    marginBottom: "16px",
  },
  summaryItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 12px",
    background: "white",
    borderRadius: "4px",
    border: "1px solid #e9ecef",
  },
  categoryName: {
    fontWeight: "500",
  },
  categoryTotal: {
    fontWeight: "bold",
    color: "#28a745",
  },
  totalRow: {
    textAlign: "right",
    fontSize: "18px",
    paddingTop: "12px",
    borderTop: "2px solid #dee2e6",
  },
  expenseList: {
    display: "grid",
    gap: "12px",
  },
  expenseCard: {
    padding: "16px",
  },
  expenseHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  category: {
    background: "#28a745",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
    marginRight: "12px",
  },
  amount: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#28a745",
  },
  expenseActions: {
    display: "flex",
    gap: "8px",
  },
  editButton: {
    padding: "4px 8px",
    fontSize: "12px",
    minWidth: "auto",
  },
  deleteButton: {
    padding: "4px 8px",
    fontSize: "12px",
    minWidth: "auto",
  },
  expenseContent: {
    fontSize: "14px",
  },
  description: {
    marginBottom: "8px",
    fontWeight: "500",
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
  categoryDropdown: {
    position: "absolute",
    top: "100%",
    left: "0",
    right: "0",
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderTop: "none",
    borderRadius: "0 0 4px 4px",
    maxHeight: "200px",
    overflowY: "auto",
    zIndex: 1000,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  categoryOption: {
    padding: "10px 12px",
    cursor: "pointer",
    borderBottom: "1px solid #f0f0f0",
    transition: "background-color 0.2s",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currencyCode: {
    fontWeight: "bold",
    color: "#007bff",
    minWidth: "40px",
  },
  currencyName: {
    flex: 1,
    marginLeft: "8px",
    fontSize: "14px",
  },
  currencySymbol: {
    fontWeight: "bold",
    color: "#28a745",
    minWidth: "30px",
    textAlign: "right",
  },
  noResults: {
    padding: "10px 12px",
    color: "#666",
    fontStyle: "italic",
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

export default ExpenseManager
