package com.example.travelJournal.repository;

import com.example.travelJournal.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
    Optional<Country> findByCountryName(String countryName);
    Optional<Country> findByCountryCode(Integer countryCode);
}
