package com.example.travelJournal.service;

import com.example.travelJournal.dto.MediaCreateDTO;
import com.example.travelJournal.model.Media;
import com.example.travelJournal.model.Trip;
import com.example.travelJournal.model.Location;
import com.example.travelJournal.repository.MediaRepository;
import com.example.travelJournal.repository.TripRepository;
import com.example.travelJournal.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MediaService {

    @Autowired
    private MediaRepository mediaRepository;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private LocationRepository locationRepository;

    public List<Media> getMediaByTripId(Long tripId) {
        return mediaRepository.findByTripTripId(tripId);
    }

    public Media createMedia(MediaCreateDTO mediaCreateDTO, Long userId) {
        Trip trip = tripRepository.findById(mediaCreateDTO.getTripId())
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        if (!trip.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to add media to this trip");
        }

        Media media = new Media();
        media.setFilePath(mediaCreateDTO.getFilePath());
        media.setMediaType(mediaCreateDTO.getMediaType());
        media.setUploadedAt(LocalDate.now());
        media.setTrip(trip);

        if (mediaCreateDTO.getLocationId() != null) {
            Location location = locationRepository.findById(mediaCreateDTO.getLocationId())
                    .orElseThrow(() -> new RuntimeException("Location not found"));
            media.setLocation(location);
        }

        return mediaRepository.save(media);
    }

    public void deleteMedia(Long mediaId, Long userId) {
        Media media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new RuntimeException("Media not found"));

        if (!media.getTrip().getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to delete this media");
        }

        mediaRepository.delete(media);
    }
}
