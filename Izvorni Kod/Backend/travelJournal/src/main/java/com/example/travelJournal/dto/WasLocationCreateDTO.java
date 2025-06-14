package com.example.travelJournal.dto;

import java.time.LocalDate;

public class WasLocationCreateDTO {
    private Long tripId;
    private Long locationId;
    private LocalDate visitedOn;
    private String notes;
    private Integer vibeRating;
    private Integer foodRating;
    private Integer worthItRating;

    public WasLocationCreateDTO() {}

    public WasLocationCreateDTO(Long tripId, Long locationId, LocalDate visitedOn, String notes,
                                Integer vibeRating, Integer foodRating, Integer worthItRating) {
        this.tripId = tripId;
        this.locationId = locationId;
        this.visitedOn = visitedOn;
        this.notes = notes;
        this.vibeRating = vibeRating;
        this.foodRating = foodRating;
        this.worthItRating = worthItRating;
    }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }

    public Long getLocationId() { return locationId; }
    public void setLocationId(Long locationId) { this.locationId = locationId; }

    public LocalDate getVisitedOn() { return visitedOn; }
    public void setVisitedOn(LocalDate visitedOn) { this.visitedOn = visitedOn; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Integer getVibeRating() { return vibeRating; }
    public void setVibeRating(Integer vibeRating) { this.vibeRating = vibeRating; }

    public Integer getFoodRating() { return foodRating; }
    public void setFoodRating(Integer foodRating) { this.foodRating = foodRating; }

    public Integer getWorthItRating() { return worthItRating; }
    public void setWorthItRating(Integer worthItRating) { this.worthItRating = worthItRating; }
}
