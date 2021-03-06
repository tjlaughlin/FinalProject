package com.skilldistillery.crag.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.crag.entities.ClimbingArea;
import com.skilldistillery.crag.entities.User;

public interface ClimbingAreaRepository extends JpaRepository<ClimbingArea, Integer> {

List<ClimbingArea> findByUsers_Username(String username);

ClimbingArea findByName(String name);

//List<User> findByFavoriteAreaList(String climbingarea);

}
