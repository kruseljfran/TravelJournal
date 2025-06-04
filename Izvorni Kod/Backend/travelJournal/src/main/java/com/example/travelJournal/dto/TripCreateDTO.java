package com.example.travelJournal.dto;

import java.time.LocalDate;

public class TripCreateDTO {
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer totalCost;

    public TripCreateDTO() {}

    public TripCreateDTO(String title, String description, LocalDate startDate, LocalDate endDate, Integer totalCost) {
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalCost = totalCost;
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
}
