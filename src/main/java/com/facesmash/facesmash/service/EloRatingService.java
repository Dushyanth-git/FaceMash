package com.facesmash.facesmash.service;

import com.facesmash.facesmash.model.User;

public interface EloRatingService {
    void updateRatings(User winner, User loser);
}
