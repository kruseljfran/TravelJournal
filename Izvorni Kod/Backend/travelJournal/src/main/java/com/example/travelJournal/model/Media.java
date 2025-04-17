package com.example.travelJournal.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Media")
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mediaId;

    @Column(nullable = false)
    private String filePath;

    @Column(nullable = false)
    private String mediaType;

    @Column(nullable = false)
    private LocalDate uploadedAt;

    @ManyToOne
    @JoinColumn(name = "tripId", nullable = false)
    private Trip trip;

    @ManyToOne
    @JoinColumn(name = "locationId")
    private Location location;

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

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
