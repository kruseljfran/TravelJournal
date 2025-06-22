package com.example.travelJournal.service;

import com.example.travelJournal.dto.ExpenseCreateDTO;
import com.example.travelJournal.model.Expense;
import com.example.travelJournal.model.Trip;
import com.example.travelJournal.repository.ExpenseRepository;
import com.example.travelJournal.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private TripRepository tripRepository;

    public List<Expense> getExpensesByTripId(Long tripId) {
        return expenseRepository.findByTripTripId(tripId);
    }

    public Expense createExpense(ExpenseCreateDTO expenseCreateDTO, Long userId) {
        Trip trip = tripRepository.findById(expenseCreateDTO.getTripId())
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        if (!trip.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to add expense to this trip");
        }

        Expense expense = new Expense();
        expense.setCategory(expenseCreateDTO.getCategory());
        expense.setAmount(expenseCreateDTO.getAmount());
        expense.setCurrency(expenseCreateDTO.getCurrency());
        expense.setData(expenseCreateDTO.getData());
        expense.setDescription(expenseCreateDTO.getDescription());
        expense.setTrip(trip);

        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Long expenseId, ExpenseCreateDTO expenseCreateDTO, Long userId) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        // provjeri je li putovanje od ulogiranog usera
        if (!expense.getTrip().getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to update this expense");
        }

        expense.setCategory(expenseCreateDTO.getCategory());
        expense.setAmount(expenseCreateDTO.getAmount());
        expense.setCurrency(expenseCreateDTO.getCurrency());
        expense.setData(expenseCreateDTO.getData());
        expense.setDescription(expenseCreateDTO.getDescription());

        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long expenseId, Long userId) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        // provjeri je li putovanje od ulogiranog usera
        if (!expense.getTrip().getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to delete this expense");
        }

        expenseRepository.delete(expense);
    }
}
