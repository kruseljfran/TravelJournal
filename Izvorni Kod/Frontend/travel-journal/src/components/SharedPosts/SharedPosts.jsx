"use client"

import { useEffect, useState } from "react"

function SharedPosts({ currentUser }) {
  const [posts, setPosts] = useState([])
  const [commentInputs, setCommentInputs] = useState({})
  const [loading, setLoading] = useState(true)
  const [deletingComments, setDeletingComments] = useState(new Set())
  const [deletingPosts, setDeletingPosts] = useState(new Set())

  useEffect(() => {
    console.log(currentUser)
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

  const handleInputChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }))
  }

  const handleCommentSubmit = async (postId) => {
    const content = commentInputs[postId]
    if (!content || !currentUser?.userId) return

    try {
      const response = await fetch("http://localhost:8080/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: currentUser.userId,
          postId,
          content,
        }),
      })

      if (!response.ok) throw new Error("Neuspješno objavljivanje komentara")

      const newComment = await response.json()
      const updatedPosts = posts.map((post) => {
        if (post.postId === postId) {
          return {
            ...post,
            comments: [
              ...(post.comments || []),
              {
                commentId: newComment.commentId,
                username: currentUser.username,
                userId: currentUser.userId,
                content,
                createdAt: newComment.createdAt,
              },
            ],
          }
        }
        return post
      })
      setPosts(updatedPosts)
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }))
    } catch (err) {
      console.error(err)
      alert("Neuspješno objavljivanje komentara. Molimo pokušajte ponovno.")
    }
  }

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Jeste li sigurni da želite obrisati ovu objavu? Ova radnja se ne može poništiti.")) {
      return
    }

    if (!currentUser?.userId) {
      alert("Morate biti prijavljeni da biste brisali objave.")
      return
    }

    setDeletingPosts((prev) => new Set(prev).add(postId))

    try {
      const response = await fetch(`http://localhost:8080/api/shared-posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Neuspješno brisanje objave")
      }

      // Remove post from the UI
      setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId))

      // Also remove any comment inputs for this post
      setCommentInputs((prev) => {
        const newInputs = { ...prev }
        delete newInputs[postId]
        return newInputs
      })
    } catch (err) {
      console.error("Delete post error:", err)
      alert(err.message || "Neuspješno brisanje objave. Molimo pokušajte ponovno.")
    } finally {
      setDeletingPosts((prev) => {
        const newSet = new Set(prev)
        newSet.delete(postId)
        return newSet
      })
    }
  }

  const handleDeleteComment = async (commentId, postId) => {
    if (!window.confirm("Jeste li sigurni da želite obrisati ovaj komentar?")) {
      return
    }

    if (!currentUser?.userId) {
      alert("Morate biti prijavljeni da biste brisali komentare.")
      return
    }

    setDeletingComments((prev) => new Set(prev).add(commentId))

    try {
      // Add userId as query parameter for authentication
      const response = await fetch(`http://localhost:8080/api/comments/${commentId}?userId=${currentUser.userId}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Neuspješno brisanje komentara")
      }

      // Remove comment from the UI
      const updatedPosts = posts.map((post) => {
        if (post.postId === postId) {
          return {
            ...post,
            comments: post.comments.filter((comment) => comment.commentId !== commentId),
          }
        }
        return post
      })
      setPosts(updatedPosts)
    } catch (err) {
      console.error("Delete comment error:", err)
      alert(err.message || "Neuspješno brisanje komentara. Molimo pokušajte ponovno.")
    } finally {
      setDeletingComments((prev) => {
        const newSet = new Set(prev)
        newSet.delete(commentId)
        return newSet
      })
    }
  }

  const canDeleteComment = (comment, post) => {
    if (!currentUser) return false

    // User can delete their own comment
    if (comment.userId === currentUser.userId) return true

    // User can delete any comment on their own post
    if (post.userId === currentUser.userId) return true

    return false
  }

  const canDeletePost = (post) => {
    if (!currentUser) return false
    // User can only delete their own posts
    return post.userId === currentUser.userId
  }

  // Helper function to render media
  const renderMedia = (mediaItem) => {
    const isVideo = /\.(mp4|webm|ogg|avi|mov|mkv)$/i.test(mediaItem.filePath)
    const isAudio = /\.(mp3|wav|ogg|m4a|aac)$/i.test(mediaItem.filePath)

    if (isVideo) {
      return (
        <video
          key={mediaItem.mediaId}
          src={mediaItem.filePath}
          style={styles.mediaVideo}
          controls
          crossOrigin="anonymous"
        >
          Vaš pregljednik ne podržava video oznaku.
        </video>
      )
    } else if (isAudio) {
      return (
        <audio
          key={mediaItem.mediaId}
          src={mediaItem.filePath}
          style={styles.mediaAudio}
          controls
          crossOrigin="anonymous"
        >
          Vaš pregljednik ne podržava audio oznaku.
        </audio>
      )
    } else {
      return (
        <img
          key={mediaItem.mediaId}
          src={mediaItem.filePath || "/placeholder.svg"}
          alt={`Putna uspomena`}
          style={styles.mediaImage}
          crossOrigin="anonymous"
        />
      )
    }
  }

  // Helper function to get media without location
  const getGeneralMedia = (post) => {
    return post.mediaPaths?.filter((media) => !media.locationId) || []
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
    <div style={styles.container} className="container">
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
            <div key={post.postId} className="card fade-in" style={styles.postCard}>
              <div className="card-header">
                <div style={styles.postHeader}>
                  <div>
                    <h3 className="card-title">{post.username}</h3>
                    <p className="card-subtitle">
                      {new Date(post.createdAt).toLocaleDateString("hr-HR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div style={styles.postActions}>
                    <span className="badge badge-primary">Putovanje #{post.tripId}</span>
                    {canDeletePost(post) && (
                      <button
                        onClick={() => handleDeletePost(post.postId)}
                        disabled={deletingPosts.has(post.postId)}
                        style={styles.deletePostButton}
                        title="Obriši objavu"
                      >
                        {deletingPosts.has(post.postId) ? "..." : "🗑️"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div style={styles.postContent}>
                <p>{post.content}</p>

                {/* Display general media (without location) */}
                {getGeneralMedia(post).length > 0 && (
                  <div style={styles.mediaContainer}>
                    <h4 style={styles.sectionTitle}>📸 Mediji putovanja</h4>
                    <div style={styles.mediaGrid}>
                      {getGeneralMedia(post).map((mediaItem) => (
                        <div key={mediaItem.mediaId} style={styles.mediaItem}>
                          {renderMedia(mediaItem)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Display locations with their associated media */}
                {post.locations && post.locations.length > 0 && (
                  <div style={styles.locationSection}>
                    <h4 style={styles.sectionTitle}>📍 Posjećene lokacije</h4>
                    <div style={styles.locationGrid}>
                      {post.locations.map((location, index) => (
                        <div key={index} style={styles.locationItem}>
                          <div style={styles.locationHeader}>
                            <div style={styles.locationName}>{location.name}</div>
                            {location.countryName && <div style={styles.locationCountry}>{location.countryName}</div>}
                          </div>

                          <div style={styles.locationDetails}>
                            {location.visitedOn && (
                              <div style={styles.locationDate}>
                                Posjećeno: {new Date(location.visitedOn).toLocaleDateString("hr-HR")}
                              </div>
                            )}

                            {location.notes && <div style={styles.locationNotes}>{location.notes}</div>}

                            <div style={styles.ratingContainer}>
                              {location.vibeRating && (
                                <div style={styles.rating}>
                                  <span>Atmosfera:</span> {location.vibeRating}/5
                                </div>
                              )}
                              {location.foodRating && (
                                <div style={styles.rating}>
                                  <span>Hrana:</span> {location.foodRating}/5
                                </div>
                              )}
                              {location.worthItRating && (
                                <div style={styles.rating}>
                                  <span>Vrijednost:</span> {location.worthItRating}/5
                                </div>
                              )}
                            </div>

                            {/* Display media associated with this location */}
                            {location.media && location.media.length > 0 && (
                              <div style={styles.locationMediaContainer}>
                                <h5 style={styles.locationMediaTitle}>📷 Mediji lokacije</h5>
                                <div style={styles.locationMediaGrid}>
                                  {location.media.map((mediaItem) => (
                                    <div key={mediaItem.mediaId} style={styles.locationMediaItem}>
                                      {renderMedia(mediaItem)}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {post.expenses && post.expenses.length > 0 && (
                  <div style={styles.expenseSection}>
                    <h4 style={styles.sectionTitle}>💰 Troškovi putovanja</h4>
                    <div style={styles.expenseGrid}>
                      {post.expenses.map((expense, index) => (
                        <div key={index} style={styles.expenseItem}>
                          <div style={styles.expenseCategory}>{expense.category}</div>
                          <div style={styles.expenseAmount}>
                            {expense.amount} {expense.currency}
                          </div>
                          {expense.description && <div style={styles.expenseDescription}>{expense.description}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {post.comments && post.comments.length > 0 && (
                  <div style={styles.commentSection}>
                    <h4 style={styles.sectionTitle}>💬 Komentari</h4>
                    <div style={styles.commentList}>
                      {post.comments.map((comment, index) => (
                        <div key={comment.commentId || index} style={styles.commentItem}>
                          <div style={styles.commentHeader}>
                            <div>
                              <strong style={styles.commentAuthor}>{comment.username}</strong>
                              <span style={styles.commentContent}>{comment.content}</span>
                            </div>
                            {canDeleteComment(comment, post) && (
                              <button
                                onClick={() => handleDeleteComment(comment.commentId, post.postId)}
                                disabled={deletingComments.has(comment.commentId)}
                                style={styles.deleteButton}
                                title="Obriši komentar"
                              >
                                {deletingComments.has(comment.commentId) ? "..." : "🗑️"}
                              </button>
                            )}
                          </div>
                          {comment.createdAt && (
                            <div style={styles.commentDate}>
                              {new Date(comment.createdAt).toLocaleDateString("hr-HR", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={styles.commentForm}>
                  <div className="d-flex">
                    <input
                      type="text"
                      placeholder="Napišite komentar..."
                      value={commentInputs[post.postId] || ""}
                      onChange={(e) => handleInputChange(post.postId, e.target.value)}
                      style={styles.commentInput}
                    />
                    <button
                      onClick={() => handleCommentSubmit(post.postId)}
                      className="btn-primary"
                      style={styles.commentButton}
                    >
                      Objavi
                    </button>
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
    padding: "40px 20px",
    maxWidth: "800px",
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
  postsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  postCard: {
    overflow: "hidden",
  },
  postHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  postActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  deletePostButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
    padding: "8px 12px",
    borderRadius: "6px",
    transition: "all 0.2s ease",
    color: "#dc3545",
    backgroundColor: "#fff5f5",
    border: "1px solid #fecaca",
  },
  postContent: {
    padding: "0",
  },
  // General media styles (for media without location)
  mediaContainer: {
    background: "linear-gradient(135deg, #f3e8ff 0%, #faf5ff 100%)",
    padding: "16px",
    borderRadius: "8px",
    margin: "16px 0",
    border: "1px solid #e9d5ff",
  },
  mediaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px",
    marginTop: "12px",
  },
  mediaItem: {
    borderRadius: "8px",
    overflow: "hidden",
    aspectRatio: "1",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  mediaVideo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px",
  },
  mediaAudio: {
    width: "100%",
    height: "60px",
    borderRadius: "8px",
  },
  // Location styles
  locationSection: {
    background: "linear-gradient(135deg, #e6f7ff 0%, #f0f8ff 100%)",
    padding: "16px",
    borderRadius: "8px",
    margin: "16px 0",
    border: "1px solid #d1e9ff",
  },
  locationGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  locationItem: {
    background: "white",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #e9ecef",
  },
  locationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  locationName: {
    fontWeight: "600",
    fontSize: "1.1rem",
    color: "#2c3e50",
  },
  locationCountry: {
    fontSize: "0.9rem",
    color: "#6c757d",
    fontWeight: "500",
  },
  locationDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  locationDate: {
    fontSize: "0.85rem",
    color: "#6c757d",
  },
  locationNotes: {
    fontSize: "0.9rem",
    color: "#495057",
    fontStyle: "italic",
    margin: "4px 0",
  },
  ratingContainer: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "8px",
  },
  rating: {
    fontSize: "0.85rem",
    padding: "4px 8px",
    borderRadius: "4px",
    background: "#f8f9fa",
    border: "1px solid #e9ecef",
  },
  // Location media styles
  locationMediaContainer: {
    marginTop: "12px",
    padding: "12px",
    background: "#f8f9fa",
    borderRadius: "6px",
    border: "1px solid #e9ecef",
  },
  locationMediaTitle: {
    fontSize: "0.9rem",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#495057",
  },
  locationMediaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    gap: "8px",
  },
  locationMediaItem: {
    borderRadius: "6px",
    overflow: "hidden",
    aspectRatio: "1",
  },
  // Expense styles
  expenseSection: {
    background: "linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%)",
    padding: "16px",
    borderRadius: "8px",
    margin: "16px 0",
    border: "1px solid #d4edda",
  },
  sectionTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#2d3748",
  },
  expenseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
  },
  expenseItem: {
    background: "white",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #e9ecef",
  },
  expenseCategory: {
    fontWeight: "600",
    color: "#495057",
    fontSize: "0.9rem",
  },
  expenseAmount: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#28a745",
    margin: "4px 0",
  },
  expenseDescription: {
    fontSize: "0.85rem",
    color: "#6c757d",
  },
  // Comment styles
  commentSection: {
    background: "#f8f9fa",
    padding: "16px",
    borderRadius: "8px",
    margin: "16px 0",
    border: "1px solid #e9ecef",
  },
  commentList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  commentItem: {
    background: "white",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #e9ecef",
  },
  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "4px",
  },
  commentAuthor: {
    color: "#667eea",
    marginRight: "8px",
    fontSize: "0.9rem",
  },
  commentContent: {
    color: "#495057",
    fontSize: "0.9rem",
  },
  commentDate: {
    fontSize: "0.75rem",
    color: "#6c757d",
    marginTop: "4px",
  },
  deleteButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    padding: "4px 8px",
    borderRadius: "4px",
    transition: "background-color 0.2s",
    color: "#dc3545",
  },
  commentForm: {
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px solid #e9ecef",
  },
  commentInput: {
    flex: "1",
    marginRight: "12px",
    marginBottom: "0",
  },
  commentButton: {
    padding: "12px 20px",
    whiteSpace: "nowrap",
  },
  headerTitle: {
    color: "#FF6B6B",
    background: "none",
    WebkitBackgroundClip: "unset",
    WebkitTextFillColor: "unset",
    backgroundClip: "unset",
  },
}

export default SharedPosts
