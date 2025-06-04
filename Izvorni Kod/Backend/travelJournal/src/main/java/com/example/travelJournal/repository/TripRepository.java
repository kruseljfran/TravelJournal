package com.example.travelJournal.repository;

import com.example.travelJournal.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByUserUserId(Long userId);
    List<Trip> findByUserUserIdOrderByCreatedAtDesc(Long userId);
}
