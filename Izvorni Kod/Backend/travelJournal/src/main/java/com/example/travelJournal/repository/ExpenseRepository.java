package com.example.travelJournal.repository;

import com.example.travelJournal.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByTripTripId(Long tripId);
    List<Expense> findByTripTripIdAndCategory(Long tripId, String category);
    List<Expense> findByTripTripIdOrderByDataDesc(Long tripId);
}
