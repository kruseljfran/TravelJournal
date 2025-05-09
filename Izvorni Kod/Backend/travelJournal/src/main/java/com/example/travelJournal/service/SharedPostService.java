package com.example.travelJournal.service;

import com.example.travelJournal.model.SharedPost;
import com.example.travelJournal.repository.SharedPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SharedPostService {

    @Autowired
    private SharedPostRepository sharedPostRepository;

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
        return sharedPostRepository.save(post);
    }

    public SharedPost updatePost(Long postId, SharedPost postDetails) {
        return sharedPostRepository.findById(postId)
                .map(post -> {
                    post.setContent(postDetails.getContent());
                    post.setCreatedAt(postDetails.getCreatedAt());
                    post.setTrip(postDetails.getTrip());
                    post.setUser(postDetails.getUser());
                    return sharedPostRepository.save(post);
                }).orElseThrow(() -> new RuntimeException("Post not found with id " + postId));
    }

    public void deletePost(Long postId) {
        sharedPostRepository.deleteById(postId);
    }
}
