package com.example.travelJournal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "TJUser")
public class TJUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String passwordhash;

    private String profilepicture;

    private String bio;

    @Column(nullable = false)
    private String role;

    @Column(name = "createdAt", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordhash;
    }

    public String getProfilePicture() {
        return profilepicture;
    }

    public String getBio() {
        return bio;
    }

    public String getRole() {
        return role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordhash = passwordHash;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilepicture = profilePicture;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
