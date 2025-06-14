package com.example.travelJournal.repository;

import com.example.travelJournal.model.WasLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WasLocationRepository extends JpaRepository<WasLocation, Long> {
    List<WasLocation> findByTripTripId(Long tripId);
    List<WasLocation> findByLocationLocationId(Long locationId);
    List<WasLocation> findByTripTripIdOrderByVisitedOnDesc(Long tripId);

    @Query("SELECT wl FROM WasLocation wl WHERE wl.trip.tripId = :tripId AND wl.visitedOn BETWEEN :startDate AND :endDate")
    List<WasLocation> findByTripIdAndDateRange(@Param("tripId") Long tripId,
                                               @Param("startDate") LocalDate startDate,
                                               @Param("endDate") LocalDate endDate);

    @Query("SELECT wl FROM WasLocation wl WHERE wl.trip.tripId = :tripId AND wl.vibeRating >= :minRating")
    List<WasLocation> findByTripIdAndMinVibeRating(@Param("tripId") Long tripId, @Param("minRating") Integer minRating);

    Optional<WasLocation> findByTripTripIdAndLocationLocationId(Long tripId, Long locationId);
}
