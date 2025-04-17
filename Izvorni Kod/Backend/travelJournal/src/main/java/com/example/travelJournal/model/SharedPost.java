package com.example.travelJournal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "SharedPost")
public class SharedPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Column(nullable = false)
    private String content;

    @Column(name = "createdAt", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private TJUser user;

    @ManyToOne
    @JoinColumn(name = "tripId", nullable = false)
    private Trip trip;

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public TJUser getUser() {
        return user;
    }

    public void setUser(TJUser user) {
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
