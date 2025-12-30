package com.hotelbooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hotelbooking.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);

    boolean existsByName(String name);
}
