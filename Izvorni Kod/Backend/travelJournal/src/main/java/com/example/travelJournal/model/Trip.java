package com.example.travelJournal.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Trip")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tripId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(name = "startDate", nullable = false)
    private LocalDate startDate;

    @Column(name = "endDate", nullable = false)
    private LocalDate endDate;

    @Column(name = "totalCost", nullable = false)
    private Integer totalCost;

    @Column(name = "createdAt", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private TJUser user;

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

    public TJUser getUser() {
        return user;
    }

    public void setUser(TJUser user) {
        this.user = user;
    }
}

