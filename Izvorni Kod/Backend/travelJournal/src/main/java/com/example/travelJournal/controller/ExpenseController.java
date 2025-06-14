package com.example.travelJournal.controller;

// Make sure to import the ExpenseDTO class
import com.example.travelJournal.dto.ExpenseDTO;
import com.example.travelJournal.dto.ExpenseCreateDTO;
import com.example.travelJournal.model.Expense;
import com.example.travelJournal.service.ExpenseService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping("/trip/{tripId}")
    public List<ExpenseDTO> getExpensesByTripId(@PathVariable Long tripId) {
        return expenseService.getExpensesByTripId(tripId)
                .stream()
                .map(ExpenseDTO::new)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<ExpenseDTO> createExpense(@RequestBody ExpenseCreateDTO expenseCreateDTO, HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            Expense createdExpense = expenseService.createExpense(expenseCreateDTO, (Long) userId);
            return ResponseEntity.ok(new ExpenseDTO(createdExpense));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseDTO> updateExpense(
            @PathVariable Long id,
            @RequestBody ExpenseCreateDTO expenseCreateDTO,
            HttpSession session) {

        Object userId = session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            Expense updatedExpense = expenseService.updateExpense(id, expenseCreateDTO, (Long) userId);
            return ResponseEntity.ok(new ExpenseDTO(updatedExpense));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id, HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            expenseService.deleteExpense(id, (Long) userId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
