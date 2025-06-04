package com.example.travelJournal.controller;

import com.example.travelJournal.dto.SharedPostDTO;
import com.example.travelJournal.model.SharedPost;
import com.example.travelJournal.service.SharedPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/shared-posts")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SharedPostController {

    @Autowired
    private SharedPostService sharedPostService;

    @GetMapping
    public List<SharedPostDTO> getAllPosts() {
        return sharedPostService.getAllPosts()
                .stream()
                .map(SharedPostDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SharedPostDTO> getPostById(@PathVariable Long id) {
        Optional<SharedPost> post = sharedPostService.getPostById(id);
        return post.map(p -> ResponseEntity.ok(new SharedPostDTO(p)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<SharedPostDTO> getPostsByUserId(@PathVariable Long userId) {
        return sharedPostService.getPostsByUserId(userId)
                .stream()
                .map(SharedPostDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/trip/{tripId}")
    public List<SharedPostDTO> getPostsByTripId(@PathVariable Long tripId) {
        return sharedPostService.getPostsByTripId(tripId)
                .stream()
                .map(SharedPostDTO::new)
                .collect(Collectors.toList());
    }

    // Keep POST/PUT returning full entity if needed for admin/dev use
    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody SharedPost post) {
        try {
            SharedPost createdPost = sharedPostService.createPost(post);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating post: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody SharedPost postDetails) {
        try {
            SharedPost updatedPost = sharedPostService.updatePost(id, postDetails);
            return ResponseEntity.ok(updatedPost);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error updating post: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        sharedPostService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
