package com.facesmash.facesmash.service;
import java.util.List;

import com.facesmash.facesmash.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    User createUser(String name, MultipartFile photo) throws IOException;

    User findUserById(Long loserId);

    List<User> getVotingPair(Long winnerId);

    User getNextPlayerWithSimilarRating(long rating); // This method finds the next player with a similar rating to the winner

    User getUserById(Long winnerId);

    List<User>  findTop5ByRating();

    List<User> getTop5Users();
}
