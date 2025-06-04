"use client"

import { useEffect, useState } from "react"

function SharedPosts({ currentUser }) {
  const [posts, setPosts] = useState([])
  const [commentInputs, setCommentInputs] = useState({})
  const [loading, setLoading] = useState(true)
  const [deletingComments, setDeletingComments] = useState(new Set())

  useEffect(() => {
    console.log(currentUser)
    fetch("http://localhost:8080/api/shared-posts", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network error")
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

      if (!response.ok) throw new Error("Failed to post comment")

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
      alert("Failed to post comment. Please try again.")
    }
  }

  const handleDeleteComment = async (commentId, postId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return
    }

    if (!currentUser?.userId) {
      alert("You must be logged in to delete comments.")
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
        throw new Error(errorText || "Failed to delete comment")
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
      alert(err.message || "Failed to delete comment. Please try again.")
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

  if (loading) {
    return (
      <div style={styles.container}>
        <div className="spinner"></div>
        <p className="text-center">Loading posts...</p>
      </div>
    )
  }

  return (
    <div style={styles.container} className="container">
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Travel Stories</h1>
        <p style={styles.subtitle}>Discover amazing travel experiences from our community</p>
      </div>

      {posts.length === 0 ? (
        <div className="card text-center">
          <h3>No posts found</h3>
          <p>Be the first to share your travel experience!</p>
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
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="badge badge-primary">Trip #{post.tripId}</span>
                </div>
              </div>

              <div style={styles.postContent}>
                <p>{post.content}</p>

                {post.mediaPaths && post.mediaPaths.length > 0 && (
                  <div style={styles.mediaContainer}>
                    {post.mediaPaths.map((mediaPath, index) => (
                      <div key={index} style={styles.mediaItem}>
                        <img
                          src={mediaPath || "/placeholder.svg"}
                          alt={`Travel memory ${index + 1}`}
                          style={styles.mediaImage}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {post.expenses && post.expenses.length > 0 && (
                  <div style={styles.expenseSection}>
                    <h4 style={styles.sectionTitle}>💰 Trip Expenses</h4>
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
                    <h4 style={styles.sectionTitle}>💬 Comments</h4>
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
                                title="Delete comment"
                              >
                                {deletingComments.has(comment.commentId) ? "..." : "🗑️"}
                              </button>
                            )}
                          </div>
                          {comment.createdAt && (
                            <div style={styles.commentDate}>
                              {new Date(comment.createdAt).toLocaleDateString("en-US", {
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
                      placeholder="Write a comment..."
                      value={commentInputs[post.postId] || ""}
                      onChange={(e) => handleInputChange(post.postId, e.target.value)}
                      style={styles.commentInput}
                    />
                    <button
                      onClick={() => handleCommentSubmit(post.postId)}
                      className="btn-primary"
                      style={styles.commentButton}
                    >
                      Post
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
  postContent: {
    padding: "0",
  },
  mediaContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px",
    margin: "16px 0",
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
