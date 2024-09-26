package com.facesmash.facesmash.controller;

import com.facesmash.facesmash.model.User;
import com.facesmash.facesmash.service.EloRatingService;
import com.facesmash.facesmash.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:1234") // Allow requests from React app
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EloRatingService eloRatingService;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestParam("name") String name,
                                           @RequestParam("photo") MultipartFile photo) {
        try {
            User createdUser = userService.createUser(name, photo);
            return ResponseEntity.ok(createdUser); // Return the created User
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Handle error
        }
    }


    @GetMapping("/voting-pair")
    public List<User> getVotingPair(@RequestParam(required = false) Long winnerId) {
        // Pass the winnerId to the service
        return userService.getVotingPair(winnerId);
    }

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<User>> getLeaderboard() {
        List<User> topUsers = userService.getTop5Users();
        return ResponseEntity.ok(topUsers);
    }

    // Add this method for casting votes
}
