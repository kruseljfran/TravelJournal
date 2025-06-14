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
    private List<MediaDTO> mediaPaths; // Changed from List<String> to List<MediaDTO>
    private List<CommentDTO> comments;
    private List<ExpenseDTO> expenses;
    private List<LocationDTO> locations;

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

        // Map media with full MediaDTO objects (including locationId)
        this.mediaPaths = post.getTrip().getMediaList()
                .stream()
                .map(MediaDTO::new)
                .collect(Collectors.toList());

        // Map comments
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

        // Map expenses
        this.expenses = post.getTrip().getExpenses()
                .stream()
                .map(expense -> new ExpenseDTO(
                        expense.getCategory(),
                        expense.getAmount(),
                        expense.getCurrency(),
                        expense.getDescription()))
                .collect(Collectors.toList());

        // Map locations with WasLocation data and associated media
        this.locations = new ArrayList<>();

        // Get WasLocation entries for this trip
        List<WasLocation> wasLocations = post.getTrip().getWasLocations();

        if (wasLocations != null) {
            this.locations = wasLocations.stream()
                    .map(wasLocation -> {
                        // Get the location from WasLocation
                        var location = wasLocation.getLocation();

                        // Check if location is not null
                        if (location != null) {
                            LocationDTO locationDTO = new LocationDTO(
                                    location.getLocationId(),
                                    location.getName(),
//                                    location.getLatitude(),
//                                    location.getLongitude(),
                                    // Use the correct property names for Country and Place
                                    location.getCountry() != null ? location.getCountry().getCountryName() : null,
                                    location.getPlace() != null ? location.getPlace().getPlaceName() : null,
                                    wasLocation.getVisitedOn(),
                                    wasLocation.getNotes(),
                                    wasLocation.getVibeRating(),
                                    wasLocation.getFoodRating(),
                                    wasLocation.getWorthItRating()
                            );

                            // Add media associated with this location
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
                    .filter(locationDTO -> locationDTO != null) // Filter out null entries
                    .collect(Collectors.toList());
        }
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
