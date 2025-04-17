package com.example.travelJournal.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Expense")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long expenseId;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Integer amount;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private String data;

    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "tripId", nullable = false)
    private Trip trip;

    public Long getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(Long expenseId) {
        this.expenseId = expenseId;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}