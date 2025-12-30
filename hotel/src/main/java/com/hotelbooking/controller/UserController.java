package com.hotelbooking.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.entity.User;
import com.hotelbooking.service.IUserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    // ⭐ GET ALL USERS (ADMIN ONLY)
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    // ⭐ GET USER BY EMAIL
    @GetMapping("/{email}")
    @PreAuthorize("#email == authentication.principal.username or hasAnyRole('ADMIN','CUSTOMER','USER')")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {

        try {
            User theUser = userService.getUser(email);
            return ResponseEntity.ok(theUser);

        } catch (UsernameNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching user");
        }
    }

    // ⭐ DELETE USER (SELF OR ADMIN)
    @DeleteMapping("/delete/{email}")
    @PreAuthorize("#email == authentication.principal.username or hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable String email) {

        try {
            userService.deleteUser(email);
            return ResponseEntity.ok("User deleted successfully");

        } catch (UsernameNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting user: " + e.getMessage());
        }
    }
}
