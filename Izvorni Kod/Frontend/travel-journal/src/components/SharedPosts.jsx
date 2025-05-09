import React, { useEffect, useState } from 'react';

function SharedPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/shared-posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network error');
        }
        return response.json();
      })
      .then(data => setPosts(data))
      .catch(error => console.error('Fetch error:', error));
  }, []);

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

            {/* komentari */}
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
  }
};

export default SharedPosts;
