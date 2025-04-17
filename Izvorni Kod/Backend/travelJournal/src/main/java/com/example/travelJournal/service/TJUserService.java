package com.example.travelJournal.service;

import com.example.travelJournal.model.TJUser;
import com.example.travelJournal.repository.TJUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TJUserService {

    private final TJUserRepository userRepository;

    public TJUserService(TJUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<TJUser> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<TJUser> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public TJUser createUser(TJUser user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<TJUser> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}