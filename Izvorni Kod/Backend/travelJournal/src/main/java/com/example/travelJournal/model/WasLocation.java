package com.example.travelJournal.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "wasLocation")
public class WasLocation {

    @Id
    @ManyToOne
    @JoinColumn(name = "tripId", nullable = false)
    private Trip trip;

    @Id
    @ManyToOne
    @JoinColumn(name = "locationId", nullable = false)
    private Location location;

    @Column(nullable = false)
    private java.time.LocalDate visitedOn;

    @Column(nullable = false)
    private String notes;

    @Column(nullable = false)
    private Integer vibeRating;

    @Column(nullable = false)
    private Integer foodRating;

    @Column(nullable = false)
    private Integer worthItRating;

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

    public LocalDate getVisitedOn() {
        return visitedOn;
    }

    public void setVisitedOn(LocalDate visitedOn) {
        this.visitedOn = visitedOn;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Integer getVibeRating() {
        return vibeRating;
    }

    public void setVibeRating(Integer vibeRating) {
        this.vibeRating = vibeRating;
    }

    public Integer getFoodRating() {
        return foodRating;
    }

    public void setFoodRating(Integer foodRating) {
        this.foodRating = foodRating;
    }

    public Integer getWorthItRating() {
        return worthItRating;
    }

    public void setWorthItRating(Integer worthItRating) {
        this.worthItRating = worthItRating;
    }
}
