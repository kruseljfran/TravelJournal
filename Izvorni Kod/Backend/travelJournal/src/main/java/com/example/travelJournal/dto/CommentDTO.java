package com.example.travelJournal.dto;

import java.time.LocalDateTime;

public class CommentDTO {
    private Long commentId;
    private String content;
    private LocalDateTime createdAt;
    private String username;
    private Long userId;
    private Long postId;

    // Constructors
    public CommentDTO() {}

    public CommentDTO(Long commentId, String content, LocalDateTime createdAt, String username, Long userId, Long postId) {
        this.commentId = commentId;
        this.content = content;
        this.createdAt = createdAt;
        this.username = username;
        this.userId = userId;
        this.postId = postId;
    }

    // Getters and Setters
    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }
}
