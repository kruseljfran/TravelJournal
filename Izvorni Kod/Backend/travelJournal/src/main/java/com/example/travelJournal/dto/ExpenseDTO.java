package com.example.travelJournal.dto;

public class ExpenseDTO {
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