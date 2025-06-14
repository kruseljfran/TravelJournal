package com.example.travelJournal.dto;

public class LocationCreateDTO {
    private String name;
    private Long countryId;
    private Long placeId;
    // Keep the old fields for backward compatibility
    private String countryName;
    private String placeName;

    public LocationCreateDTO() {}

    public LocationCreateDTO(String name, Long countryId, Long placeId) {
        this.name = name;
        this.countryId = countryId;
        this.placeId = placeId;
    }

    // Legacy constructor for backward compatibility
    public LocationCreateDTO(String name, String countryName, String placeName) {
        this.name = name;
        this.countryName = countryName;
        this.placeName = placeName;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getCountryId() { return countryId; }
    public void setCountryId(Long countryId) { this.countryId = countryId; }

    public Long getPlaceId() { return placeId; }
    public void setPlaceId(Long placeId) { this.placeId = placeId; }

    // Keep legacy methods for backward compatibility
    public String getCountryName() { return countryName; }
    public void setCountryName(String countryName) { this.countryName = countryName; }

    public String getPlaceName() { return placeName; }
    public void setPlaceName(String placeName) { this.placeName = placeName; }
}
