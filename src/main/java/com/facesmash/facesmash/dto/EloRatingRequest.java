package com.facesmash.facesmash.dto;

// DTO to hold winnerId and loserId
public class EloRatingRequest {
    private Long winnerId;
    private Long loserId;

    // Getters and setters
    public Long getWinnerId() {
        return winnerId;
    }

    public void setWinnerId(Long winnerId) {
        this.winnerId = winnerId;
    }

    public Long getLoserId() {
        return loserId;
    }

    public void setLoserId(Long loserId) {
        this.loserId = loserId;
    }
}
