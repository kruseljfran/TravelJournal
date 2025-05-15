import React, { useEffect, useState } from 'react';

function SharedPosts({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    console.log(currentUser);
    fetch('http://localhost:8080/api/shared-posts')
      .then(response => {
        if (!response.ok) throw new Error('Network error');
        return response.json();
      })
      .then(data => setPosts(data))
      .catch(error => console.error('Fetch error:', error));
  }, [currentUser]);

  const handleInputChange = (postId, value) => {
    setCommentInputs(prev => ({ ...prev, [postId]: value }));
  };

  const handleCommentSubmit = async (postId) => {
    const content = commentInputs[postId];
    if (!content || !currentUser?.userId) return;

    try {
      const response = await fetch('http://localhost:8080/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.userId,
          postId,
          content
        })
      });

      if (!response.ok) throw new Error('Failed to post comment');

      const updatedPosts = posts.map(post => {
        if (post.postId === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), {
              username: currentUser.username,
              content
            }]
          };
        }
        return post;
      });
      setPosts(updatedPosts);
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Shared Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map(post => (
          <div key={post.postId} style={styles.card}>
            <p><strong>{post.content}</strong></p>

            {post.mediaPaths && post.mediaPaths.length > 0 && (
              <div style={styles.mediaContainer}>
                {post.mediaPaths.map((mediaPath, index) => (
                  <div key={index} style={styles.mediaItem}>
                    {/* dodati video */}
                    <img src={mediaPath} alt={mediaPath} style={styles.mediaImage} />
                  </div>
                ))}
              </div>
            )}

            <p><strong>{post.username}</strong></p>
            <p><strong>{new Date(post.createdAt).toLocaleDateString()}</strong></p>

            {/* expenses */}
            {post.expenses && post.expenses.length > 0 && (
              <div style={styles.expenseSection}>
                <p><strong>Expenses:</strong></p>
                <ul style={styles.expenseList}>
                  {post.expenses.map((expense, index) => (
                    <li key={index} style={styles.expenseItem}>
                      <strong>{expense.category}</strong> - {expense.amount} {expense.currency}
                      {expense.description && `: ${expense.description}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* comments */}
            {post.comments && post.comments.length > 0 && (
              <div style={styles.commentSection}>
                <p><strong>Comments:</strong></p>
                <ul style={styles.commentList}>
                  {post.comments.map((comment, index) => (
                    <li key={index} style={styles.commentItem}>
                      <strong>{comment.username}:</strong> {comment.content}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* comment create */}
            <div style={{ marginTop: '10px' }}>
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentInputs[post.postId] || ''}
                onChange={e => handleInputChange(post.postId, e.target.value)}
                style={{ width: '70%', padding: '5px' }}
              />
              <button onClick={() => handleCommentSubmit(post.postId)} style={{ marginLeft: '10px' }}>
                Submit
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: 'auto'
  },
  card: {
    background: '#f4f4f4',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  mediaContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px'
  },
  mediaItem: {
    width: '100px',
    height: '100px',
    overflow: 'hidden'
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  commentSection: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    border: '1px solid #ddd'
  },
  commentList: {
    listStyleType: 'none',
    paddingLeft: 0
  },
  commentItem: {
    marginBottom: '5px'
  },
  expenseSection: {
  marginTop: '10px',
  padding: '10px',
  backgroundColor: '#eafbea',
  borderRadius: '5px',
  border: '1px solid #b3e6b3'
  },
  expenseList: {
    listStyleType: 'none',
    paddingLeft: 0,
    margin: 0
  },
  expenseItem: {
    marginBottom: '5px',
    fontSize: '14px'
  }
};

export default SharedPosts;
