package com.example.travelJournal.controller;

import com.example.travelJournal.dto.MediaCreateDTO;
import com.example.travelJournal.dto.MediaDTO;
import com.example.travelJournal.model.Media;
import com.example.travelJournal.service.MediaService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/media")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class MediaController {

    @Autowired
    private MediaService mediaService;

    @GetMapping("/trip/{tripId}")
    public List<MediaDTO> getMediaByTripId(@PathVariable Long tripId) {
        return mediaService.getMediaByTripId(tripId)
                .stream()
                .map(MediaDTO::new)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<MediaDTO> createMedia(@RequestBody MediaCreateDTO mediaCreateDTO, HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            Media createdMedia = mediaService.createMedia(mediaCreateDTO, (Long) userId);
            return ResponseEntity.ok(new MediaDTO(createdMedia));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedia(@PathVariable Long id, HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            mediaService.deleteMedia(id, (Long) userId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
