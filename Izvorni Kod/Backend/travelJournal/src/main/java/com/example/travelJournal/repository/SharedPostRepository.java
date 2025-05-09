package com.example.travelJournal.repository;

import com.example.travelJournal.model.SharedPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SharedPostRepository extends JpaRepository<SharedPost, Long> {
    List<SharedPost> findByUserUserId(Long userId);
    List<SharedPost> findByTripTripId(Long tripId);
}
