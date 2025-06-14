package com.example.travelJournal.dto;

public class MediaCreateDTO {
    private String filePath;
    private String mediaType;
    private Long tripId;
    private Long locationId;

    public MediaCreateDTO() {}

    public MediaCreateDTO(String filePath, String mediaType, Long tripId, Long locationId) {
        this.filePath = filePath;
        this.mediaType = mediaType;
        this.tripId = tripId;
        this.locationId = locationId;
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

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }
}
