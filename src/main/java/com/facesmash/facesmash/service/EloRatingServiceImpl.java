package com.facesmash.facesmash.service;

import com.facesmash.facesmash.model.User;
import com.facesmash.facesmash.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EloRatingServiceImpl implements EloRatingService {

    private static final int K = 32; // K-factor for Elo calculations

    @Autowired
    private UserRepository userRepository;

    @Override
    public void updateRatings(User winner, User loser) {
        double winnerRating = winner.getRating();
        double loserRating = loser.getRating();

        double expectedWinner = 1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400));
        double expectedLoser = 1 / (1 + Math.pow(10, (winnerRating - loserRating) / 400));

        winnerRating = winnerRating + K * (1 - expectedWinner);
        loserRating = loserRating + K * (0 - expectedLoser);

        winner.setRating(winnerRating);
        loser.setRating(loserRating);

        userRepository.save(winner);
        userRepository.save(loser);
    }
}
