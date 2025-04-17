package com.example.travelJournal.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Country")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long countryId;

    @Column(nullable = false)
    private String countryName;

    @Column(nullable = false)
    private Integer countryCode;

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public Integer getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(Integer countryCode) {
        this.countryCode = countryCode;
    }
}
