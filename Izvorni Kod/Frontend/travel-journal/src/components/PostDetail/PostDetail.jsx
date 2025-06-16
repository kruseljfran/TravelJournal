"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function PostDetail({ currentUser }) {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [commentInput, setCommentInput] = useState("")
  const [deletingComments, setDeletingComments] = useState(new Set())

  useEffect(() => {
    // Fetch single post details
    fetch(`http://localhost:8080/api/shared-posts/${postId}`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Mrežna greška")
        return response.json()
      })
      .then((data) => {
        setPost(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Fetch error:", error)
        setLoading(false)
      })
  }, [postId])

  const handleCommentSubmit = async () => {
    if (!commentInput || !currentUser?.userId) return

    try {
      const response = await fetch("http://localhost:8080/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: currentUser.userId,
          postId: Number.parseInt(postId),
          content: commentInput,
        }),
      })

      if (!response.ok) throw new Error("Neuspješno objavljivanje komentara")

      const newComment = await response.json()
      setPost((prevPost) => ({
        ...prevPost,
        comments: [
          ...(prevPost.comments || []),
          {
            commentId: newComment.commentId,
            username: currentUser.username,
            userId: currentUser.userId,
            content: commentInput,
            createdAt: newComment.createdAt,
          },
        ],
      }))
      setCommentInput("")
    } catch (err) {
      console.error(err)
      alert("Neuspješno objavljivanje komentara. Molimo pokušajte ponovno.")
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Jeste li sigurni da želite obrisati ovaj komentar?")) {
      return
    }

    setDeletingComments((prev) => new Set(prev).add(commentId))

    try {
      const response = await fetch(`http://localhost:8080/api/comments/${commentId}?userId=${currentUser.userId}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Neuspješno brisanje komentara")
      }

      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.filter((comment) => comment.commentId !== commentId),
      }))
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

  const canDeleteComment = (comment) => {
    if (!currentUser) return false
    return comment.userId === currentUser.userId || post.userId === currentUser.userId
  }

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
        />
      )
    } else if (isAudio) {
      return (
        <audio
          key={mediaItem.mediaId}
          src={mediaItem.filePath}
          style={styles.mediaAudio}
          controls
          crossOrigin="anonymous"
        />
      )
    } else {
      return (
        <img
          key={mediaItem.mediaId}
          src={mediaItem.filePath || "/placeholder.svg"}
          alt="Putna uspomena"
          style={styles.mediaImage}
          crossOrigin="anonymous"
        />
      )
    }
  }

  const getGeneralMedia = (post) => {
    return post.mediaPaths?.filter((media) => !media.locationId) || []
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div className="spinner"></div>
        <p className="text-center">Učitavam objavu...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div style={styles.container}>
        <div className="text-center">
          <h3>Objava nije pronađena</h3>
          <button onClick={() => navigate("/home")} style={styles.backButton}>
            Povratak na početnu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/home")} style={styles.backButton}>
        ← Povratak na početnu
      </button>

      <div style={styles.postContainer}>
        <div style={styles.postHeader}>
          <div style={styles.authorInfo}>
            <h1 style={styles.authorName}>{post.username}</h1>
            <p style={styles.postDate}>
              {new Date(post.createdAt).toLocaleDateString("hr-HR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div style={styles.tripInfo}>
          </div>
        </div>

        <div style={styles.postContent}>
          <p style={styles.contentText}>{post.content}</p>

          {/* General Media */}
          {getGeneralMedia(post).length > 0 && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>📸 Mediji putovanja</h2>
              <div style={styles.mediaGrid}>
                {getGeneralMedia(post).map((mediaItem) => (
                  <div key={mediaItem.mediaId} style={styles.mediaItem}>
                    {renderMedia(mediaItem)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locations */}
          {post.locations && post.locations.length > 0 && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>📍 Posjećene lokacije</h2>
              <div style={styles.locationsGrid}>
                {post.locations.map((location, index) => (
                  <div key={index} style={styles.locationCard}>
                    <div style={styles.locationHeader}>
                      <h3 style={styles.locationName}>{location.name}</h3>
                      {location.countryName && <span style={styles.locationCountry}>{location.placeName},{location.countryName}</span>}
                    </div>

                    {location.visitedOn && (
                      <p style={styles.locationDate}>
                        📅 Posjećeno: {new Date(location.visitedOn).toLocaleDateString("hr-HR")}
                      </p>
                    )}

                    {location.notes && <p style={styles.locationNotes}>"{location.notes}"</p>}

                    {(location.vibeRating || location.foodRating || location.worthItRating) && (
                      <div style={styles.ratingsContainer}>
                        {location.vibeRating && (
                          <div style={styles.rating}>
                            <span>🌟 Atmosfera:</span> {location.vibeRating}/5
                          </div>
                        )}
                        {location.foodRating && (
                          <div style={styles.rating}>
                            <span>🍽️ Hrana:</span> {location.foodRating}/5
                          </div>
                        )}
                        {location.worthItRating && (
                          <div style={styles.rating}>
                            <span>💎 Vrijednost:</span> {location.worthItRating}/5
                          </div>
                        )}
                      </div>
                    )}

                    {location.media && location.media.length > 0 && (
                      <div style={styles.locationMediaContainer}>
                        <h4 style={styles.locationMediaTitle}>📷 Fotografije lokacije</h4>
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
                ))}
              </div>
            </div>
          )}

          {/* Expenses */}
          {post.expenses && post.expenses.length > 0 && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>💰 Troškovi putovanja</h2>
              <div style={styles.expensesGrid}>
                {post.expenses.map((expense, index) => (
                  <div key={index} style={styles.expenseCard}>
                    <div style={styles.expenseHeader}>
                      <span style={styles.expenseCategory}>{expense.category}</span>
                      <span style={styles.expenseAmount}>
                        {expense.amount} {expense.currency}
                      </span>
                    </div>
                    {expense.description && <p style={styles.expenseDescription}>{expense.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>💬 Komentari ({post.comments?.length || 0})</h2>

            <div style={styles.commentForm}>
              <textarea
                placeholder="Napišite svoj komentar..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                style={styles.commentTextarea}
                rows="3"
              />
              <button onClick={handleCommentSubmit} style={styles.commentSubmitButton}>
                Objavi komentar
              </button>
            </div>

            {post.comments && post.comments.length > 0 && (
              <div style={styles.commentsList}>
                {post.comments.map((comment, index) => (
                  <div key={comment.commentId || index} style={styles.commentItem}>
                    <div style={styles.commentHeader}>
                      <div>
                        <strong style={styles.commentAuthor}>{comment.username}</strong>
                        {comment.createdAt && (
                          <span style={styles.commentDate}>
                            {new Date(comment.createdAt).toLocaleDateString("hr-HR", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        )}
                      </div>
                      {canDeleteComment(comment) && (
                        <button
                          onClick={() => handleDeleteComment(comment.commentId)}
                          disabled={deletingComments.has(comment.commentId)}
                          style={styles.deleteButton}
                          title="Obriši komentar"
                        >
                          {deletingComments.has(comment.commentId) ? "..." : "🗑️"}
                        </button>
                      )}
                    </div>
                    <p style={styles.commentContent}>{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
    minHeight: "100vh",
  },
  backButton: {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginBottom: "20px",
    transition: "background-color 0.2s",
  },
  postContainer: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  postHeader: {
    background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)", // Changed to dark gradient for better contrast
    color: "white",
    padding: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  authorInfo: {
    flex: "1",
  },
  authorName: {
    fontSize: "2rem",
    fontWeight: "700",
    margin: "0 0 8px 0",
    color: "white", // Explicitly set to white for better contrast
    textShadow: "1px 1px 2px rgba(0,0,0,0.3)", // Added text shadow for better readability
  },
  postDate: {
    fontSize: "1rem",
    opacity: "0.95", // Slightly increased opacity
    margin: "0",
    color: "#ecf0f1", // Light gray color for better readability
  },
  tripInfo: {
    textAlign: "right",
  },
  tripBadge: {
    backgroundColor: "rgba(255,255,255,0.25)", // Slightly more opaque for better visibility
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "white",
  },
  postContent: {
    padding: "30px",
  },
  contentText: {
    fontSize: "1.1rem",
    lineHeight: "1.7",
    color: "#2c3e50",
    marginBottom: "30px",
    fontWeight: "400",
  },
  section: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "20px",
    borderBottom: "2px solid #e9ecef",
    paddingBottom: "10px",
  },
  // Media styles
  mediaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },
  mediaItem: {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  mediaImage: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
  },
  mediaVideo: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
  },
  mediaAudio: {
    width: "100%",
    height: "60px",
  },
  // Location styles
  locationsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "20px",
  },
  locationCard: {
    background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
    border: "1px solid #bbdefb",
    borderRadius: "12px",
    padding: "20px",
  },
  locationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  locationName: {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#1976d2",
    margin: "0",
  },
  locationCountry: {
    fontSize: "1rem",
    color: "#666",
    fontWeight: "500",
  },
  locationDate: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "10px",
  },
  locationNotes: {
    fontSize: "1rem",
    color: "#495057",
    fontStyle: "italic",
    marginBottom: "15px",
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: "10px",
    borderRadius: "8px",
  },
  ratingsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
    marginBottom: "15px",
  },
  rating: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  locationMediaContainer: {
    marginTop: "15px",
  },
  locationMediaTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#495057",
  },
  locationMediaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "10px",
  },
  locationMediaItem: {
    borderRadius: "8px",
    overflow: "hidden",
    aspectRatio: "1",
  },
  // Expense styles
  expensesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },
  expenseCard: {
    background: "linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)",
    border: "1px solid #c8e6c9",
    borderRadius: "12px",
    padding: "15px",
  },
  expenseHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  expenseCategory: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#2e7d32",
  },
  expenseAmount: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#1b5e20",
  },
  expenseDescription: {
    fontSize: "0.9rem",
    color: "#666",
    margin: "0",
  },
  // Comment styles
  commentForm: {
    marginBottom: "25px",
  },
  commentTextarea: {
    width: "100%",
    padding: "12px",
    border: "2px solid #e9ecef",
    borderRadius: "8px",
    fontSize: "1rem",
    resize: "vertical",
    marginBottom: "10px",
    fontFamily: "inherit",
  },
  commentSubmitButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  commentsList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  commentItem: {
    backgroundColor: "#f8f9fa",
    border: "1px solid #e9ecef",
    borderRadius: "8px",
    padding: "15px",
  },
  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  commentAuthor: {
    color: "#667eea",
    fontSize: "1rem",
    marginRight: "10px",
  },
  commentDate: {
    fontSize: "0.8rem",
    color: "#6c757d",
  },
  commentContent: {
    fontSize: "0.95rem",
    color: "#495057",
    lineHeight: "1.5",
    margin: "0",
  },
  deleteButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    color: "#dc3545",
    padding: "4px 8px",
    borderRadius: "4px",
    transition: "background-color 0.2s",
  },
}

export default PostDetail
