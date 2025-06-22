package com.example.travelJournal.service;

import com.example.travelJournal.model.SharedPost;
import com.example.travelJournal.model.TJUser;
import com.example.travelJournal.model.Trip;
import com.example.travelJournal.repository.SharedPostRepository;
import com.example.travelJournal.repository.TJUserRepository;
import com.example.travelJournal.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SharedPostService {

    @Autowired
    private SharedPostRepository sharedPostRepository;

    @Autowired
    private TJUserRepository userRepository;

    @Autowired
    private TripRepository tripRepository;

    public List<SharedPost> getAllPosts() {
        return sharedPostRepository.findAll();
    }

    public Optional<SharedPost> getPostById(Long postId) {
        return sharedPostRepository.findById(postId);
    }

    public List<SharedPost> getPostsByUserId(Long userId) {
        return sharedPostRepository.findByUserUserId(userId);
    }

    public List<SharedPost> getPostsByTripId(Long tripId) {
        return sharedPostRepository.findByTripTripId(tripId);
    }

    public SharedPost createPost(SharedPost post) {
        if (post.getUser() != null && post.getUser().getUserId() != null) {
            TJUser user = userRepository.findById(post.getUser().getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            post.setUser(user);
        }

        if (post.getTrip() != null && post.getTrip().getTripId() != null) {
            Trip trip = tripRepository.findById(post.getTrip().getTripId())
                    .orElseThrow(() -> new RuntimeException("Trip not found"));
            post.setTrip(trip);
        }

        if (post.getCreatedAt() == null) {
            post.setCreatedAt(LocalDateTime.now());
        }

        return sharedPostRepository.save(post);
    }

    public SharedPost updatePost(Long postId, SharedPost postDetails) {
        return sharedPostRepository.findById(postId)
                .map(post -> {
                    post.setContent(postDetails.getContent());

                    if (postDetails.getCreatedAt() != null) {
                        post.setCreatedAt(postDetails.getCreatedAt());
                    }

                    if (postDetails.getTrip() != null && postDetails.getTrip().getTripId() != null) {
                        Trip trip = tripRepository.findById(postDetails.getTrip().getTripId())
                                .orElseThrow(() -> new RuntimeException("Trip not found"));
                        post.setTrip(trip);
                    }

                    if (postDetails.getUser() != null && postDetails.getUser().getUserId() != null) {
                        TJUser user = userRepository.findById(postDetails.getUser().getUserId())
                                .orElseThrow(() -> new RuntimeException("User not found"));
                        post.setUser(user);
                    }

                    return sharedPostRepository.save(post);
                }).orElseThrow(() -> new RuntimeException("Post not found with id " + postId));
    }

    public void deletePost(Long postId) {
        sharedPostRepository.deleteById(postId);
    }
}
