package com.example.travelJournal.controller;

import com.example.travelJournal.model.TJUser;
import com.example.travelJournal.service.TJUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class TJUserController {

    private final TJUserService userService;

    public TJUserController(TJUserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<TJUser> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TJUser> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TJUser createUser(@RequestBody TJUser user) {
        return userService.createUser(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

