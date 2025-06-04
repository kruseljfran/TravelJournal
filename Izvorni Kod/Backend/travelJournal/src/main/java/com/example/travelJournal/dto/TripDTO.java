package com.example.travelJournal.dto;

import com.example.travelJournal.model.Trip;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class TripDTO {
    private Long tripId;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer totalCost;
    private LocalDateTime createdAt;
    private String username;
    private Long userId;

    public TripDTO(Trip trip) {
        this.tripId = trip.getTripId();
        this.title = trip.getTitle();
        this.description = trip.getDescription();
        this.startDate = trip.getStartDate();
        this.endDate = trip.getEndDate();
        this.totalCost = trip.getTotalCost();
        this.createdAt = trip.getCreatedAt();
        this.username = trip.getUser().getUsername();
        this.userId = trip.getUser().getUserId();
    }

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Integer totalCost) {
        this.totalCost = totalCost;
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
}
