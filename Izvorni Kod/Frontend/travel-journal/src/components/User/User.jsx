import React from 'react';

function User({ currentUser }) {
  // Check if currentUser exists
  if (!currentUser) {
    return <div>Loading profile...</div>;
  }

  return (
    <div style={styles.profileContainer}>
      <h1>User Profile</h1>
      <div style={styles.profileCard}>
        <div style={styles.profileHeader}>
          <h2>{currentUser.username}</h2>
          {/* Assuming there's a profile picture URL */}
          {currentUser.profilePicture && (
            <img
              src={currentUser.profilePicture}
              alt="Profile"
              style={styles.profileImage}
            />
          )}
        </div>

        <div style={styles.profileInfo}>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Joined on:</strong> {new Date(currentUser.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  profileContainer: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  profileCard: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginLeft: '20px',
  },
  profileInfo: {
    fontSize: '16px',
  },
};

export default User;
