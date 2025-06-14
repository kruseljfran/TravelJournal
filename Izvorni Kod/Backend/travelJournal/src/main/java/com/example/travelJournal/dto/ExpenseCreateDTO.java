package com.example.travelJournal.dto;

public class ExpenseCreateDTO {
    private String category;
    private Integer amount;
    private String currency;
    private String data;
    private String description;
    private Long tripId;

    public ExpenseCreateDTO() {}

    public ExpenseCreateDTO(String category, Integer amount, String currency, String data, String description, Long tripId) {
        this.category = category;
        this.amount = amount;
        this.currency = currency;
        this.data = data;
        this.description = description;
        this.tripId = tripId;
    }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getAmount() { return amount; }
    public void setAmount(Integer amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getData() { return data; }
    public void setData(String data) { this.data = data; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }
}
