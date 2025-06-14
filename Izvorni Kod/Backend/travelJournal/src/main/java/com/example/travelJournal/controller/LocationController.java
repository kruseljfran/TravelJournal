package com.example.travelJournal.controller;

import com.example.travelJournal.dto.LocationCreateDTO;
import com.example.travelJournal.dto.LocationDTO;
import com.example.travelJournal.dto.WasLocationCreateDTO;
import com.example.travelJournal.model.Country;
import com.example.travelJournal.model.Location;
import com.example.travelJournal.model.Place;
import com.example.travelJournal.model.WasLocation;
import com.example.travelJournal.service.LocationService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping("/countries")
    public List<Country> getAllCountries() {
        return locationService.getAllCountries();
    }

    @GetMapping("/places")
    public List<Place> getAllPlaces() {
        return locationService.getAllPlaces();
    }

    @GetMapping("/places/country/{countryId}")
    public List<Place> getPlacesByCountry(@PathVariable Long countryId) {
        return locationService.getPlacesByCountry(countryId);
    }

    @GetMapping("/trip/{tripId}")
    public List<LocationDTO> getLocationsByTripId(@PathVariable Long tripId) {
        return locationService.getLocationsByTripId(tripId);
    }

    @PostMapping
    public ResponseEntity<Long> createLocation(@RequestBody LocationCreateDTO locationCreateDTO, HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            System.out.println("Creating location with data: " + locationCreateDTO.getName() +
                    ", countryId: " + locationCreateDTO.getCountryId() +
                    ", placeId: " + locationCreateDTO.getPlaceId() +
                    ", countryName: " + locationCreateDTO.getCountryName() +
                    ", placeName: " + locationCreateDTO.getPlaceName());

            Long locationId = locationService.createLocation(locationCreateDTO, (Long) userId);
            return ResponseEntity.ok(locationId);
        } catch (RuntimeException e) {
            System.err.println("Error in createLocation controller: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{locationId}")
    public ResponseEntity<LocationDTO> updateLocation(@PathVariable Long locationId, @RequestBody LocationCreateDTO locationCreateDTO, HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            System.out.println("Updating location " + locationId + " with data: " + locationCreateDTO.getName() +
                    ", countryId: " + locationCreateDTO.getCountryId() +
                    ", placeId: " + locationCreateDTO.getPlaceId());
            LocationDTO updatedLocation = locationService.updateLocation(locationId, locationCreateDTO, (Long) userId);
            return ResponseEntity.ok(updatedLocation);
        } catch (RuntimeException e) {
            System.err.println("Error in updateLocation controller: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/visit")
    public ResponseEntity<LocationDTO> addTripLocation(@RequestBody WasLocationCreateDTO wasLocationCreateDTO, HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            WasLocation wasLocation = locationService.addTripLocation(wasLocationCreateDTO, (Long) userId);
            return ResponseEntity.ok(new LocationDTO(wasLocation));
        } catch (RuntimeException e) {
            System.err.println("Error in addTripLocation controller: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/visit/{tripId}/{locationId}")
    public ResponseEntity<LocationDTO> updateTripLocation(@PathVariable Long tripId, @PathVariable Long locationId, @RequestBody WasLocationCreateDTO wasLocationCreateDTO, HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            System.out.println("Updating trip location for trip " + tripId + " and location " + locationId);
            LocationDTO updatedLocation = locationService.updateTripLocation(tripId, locationId, wasLocationCreateDTO, (Long) userId);
            return ResponseEntity.ok(updatedLocation);
        } catch (RuntimeException e) {
            System.err.println("Error in updateTripLocation controller: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/visit/{tripId}/{locationId}")
    public ResponseEntity<Void> removeTripLocation(@PathVariable Long tripId, @PathVariable Long locationId, HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            locationService.removeTripLocation(tripId, locationId, (Long) userId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            System.err.println("Error in removeTripLocation controller: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
