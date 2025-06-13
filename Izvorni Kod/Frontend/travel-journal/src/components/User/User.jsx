function User({ currentUser }) {
  // Check if currentUser exists
  if (!currentUser) {
    return (
      <div style={styles.container}>
        <div className="spinner"></div>
        <p className="text-center">Učitavam profil...</p>
      </div>
    )
  }

  return (
    <div style={styles.container} className="container">
      <div className="fade-in">
        <div style={styles.header}>
          <h1>Moj profil</h1>
          <p style={styles.subtitle}>Upravljajte svojim računom putnog dnevnika</p>
        </div>

        <div className="row">
          <div className="col-4">
            <div className="card" style={styles.avatarCard}>
              <div style={styles.avatarContainer}>
                {currentUser.profilePicture ? (
                  <img
                    src={currentUser.profilePicture || "/placeholder.svg"}
                    alt="Profil"
                    style={styles.profileImage}
                  />
                ) : (
                  <div style={styles.avatarPlaceholder}>
                    <span style={styles.avatarInitial}>{currentUser.username.charAt(0).toUpperCase()}</span>
                  </div>
                )}
              </div>
              <div className="text-center mt-3">
                <h3 style={styles.username}>{currentUser.username}</h3>
                <span className="badge badge-primary">{currentUser.role}</span>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Informacije o računu</h3>
              </div>

              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <div style={styles.infoLabel}>📧 Email adresa</div>
                  <div style={styles.infoValue}>{currentUser.email}</div>
                </div>

                <div style={styles.infoItem}>
                  <div style={styles.infoLabel}>👤 Korisničko ime</div>
                  <div style={styles.infoValue}>{currentUser.username}</div>
                </div>

                <div style={styles.infoItem}>
                  <div style={styles.infoLabel}>🎭 Uloga</div>
                  <div style={styles.infoValue}>
                    <span className={`badge ${currentUser.role === "admin" ? "badge-danger" : "badge-primary"}`}>
                      {currentUser.role}
                    </span>
                  </div>
                </div>

                <div style={styles.infoItem}>
                  <div style={styles.infoLabel}>📅 Član od</div>
                  <div style={styles.infoValue}>
                    {new Date(currentUser.createdAt).toLocaleDateString("hr-HR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                {currentUser.bio && (
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>📝 Biografija</div>
                    <div style={styles.infoValue}>{currentUser.bio}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Brze akcije</h3>
              </div>

              <div style={styles.actionGrid}>
                <button className="btn-primary" style={styles.actionButton}>
                  ✏️ Uredi profil
                </button>
                <button className="btn-secondary" style={styles.actionButton}>
                  🔒 Promijeni lozinku
                </button>
                <button className="btn-success" style={styles.actionButton}>
                  ➕ Stvori novo putovanje
                </button>
                <button className="btn-secondary" style={styles.actionButton}>
                  📊 Pogledaj statistike
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Statistike računa</h3>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>0</div>
              <div style={styles.statLabel}>Stvorenih putovanja</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>0</div>
              <div style={styles.statLabel}>Podijeljenih objava</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>0</div>
              <div style={styles.statLabel}>Napisanih komentara</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>0</div>
              <div style={styles.statLabel}>Posjećenih zemalja</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#6c757d",
    marginBottom: "0",
  },
  avatarCard: {
    textAlign: "center",
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px",
  },
  profileImage: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #667eea",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },
  avatarPlaceholder: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },
  avatarInitial: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "white",
  },
  username: {
    marginBottom: "8px",
    color: "#2d3748",
  },
  infoGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  infoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #e9ecef",
  },
  infoLabel: {
    fontWeight: "600",
    color: "#495057",
    fontSize: "0.95rem",
  },
  infoValue: {
    color: "#2d3748",
    fontSize: "0.95rem",
  },
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
  },
  actionButton: {
    padding: "12px 16px",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
  },
  statItem: {
    textAlign: "center",
    padding: "20px",
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    borderRadius: "8px",
    border: "1px solid #dee2e6",
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#667eea",
    marginBottom: "8px",
  },
  statLabel: {
    fontSize: "0.9rem",
    color: "#6c757d",
    fontWeight: "500",
  },
}

export default User
