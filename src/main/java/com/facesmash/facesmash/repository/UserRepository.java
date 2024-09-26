package com.facesmash.facesmash.repository;

import com.facesmash.facesmash.model.User;  // Import your User entity class
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findTop1ByRatingGreaterThanOrderByRatingAsc(long rating);

    List<User> findTop2ByOrderByRatingAsc();

    @Query("SELECT u FROM User u ORDER BY u.rating DESC")
    List<User> findTop5ByRating();
}
