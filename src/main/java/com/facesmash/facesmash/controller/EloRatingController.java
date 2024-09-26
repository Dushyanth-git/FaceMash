package com.facesmash.facesmash.controller;

import com.facesmash.facesmash.model.User;
import com.facesmash.facesmash.service.EloRatingService;
import com.facesmash.facesmash.service.UserService;
import com.facesmash.facesmash.dto.EloRatingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/elo")
@CrossOrigin(origins = "http://localhost:1234") // Allow requests from React app
public class EloRatingController {

    @Autowired
    private EloRatingService eloRatingService;

    @Autowired
    private UserService userService;

    @PostMapping("/update")
    public void updateRatings(@RequestBody EloRatingRequest request) {
        Long winnerId = request.getWinnerId();
        Long loserId = request.getLoserId();

        if (winnerId == null || loserId == null) {
            throw new IllegalArgumentException("Winner and loser IDs must not be null");
        }

        User winner = userService.findUserById(winnerId);
        User loser = userService.findUserById(loserId);

        if (winner == null || loser == null) {
            throw new RuntimeException("User not found");
        }

        // Update Elo ratings
        eloRatingService.updateRatings(winner, loser);
    }
}
