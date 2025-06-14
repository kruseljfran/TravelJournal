package com.example.travelJournal.repository;

import com.example.travelJournal.model.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {
    List<Media> findByTripTripId(Long tripId);
    List<Media> findByLocationLocationId(Long locationId);
    List<Media> findByTripTripIdAndMediaType(Long tripId, String type);
    List<Media> findByTripTripIdOrderByUploadedAtDesc(Long tripId);
}
