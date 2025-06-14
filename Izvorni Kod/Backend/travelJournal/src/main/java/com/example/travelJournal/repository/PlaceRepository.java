package com.example.travelJournal.repository;

import com.example.travelJournal.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    Optional<Place> findByPlaceName(String placeName);
    List<Place> findByCountryCountryId(Long countryId);
    List<Place> findByPlaceNameContainingIgnoreCase(String placeName);
}
