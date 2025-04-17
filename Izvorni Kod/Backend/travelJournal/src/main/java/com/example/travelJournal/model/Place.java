package com.example.travelJournal.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Place")
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeId;

    @Column(nullable = false)
    private String placeName;

    @Column(nullable = false)
    private Integer placePostalCode;

    @ManyToOne
    @JoinColumn(name = "countryId", nullable = false)
    private Country country;

    public Long getPlaceId() {
        return placeId;
    }

    public void setPlaceId(Long placeId) {
        this.placeId = placeId;
    }

    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Integer getPlacePostalCode() {
        return placePostalCode;
    }

    public void setPlacePostalCode(Integer placePostalCode) {
        this.placePostalCode = placePostalCode;
    }
}
