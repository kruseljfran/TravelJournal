"use client"

import { useState, useEffect } from "react"

function User({ currentUser }) {
  const [stats, setStats] = useState({
    tripsCount: 0,
    sharedPostsCount: 0,
    commentsCount: 0,
    countriesCount: 0,
    loading: true,
  })

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!currentUser?.userId) {
        setStats((prev) => ({ ...prev, loading: false }))
        return
      }

      try {
        let tripsCount = 0
        let sharedPostsCount = 0
        let commentsCount = 0
        const countriesSet = new Set()

        // Fetch user's trips
        try {
          const tripsResponse = await fetch(`http://localhost:8080/api/trips/user/${currentUser.userId}`, {
            credentials: "include",
          })
          if (tripsResponse.ok) {
            const trips = await tripsResponse.json()
            tripsCount = trips.length
            console.log("Trips found:", trips.length)

            // For each trip, get its locations and count unique countries
            for (const trip of trips) {
              try {
                const locationsResponse = await fetch(`http://localhost:8080/api/locations/trip/${trip.tripId}`, {
                  credentials: "include",
                })
                if (locationsResponse.ok) {
                  const locations = await locationsResponse.json()
                  console.log(`Trip ${trip.tripId} has ${locations.length} locations`)

                  locations.forEach((location) => {
                    if (location.countryName) {
                      countriesSet.add(location.countryName)
                      console.log(`Added country: ${location.countryName}`)
                    }
                  })
                }
              } catch (error) {
                console.error(`Error fetching locations for trip ${trip.tripId}:`, error)
              }
            }

            console.log("Unique countries visited:", Array.from(countriesSet))
          }
        } catch (error) {
          console.error("Error fetching trips:", error)
        }

        // Fetch all shared posts and filter by user
        try {
          const postsResponse = await fetch(`http://localhost:8080/api/shared-posts`, {
            credentials: "include",
          })
          if (postsResponse.ok) {
            const allPosts = await postsResponse.json()
            const userPosts = allPosts.filter((post) => post.userId === currentUser.userId)
            sharedPostsCount = userPosts.length
            console.log("Shared posts found:", userPosts.length)
          }
        } catch (error) {
          console.error("Error fetching shared posts:", error)
        }

        // Fetch user's comments using the specific endpoint
        try {
          const commentsResponse = await fetch(`http://localhost:8080/api/comments/user/${currentUser.userId}`, {
            credentials: "include",
          })

          if (commentsResponse.ok) {
            const responseText = await commentsResponse.text()
            console.log("Raw comments response:", responseText)

            try {
              const userComments = JSON.parse(responseText)
              commentsCount = Array.isArray(userComments) ? userComments.length : 0
              console.log("Comments found:", commentsCount)
            } catch (parseError) {
              console.error("Error parsing comments JSON:", parseError)
              console.error("Response text:", responseText)
            }
          } else {
            console.log("Comments endpoint returned status:", commentsResponse.status)
          }
        } catch (error) {
          console.error("Error fetching comments:", error)
        }

        setStats({
          tripsCount,
          sharedPostsCount,
          commentsCount,
          countriesCount: countriesSet.size,
          loading: false,
        })
      } catch (error) {
        console.error("Error fetching user stats:", error)
        setStats((prev) => ({ ...prev, loading: false }))
      }
    }

    fetchUserStats()
  }, [currentUser?.userId])

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
                    src={"/uploads/" + currentUser.profilePicture || "/placeholder.svg"}
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
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Statistike računa</h3>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{stats.loading ? "..." : stats.tripsCount}</div>
              <div style={styles.statLabel}>Stvorenih putovanja</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{stats.loading ? "..." : stats.sharedPostsCount}</div>
              <div style={styles.statLabel}>Podijeljenih objava</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{stats.loading ? "..." : stats.commentsCount}</div>
              <div style={styles.statLabel}>Napisanih komentara</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{stats.loading ? "..." : stats.countriesCount}</div>
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
