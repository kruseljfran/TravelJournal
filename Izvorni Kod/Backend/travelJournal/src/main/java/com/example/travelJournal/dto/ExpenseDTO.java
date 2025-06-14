package com.example.travelJournal.dto;

public class ExpenseDTO {
    private Long expenseId;
    private String category;
    private Integer amount;
    private String currency;
    private String description;

    public ExpenseDTO(String category, Integer amount, String currency, String description) {
        this.category = category;
        this.amount = amount;
        this.currency = currency;
        this.description = description;
    }

    // Add a new constructor that takes an Expense object
    public ExpenseDTO(com.example.travelJournal.model.Expense expense) {
        this.expenseId = expense.getExpenseId(); // Add this line to include the ID
        this.category = expense.getCategory();
        this.amount = expense.getAmount();
        this.currency = expense.getCurrency();
        this.description = expense.getDescription();
    }

    // Add getter and setter for expenseId
    public Long getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(Long expenseId) {
        this.expenseId = expenseId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
