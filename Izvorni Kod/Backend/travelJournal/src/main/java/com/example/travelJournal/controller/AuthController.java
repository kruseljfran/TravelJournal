package com.example.travelJournal.controller;

import com.example.travelJournal.dto.LoginRequestDTO;
import com.example.travelJournal.dto.RegisterRequestDTO;
import com.example.travelJournal.model.TJUser;
import com.example.travelJournal.repository.TJUserRepository;
import com.example.travelJournal.service.TJUserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final TJUserRepository userRepository;
    private final TJUserService userService;

    // Constructor injection for both userRepository and userService
    public AuthController(TJUserRepository userRepository, TJUserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequest, HttpSession session) {
        Optional<TJUser> optionalUser = userRepository.findByUsername(loginRequest.getUsername());

        if (optionalUser.isPresent()) {
            TJUser user = optionalUser.get();
            if (user.getPasswordHash().equals(loginRequest.getPassword())) {
                session.setAttribute("userId", user.getUserId());
                session.setAttribute("username", user.getUsername());
                return ResponseEntity.ok("Login successful");
            }
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO registerRequest) {
        try {
            // Check if username already exists
            if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
                return ResponseEntity.status(400).body("Korisničko ime već postoji");
            }

            // Check if email already exists
            if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
                return ResponseEntity.status(400).body("Email već postoji");
            }

            // Create new user
            TJUser newUser = new TJUser();
            newUser.setUsername(registerRequest.getUsername());
            newUser.setEmail(registerRequest.getEmail());
            newUser.setPasswordHash(registerRequest.getPassword()); // In production, hash this!
            newUser.setRole("USER");

            TJUser savedUser = userRepository.save(newUser);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Registracija uspješna");
            response.put("userId", savedUser.getUserId());
            response.put("username", savedUser.getUsername());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Greška pri registraciji: " + e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out");
    }

    @GetMapping("/me")
    public ResponseEntity<?> currentUser(HttpSession session) {
        Object username = session.getAttribute("username");

        if (username != null) {
            // Fetch the user object by username
            Optional<TJUser> userOpt = userService.getUserByUsername((String) username);

            if (userOpt.isPresent()) {
                TJUser user = userOpt.get();
                return ResponseEntity.ok(user);  // Return the full user object as JSON
            } else {
                return ResponseEntity.status(404).body("User not found");
            }
        } else {
            return ResponseEntity.status(401).body("Not logged in");
        }
    }
}
