package com.example.travelJournal.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.example.travelJournal.model.Expense;
import com.example.travelJournal.model.Media;
import com.example.travelJournal.model.SharedPost;

public class SharedPostDTO {
    private Long postId;
    private String content;
    private LocalDateTime createdAt;
    private String username;
    private Long userId;
    private Long tripId;
    private List<String> mediaPaths;
    private List<CommentDTO> comments;
    private List<ExpenseDTO> expenses;

    // Default constructor
    public SharedPostDTO() {}

    // Constructor for manual creation
    public SharedPostDTO(Long postId, String content, LocalDateTime createdAt, String username, Long userId, Long tripId) {
        this.postId = postId;
        this.content = content;
        this.createdAt = createdAt;
        this.username = username;
        this.userId = userId;
        this.tripId = tripId;
    }

    // Constructor from SharedPost entity
    public SharedPostDTO(SharedPost post) {
        this.postId = post.getPostId();
        this.content = post.getContent();
        this.createdAt = post.getCreatedAt();
        this.username = post.getUser().getUsername();
        this.userId = post.getUser().getUserId();
        this.tripId = post.getTrip().getTripId();

        this.mediaPaths = post.getTrip().getMediaList()
                .stream()
                .map(Media::getFilePath)
                .collect(Collectors.toList());

        // ✅ Fixed parameter order to match CommentDTO constructor
        this.comments = post.getCommentList()
                .stream()
                .map(comment -> new CommentDTO(
                        comment.getCommentId(),        // Long commentId
                        comment.getContent(),          // String content
                        comment.getCreatedAt(),        // LocalDateTime createdAt
                        comment.getUser().getUsername(), // String username
                        comment.getUser().getUserId(), // Long userId
                        post.getPostId()              // Long postId
                ))
                .collect(Collectors.toList());

        this.expenses = post.getTrip().getExpenses()
                .stream()
                .map(expense -> new ExpenseDTO(
                        expense.getCategory(),
                        expense.getAmount(),
                        expense.getCurrency(),
                        expense.getDescription()))
                .collect(Collectors.toList());
    }

    // Getters and Setters
    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
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

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public List<String> getMediaPaths() {
        return mediaPaths;
    }

    public void setMediaPaths(List<String> mediaPaths) {
        this.mediaPaths = mediaPaths;
    }

    public List<CommentDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentDTO> comments) {
        this.comments = comments;
    }

    public List<ExpenseDTO> getExpenses() {
        return expenses;
    }

    public void setExpenses(List<ExpenseDTO> expenses) {
        this.expenses = expenses;
    }
}
