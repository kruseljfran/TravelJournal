package com.example.travelJournal.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.example.travelJournal.model.Expense;
import com.example.travelJournal.model.Media;
import com.example.travelJournal.model.SharedPost;
import com.example.travelJournal.model.WasLocation;

public class SharedPostDTO {
    private Long postId;
    private String content;
    private LocalDateTime createdAt;
    private String username;
    private Long userId;
    private Long tripId;
    private List<MediaDTO> mediaPaths;
    private List<CommentDTO> comments;
    private List<ExpenseDTO> expenses;
    private List<LocationDTO> locations;

    public SharedPostDTO() {}

    public SharedPostDTO(Long postId, String content, LocalDateTime createdAt, String username, Long userId, Long tripId) {
        this.postId = postId;
        this.content = content;
        this.createdAt = createdAt;
        this.username = username;
        this.userId = userId;
        this.tripId = tripId;
    }

    // konstruktor za sharedPost
    public SharedPostDTO(SharedPost post) {
        this.postId = post.getPostId();
        this.content = post.getContent();
        this.createdAt = post.getCreatedAt();
        this.username = post.getUser().getUsername();
        this.userId = post.getUser().getUserId();
        this.tripId = post.getTrip().getTripId();

        this.mediaPaths = post.getTrip().getMediaList()
                .stream()
                .map(MediaDTO::new)
                .collect(Collectors.toList());

        this.comments = post.getCommentList()
                .stream()
                .map(comment -> new CommentDTO(
                        comment.getCommentId(),
                        comment.getContent(),
                        comment.getCreatedAt(),
                        comment.getUser().getUsername(),
                        comment.getUser().getUserId(),
                        post.getPostId()
                ))
                .collect(Collectors.toList());

        // troskovi
        this.expenses = post.getTrip().getExpenses()
                .stream()
                .map(expense -> new ExpenseDTO(
                        expense.getCategory(),
                        expense.getAmount(),
                        expense.getCurrency(),
                        expense.getDescription()))
                .collect(Collectors.toList());

        this.locations = new ArrayList<>();

        List<WasLocation> wasLocations = post.getTrip().getWasLocations();

        if (wasLocations != null) {
            this.locations = wasLocations.stream()
                    .map(wasLocation -> {
                        // location za WasLocation
                        var location = wasLocation.getLocation();

                        if (location != null) {
                            LocationDTO locationDTO = new LocationDTO(
                                    location.getLocationId(),
                                    location.getName(),
                                    location.getCountry() != null ? location.getCountry().getCountryName() : null,
                                    location.getPlace() != null ? location.getPlace().getPlaceName() : null,
                                    wasLocation.getVisitedOn(),
                                    wasLocation.getNotes(),
                                    wasLocation.getVibeRating(),
                                    wasLocation.getFoodRating(),
                                    wasLocation.getWorthItRating()
                            );

                            // dodaj media za pojedinu lokaciju
                            List<MediaDTO> locationMedia = post.getTrip().getMediaList()
                                    .stream()
                                    .filter(media -> media.getLocation() != null &&
                                            media.getLocation().getLocationId().equals(location.getLocationId()))
                                    .map(MediaDTO::new)
                                    .collect(Collectors.toList());

                            locationDTO.setMedia(locationMedia);

                            return locationDTO;
                        } else {
                            return null;
                        }
                    })
                    .filter(locationDTO -> locationDTO != null)
                    .collect(Collectors.toList());
        }
    }

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

    public List<MediaDTO> getMediaPaths() {
        return mediaPaths;
    }

    public void setMediaPaths(List<MediaDTO> mediaPaths) {
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

    public List<LocationDTO> getLocations() {
        return locations;
    }

    public void setLocations(List<LocationDTO> locations) {
        this.locations = locations;
    }
}
