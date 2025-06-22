"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function SharedPosts({ currentUser }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:8080/api/shared-posts", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Mrežna greška")
        return response.json()
      })
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Fetch error:", error)
        setLoading(false)
      })
  }, [currentUser])

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`)
  }

  const handleDeletePost = async (postId, event) => {
    event.stopPropagation()

    if (!window.confirm("Jeste li sigurni da želite obrisati ovu objavu?")) {
      return
    }

    try {
      const response = await fetch(`http://localhost:8080/api/shared-posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        setPosts(posts.filter((post) => post.postId !== postId))
      } else {
        alert("Greška pri brisanju objave")
      }
    } catch (error) {
      console.error("Error deleting post:", error)
      alert("Greška pri brisanju objave")
    }
  }

  const getFirstMedia = (post) => {
    const generalMedia = post.mediaPaths?.filter((media) => !media.locationId) || []
    if (generalMedia.length > 0) return generalMedia[0]

    // media za lokaciju
    if (post.locations) {
      for (const location of post.locations) {
        if (location.media && location.media.length > 0) {
          return location.media[0]
        }
      }
    }
    return null
  }

  const renderPreviewMedia = (mediaItem) => {
    if (!mediaItem) return null

    const isVideo = /\.(mp4|webm|ogg|avi|mov|mkv)$/i.test(mediaItem.filePath)
    const isAudio = /\.(mp3|wav|ogg|m4a|aac)$/i.test(mediaItem.filePath)

    if (isVideo) {
      return <video src={mediaItem.filePath} style={styles.previewMedia} muted crossOrigin="anonymous" />
    } else if (isAudio) {
      return <div style={styles.audioPreview}>🎵 Audio</div>
    } else {
      return (
        <img
          src={mediaItem.filePath || "/placeholder.svg"}
          alt="Putna uspomena"
          style={styles.previewMedia}
          crossOrigin="anonymous"
        />
      )
    }
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div className="spinner"></div>
        <p className="text-center">Učitavam objave...</p>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Putne priče</h1>
        <p style={styles.subtitle}>Otkrijte nevjerojatna putna iskustva naše zajednice</p>
      </div>

      {posts.length === 0 ? (
        <div className="card text-center">
          <h3>Nema pronađenih objava</h3>
          <p>Budite prvi koji će podijeliti svoje putno iskustvo!</p>
        </div>
      ) : (
        <div style={styles.postsGrid}>
          {posts.map((post) => (
            <div key={post.postId} style={styles.postCard} onClick={() => handlePostClick(post.postId)}>
              <div style={styles.cardContent}>
                <div style={styles.mediaSection}>{renderPreviewMedia(getFirstMedia(post))}</div>

                <div style={styles.contentSection}>
                  {currentUser && currentUser.username === post.username && (
                    <button
                      onClick={(e) => handleDeletePost(post.postId, e)}
                      style={styles.deleteButton}
                      title="Obriši objavu"
                    >
                      🗑️
                    </button>
                  )}
                  <div style={styles.postHeader}>
                    <h3 style={styles.username}>{post.username}</h3>
                    <span style={styles.date}>{new Date(post.createdAt).toLocaleDateString("hr-HR")}</span>
                  </div>

                  <p style={styles.postContent}>
                    {post.content.length > 120 ? `${post.content.substring(0, 120)}...` : post.content}
                  </p>

                  <div style={styles.postMeta}>
                    <div style={styles.stats}>
                      {post.locations && post.locations.length > 0 && (
                        <span style={styles.stat}>📍 {post.locations.length} lokacija</span>
                      )}
                      {post.comments && post.comments.length > 0 && (
                        <span style={styles.stat}>💬 {post.comments.length}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  headerTitle: {
    color: "#2c3e50",
    fontSize: "2.5rem",
    marginBottom: "10px",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#495057",
    marginBottom: "0",
    fontWeight: "500",
  },
  postsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
  },
  postCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "1px solid #e9ecef",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  mediaSection: {
    height: "200px",
    overflow: "hidden",
    backgroundColor: "#f8f9fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  previewMedia: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  audioPreview: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    color: "#6c757d",
    height: "100%",
  },
  contentSection: {
    padding: "16px",
    flex: "1",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  postHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    paddingRight: "36px", // za delete
  },
  username: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#2c3e50",
    margin: "0",
  },
  date: {
    fontSize: "0.85rem",
    color: "#6c757d",
  },
  postContent: {
    fontSize: "0.95rem",
    color: "#495057",
    lineHeight: "1.5",
    marginBottom: "12px",
    flex: "1",
  },
  postMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "12px",
    borderTop: "1px solid #e9ecef",
  },
  tripBadge: {
    fontSize: "0.8rem",
    color: "#007bff",
    fontWeight: "500",
  },
  stats: {
    display: "flex",
    gap: "12px",
  },
  stat: {
    fontSize: "0.8rem",
    color: "#6c757d",
  },
  deleteButton: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "rgba(220, 53, 69, 0.9)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    width: "28px",
    height: "28px",
    cursor: "pointer",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    zIndex: 10,
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
  "deleteButton:hover": {
    background: "#dc3545",
    transform: "scale(1.1)",
  },
}

export default SharedPosts
