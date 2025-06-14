package com.example.travelJournal.dto;

import com.example.travelJournal.model.Media;
import java.time.LocalDate;

public class MediaDTO {
    private Long mediaId;
    private String filePath;
    private String mediaType;
    private LocalDate uploadedAt;
    private Long tripId;
    private String tripTitle;
    private Long locationId;
    private String locationName;
    private String countryName;
    private String placeName;

    // Default constructor
    public MediaDTO() {}

    // Constructor from Media entity
    public MediaDTO(Media media) {
        this.mediaId = media.getMediaId();
        this.filePath = media.getFilePath();
        this.mediaType = media.getMediaType();
        this.uploadedAt = media.getUploadedAt();

        if (media.getTrip() != null) {
            this.tripId = media.getTrip().getTripId();
            this.tripTitle = media.getTrip().getTitle();
        }

        if (media.getLocation() != null) {
            this.locationId = media.getLocation().getLocationId();
            this.locationName = media.getLocation().getName();

            if (media.getLocation().getCountry() != null) {
                this.countryName = media.getLocation().getCountry().getCountryName();
            }

            if (media.getLocation().getPlace() != null) {
                this.placeName = media.getLocation().getPlace().getPlaceName();
            }
        }
    }

    // Getters and Setters
    public Long getMediaId() {
        return mediaId;
    }

    public void setMediaId(Long mediaId) {
        this.mediaId = mediaId;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public LocalDate getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDate uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public String getTripTitle() {
        return tripTitle;
    }

    public void setTripTitle(String tripTitle) {
        this.tripTitle = tripTitle;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }
}
