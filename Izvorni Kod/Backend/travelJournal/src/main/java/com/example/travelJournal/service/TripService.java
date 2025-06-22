package com.example.travelJournal.service;

import com.example.travelJournal.dto.TripCreateDTO;
import com.example.travelJournal.model.Trip;
import com.example.travelJournal.model.TJUser;
import com.example.travelJournal.repository.TripRepository;
import com.example.travelJournal.repository.TJUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private TJUserRepository userRepository;

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    public Optional<Trip> getTripById(Long id) {
        return tripRepository.findById(id);
    }

    public List<Trip> getTripsByUserId(Long userId) {
        return tripRepository.findByUserUserId(userId);
    }

    public Trip createTrip(TripCreateDTO tripCreateDTO, Long userId) {
        TJUser user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Trip trip = new Trip();
        trip.setTitle(tripCreateDTO.getTitle());
        trip.setDescription(tripCreateDTO.getDescription());
        trip.setStartDate(tripCreateDTO.getStartDate());
        trip.setEndDate(tripCreateDTO.getEndDate());
        trip.setTotalCost(tripCreateDTO.getTotalCost());
        trip.setUser(user);
        trip.setCreatedAt(LocalDateTime.now());

        return tripRepository.save(trip);
    }

    public Trip updateTrip(Long tripId, TripCreateDTO tripUpdateDTO, Long userId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        if (!trip.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to update this trip");
        }

        trip.setTitle(tripUpdateDTO.getTitle());
        trip.setDescription(tripUpdateDTO.getDescription());
        trip.setStartDate(tripUpdateDTO.getStartDate());
        trip.setEndDate(tripUpdateDTO.getEndDate());
        trip.setTotalCost(tripUpdateDTO.getTotalCost());

        return tripRepository.save(trip);
    }

    public void deleteTrip(Long tripId, Long userId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        if (!trip.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to delete this trip");
        }

        tripRepository.delete(trip);
    }
}
