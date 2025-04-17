package com.example.travelJournal.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String latitude;

    @Column(nullable = false)
    private String longitude;

    @ManyToOne
    @JoinColumn(name = "placeId")
    private Place place;

    @ManyToOne
    @JoinColumn(name = "countryId")
    private Country country;

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

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public Place getPlace() {
        return place;
    }

    public void setPlace(Place place) {
        this.place = place;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
}
