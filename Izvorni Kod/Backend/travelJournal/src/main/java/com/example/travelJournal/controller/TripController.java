package com.example.travelJournal.controller;

import com.example.travelJournal.dto.TripCreateDTO;
import com.example.travelJournal.dto.TripDTO;
import com.example.travelJournal.model.Trip;
import com.example.travelJournal.service.TripService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TripController {

    @Autowired
    private TripService tripService;

    @GetMapping
    public List<TripDTO> getAllTrips() {
        return tripService.getAllTrips()
                .stream()
                .map(TripDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripDTO> getTripById(@PathVariable Long id) {
        Optional<Trip> trip = tripService.getTripById(id);
        return trip.map(t -> ResponseEntity.ok(new TripDTO(t)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<TripDTO> getTripsByUserId(@PathVariable Long userId) {
        return tripService.getTripsByUserId(userId)
                .stream()
                .map(TripDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/my-trips")
    public ResponseEntity<List<TripDTO>> getMyTrips(HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        List<TripDTO> trips = tripService.getTripsByUserId((Long) userId)
                .stream()
                .map(TripDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(trips);
    }

    @PostMapping
    public ResponseEntity<TripDTO> createTrip(@RequestBody TripCreateDTO tripCreateDTO, HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            Trip createdTrip = tripService.createTrip(tripCreateDTO, (Long) userId);
            return ResponseEntity.ok(new TripDTO(createdTrip));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TripDTO> updateTrip(@PathVariable Long id, @RequestBody TripCreateDTO tripUpdateDTO, HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            Trip updatedTrip = tripService.updateTrip(id, tripUpdateDTO, (Long) userId);
            return ResponseEntity.ok(new TripDTO(updatedTrip));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id, HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            tripService.deleteTrip(id, (Long) userId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
