package com.example.travelJournal.service;

import com.example.travelJournal.dto.LocationCreateDTO;
import com.example.travelJournal.dto.LocationDTO;
import com.example.travelJournal.dto.WasLocationCreateDTO;
import com.example.travelJournal.model.*;
import com.example.travelJournal.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private WasLocationRepository wasLocationRepository;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private PlaceRepository placeRepository;

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    public List<Place> getPlacesByCountry(Long countryId) {
        return placeRepository.findByCountryCountryId(countryId);
    }

    public List<LocationDTO> getLocationsByTripId(Long tripId) {
        try {
            List<WasLocation> wasLocations = wasLocationRepository.findByTripTripId(tripId);
            System.out.println("Found " + wasLocations.size() + " locations for trip ID: " + tripId);

            return wasLocations.stream()
                    .map(wasLocation -> {
                        try {
                            return new LocationDTO(wasLocation);
                        } catch (Exception e) {
                            System.err.println("Error creating LocationDTO for WasLocation (Trip: " +
                                    (wasLocation != null && wasLocation.getTrip() != null ? wasLocation.getTrip().getTripId() : "null") +
                                    ", Location: " + (wasLocation != null && wasLocation.getLocation() != null ? wasLocation.getLocation().getLocationId() : "null") +
                                    "), Error: " + e.getMessage());
                            e.printStackTrace();
                            LocationDTO dto = new LocationDTO();
                            if (wasLocation != null && wasLocation.getLocation() != null) {
                                dto.setLocationId(wasLocation.getLocation().getLocationId());
                                dto.setName(wasLocation.getLocation().getName());
                            }
                            return dto;
                        }
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error fetching locations for trip " + tripId + ": " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch locations for trip: " + e.getMessage());
        }
    }

    public Long createLocation(LocationCreateDTO locationCreateDTO, Long userId) {
        try {
            Location location = new Location();
            location.setName(locationCreateDTO.getName());

            location.setLatitude("");
            location.setLongitude("");

            // id i ime za kreaciju
            if (locationCreateDTO.getCountryId() != null) {
                Country country = countryRepository.findById(locationCreateDTO.getCountryId())
                        .orElse(null);
                if (country == null) {
                    System.out.println("Country not found with ID: " + locationCreateDTO.getCountryId());
                }
                location.setCountry(country);
            } else if (locationCreateDTO.getCountryName() != null && !locationCreateDTO.getCountryName().trim().isEmpty()) {
                Country country = countryRepository.findByCountryName(locationCreateDTO.getCountryName().trim())
                        .orElse(null);
                if (country == null) {
                    System.out.println("Country not found: " + locationCreateDTO.getCountryName());
                }
                location.setCountry(country);
            }

            if (locationCreateDTO.getPlaceId() != null) {
                Place place = placeRepository.findById(locationCreateDTO.getPlaceId())
                        .orElse(null);
                if (place == null) {
                    System.out.println("Place not found with ID: " + locationCreateDTO.getPlaceId());
                }
                location.setPlace(place);
            } else if (locationCreateDTO.getPlaceName() != null && !locationCreateDTO.getPlaceName().trim().isEmpty()) {
                Place place = placeRepository.findByPlaceName(locationCreateDTO.getPlaceName().trim())
                        .orElse(null);
                if (place == null) {
                    System.out.println("Place not found: " + locationCreateDTO.getPlaceName());
                }
                location.setPlace(place);
            }

            Location savedLocation = locationRepository.save(location);
            System.out.println("Location created successfully with ID: " + savedLocation.getLocationId() +
                    ", Country: " + (savedLocation.getCountry() != null ? savedLocation.getCountry().getCountryName() : "null") +
                    ", Place: " + (savedLocation.getPlace() != null ? savedLocation.getPlace().getPlaceName() : "null"));
            return savedLocation.getLocationId();
        } catch (Exception e) {
            System.err.println("Error creating location: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to create location: " + e.getMessage());
        }
    }

    public WasLocation addTripLocation(WasLocationCreateDTO wasLocationCreateDTO, Long userId) {
        try {
            Trip trip = tripRepository.findById(wasLocationCreateDTO.getTripId())
                    .orElseThrow(() -> new RuntimeException("Trip not found"));

            if (!trip.getUser().getUserId().equals(userId)) {
                throw new RuntimeException("Unauthorized to add location to this trip");
            }

            Location location = locationRepository.findById(wasLocationCreateDTO.getLocationId())
                    .orElseThrow(() -> new RuntimeException("Location not found"));

            WasLocation wasLocation = new WasLocation();
            wasLocation.setTrip(trip);
            wasLocation.setLocation(location);
            wasLocation.setVisitedOn(wasLocationCreateDTO.getVisitedOn());
            wasLocation.setNotes(wasLocationCreateDTO.getNotes());
            wasLocation.setVibeRating(wasLocationCreateDTO.getVibeRating());
            wasLocation.setFoodRating(wasLocationCreateDTO.getFoodRating());
            wasLocation.setWorthItRating(wasLocationCreateDTO.getWorthItRating());

            return wasLocationRepository.save(wasLocation);
        } catch (Exception e) {
            System.err.println("Error adding trip location: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to add location to trip: " + e.getMessage());
        }
    }

    public void removeTripLocation(Long tripId, Long locationId, Long userId) {
        try {
            Trip trip = tripRepository.findById(tripId)
                    .orElseThrow(() -> new RuntimeException("Trip not found"));

            if (!trip.getUser().getUserId().equals(userId)) {
                throw new RuntimeException("Unauthorized to remove location from this trip");
            }

            WasLocation wasLocation = wasLocationRepository.findByTripTripIdAndLocationLocationId(tripId, locationId)
                    .orElseThrow(() -> new RuntimeException("Location visit not found"));

            wasLocationRepository.delete(wasLocation);
        } catch (Exception e) {
            System.err.println("Error removing trip location: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to remove location from trip: " + e.getMessage());
        }
    }

    public LocationDTO updateLocation(Long locationId, LocationCreateDTO locationCreateDTO, Long userId) {
        try {
            Location location = locationRepository.findById(locationId)
                    .orElseThrow(() -> new RuntimeException("Location not found"));

            location.setName(locationCreateDTO.getName());

            if (locationCreateDTO.getCountryId() != null) {
                Country country = countryRepository.findById(locationCreateDTO.getCountryId())
                        .orElse(null);
                location.setCountry(country);
            } else if (locationCreateDTO.getCountryName() != null && !locationCreateDTO.getCountryName().trim().isEmpty()) {
                Country country = countryRepository.findByCountryName(locationCreateDTO.getCountryName().trim())
                        .orElse(null);
                location.setCountry(country);
            } else {
                location.setCountry(null);
            }

            if (locationCreateDTO.getPlaceId() != null) {
                Place place = placeRepository.findById(locationCreateDTO.getPlaceId())
                        .orElse(null);
                location.setPlace(place);
            } else if (locationCreateDTO.getPlaceName() != null && !locationCreateDTO.getPlaceName().trim().isEmpty()) {
                Place place = placeRepository.findByPlaceName(locationCreateDTO.getPlaceName().trim())
                        .orElse(null);
                location.setPlace(place);
            } else {
                location.setPlace(null);
            }

            Location savedLocation = locationRepository.save(location);
            System.out.println("Location updated successfully with ID: " + savedLocation.getLocationId());

            return new LocationDTO(savedLocation);
        } catch (Exception e) {
            System.err.println("Error updating location: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to update location: " + e.getMessage());
        }
    }

    public LocationDTO updateTripLocation(Long tripId, Long locationId, WasLocationCreateDTO wasLocationCreateDTO, Long userId) {
        try {
            Trip trip = tripRepository.findById(tripId)
                    .orElseThrow(() -> new RuntimeException("Trip not found"));

            if (!trip.getUser().getUserId().equals(userId)) {
                throw new RuntimeException("Unauthorized to update location in this trip");
            }

            WasLocation wasLocation = wasLocationRepository.findByTripTripIdAndLocationLocationId(tripId, locationId)
                    .orElseThrow(() -> new RuntimeException("Location visit not found"));

            // update wasLocation detail
            wasLocation.setVisitedOn(wasLocationCreateDTO.getVisitedOn());
            wasLocation.setNotes(wasLocationCreateDTO.getNotes());
            wasLocation.setVibeRating(wasLocationCreateDTO.getVibeRating());
            wasLocation.setFoodRating(wasLocationCreateDTO.getVibeRating());
            wasLocation.setWorthItRating(wasLocationCreateDTO.getWorthItRating());

            WasLocation savedWasLocation = wasLocationRepository.save(wasLocation);
            System.out.println("Trip location updated successfully for trip " + tripId + " and location " + locationId);

            return new LocationDTO(savedWasLocation);
        } catch (Exception e) {
            System.err.println("Error updating trip location: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to update trip location: " + e.getMessage());
        }
    }
}
