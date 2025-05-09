package com.example.travelJournal.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.example.travelJournal.model.Media;
import com.example.travelJournal.model.SharedPost;

public class SharedPostDTO {
    private Long postId;
    private String content;
    private LocalDateTime createdAt;
    private String username;
    private Long tripId;
    private List<String> mediaPaths;
    private List<CommentDTO> comments;

    public SharedPostDTO(SharedPost post) {
        this.postId = post.getPostId();
        this.content = post.getContent();
        this.createdAt = post.getCreatedAt();
        this.username = post.getUser().getUsername();
        this.tripId = post.getTrip().getTripId();
        this.mediaPaths = post.getTrip().getMediaList()
                .stream()
                .map(Media::getFilePath)
                .collect(Collectors.toList());
        this.comments = post.getCommentList()
                .stream()
                .map(comment -> new CommentDTO(
                        comment.getUser().getUsername(),
                        comment.getContent()))
                .collect(Collectors.toList());
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

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
}