package com.example.travelJournal.dto;

import java.time.LocalDate;
import java.util.List;

import com.example.travelJournal.model.Location;
import com.example.travelJournal.model.WasLocation;

public class LocationDTO {
    private Long locationId;
    private String name;
    private String countryName;
    private String placeName;

    // WasLocation specific fields
    private LocalDate visitedOn;
    private String notes;
    private Integer vibeRating;
    private Integer foodRating;
    private Integer worthItRating;

    // Media associated with this location
    private List<MediaDTO> media;

    // Default constructor
    public LocationDTO() {}

    // Constructor with all parameters
    public LocationDTO(Long locationId, String name, String countryName, String placeName,
                       LocalDate visitedOn, String notes, Integer vibeRating, Integer foodRating,
                       Integer worthItRating) {
        this.locationId = locationId;
        this.name = name;
        this.countryName = countryName;
        this.placeName = placeName;
        this.visitedOn = visitedOn;
        this.notes = notes;
        this.vibeRating = vibeRating;
        this.foodRating = foodRating;
        this.worthItRating = worthItRating;
    }

    // Constructor for Location entity
    public LocationDTO(Location location) {
        this.locationId = location.getLocationId();
        this.name = location.getName();
        this.countryName = location.getCountry() != null ? location.getCountry().getCountryName() : null;
        this.placeName = location.getPlace() != null ? location.getPlace().getPlaceName() : null;
        // WasLocation fields will be null for basic Location
        this.visitedOn = null;
        this.notes = null;
        this.vibeRating = null;
        this.foodRating = null;
        this.worthItRating = null;
    }

    // Constructor for WasLocation entity
    public LocationDTO(WasLocation wasLocation) {
        if (wasLocation.getLocation() != null) {
            Location location = wasLocation.getLocation();
            this.locationId = location.getLocationId();
            this.name = location.getName();
            this.countryName = location.getCountry() != null ? location.getCountry().getCountryName() : null;
            this.placeName = location.getPlace() != null ? location.getPlace().getPlaceName() : null;
        }

        // WasLocation specific data
        this.visitedOn = wasLocation.getVisitedOn();
        this.notes = wasLocation.getNotes();
        this.vibeRating = wasLocation.getVibeRating();
        this.foodRating = wasLocation.getFoodRating();
        this.worthItRating = wasLocation.getWorthItRating();
    }

    // Getters and Setters
    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public List<MediaDTO> getMedia() {
        return media;
    }

    public void setMedia(List<MediaDTO> media) {
        this.media = media;
    }
}
