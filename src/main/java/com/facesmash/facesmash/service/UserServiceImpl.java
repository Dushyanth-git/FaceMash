package com.facesmash.facesmash.service;

import com.facesmash.facesmash.model.User;
import com.facesmash.facesmash.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EloRatingService eloRatingService;

    @Override
    public User createUser(String name, MultipartFile photo) throws IOException {
        String photoUrl = cloudinaryService.uploadFile(photo);
        User user = new User(name, photoUrl, 1200.0);
        return userRepository.save(user); // Save and return the User
    }

    public User findUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public List<User> getVotingPair(Long winnerId) {
        List<User> users = userRepository.findAll();

        // Shuffle the list for randomization
        Collections.shuffle(users);

        User winner = null;

        // If a winnerId is provided, find that user
        if (winnerId != null) {
            winner = userRepository.findById(winnerId).orElse(null);
        }

        User similarPlayer = null;

        // Get a similar player if there is a winner
        if (winner != null) {
            // Use longValue() to convert Double to long
            similarPlayer = getNextPlayerWithSimilarRating(winner.getRating().longValue());
        } else {
            // If no winner, just take the top one random user
            similarPlayer = users.stream().limit(1).collect(Collectors.toList()).get(0);
        }

        // Return a pair with the winner and a similar player
        return (winner != null) ? List.of(winner, similarPlayer) : users.stream().limit(2).collect(Collectors.toList());
    }


    @Override
    public User getNextPlayerWithSimilarRating(long rating) {
        return userRepository.findTop1ByRatingGreaterThanOrderByRatingAsc(rating);
    }

    @Override
    public User getUserById(Long winnerId) {
        return userRepository.findById(winnerId).orElse(null);
    }

    public void updateUserRatings(Long winnerId, Long loserId) {
        User winner = userRepository.findById(winnerId).orElse(null);
        User loser = userRepository.findById(loserId).orElse(null);

        if (winner != null && loser != null) {
            eloRatingService.updateRatings(winner, loser); // Update ratings
            userRepository.save(winner); // Save updated winner
            userRepository.save(loser); // Save updated loser
        }
    }

    public List<User> findTop5ByRating() {
        return userRepository.findTop5ByRating();
    }

    public List<User> getTop5Users() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .sorted(Comparator.comparingDouble(User::getRating).reversed())
                .limit(5)
                .collect(Collectors.toList());
    }
}
