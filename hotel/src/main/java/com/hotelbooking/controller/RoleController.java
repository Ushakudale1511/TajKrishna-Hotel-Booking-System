package com.hotelbooking.controller;

import com.hotelbooking.entity.Role;
import com.hotelbooking.entity.User;
import com.hotelbooking.exception.RoleAlreadyExistException;
import com.hotelbooking.service.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {

    private final IRoleService roleService;

    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles() {
        return ResponseEntity.ok(roleService.getRoles());
    }

    @PostMapping
    public ResponseEntity<String> createRole(@RequestBody Role role) {
        try {
            roleService.createRole(role);
            return ResponseEntity.ok("Role created successfully");
        } catch (RoleAlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/{roleId}")
    public ResponseEntity<String> deleteRole(@PathVariable Long roleId) {
        roleService.deleteRole(roleId);
        return ResponseEntity.ok("Role deleted successfully");
    }

    @PostMapping("/remove-all/{roleId}")
    public Role removeAllUsers(@PathVariable Long roleId) {
        return roleService.removeAllUserFromRole(roleId);
    }

    @PostMapping("/remove")
    public User removeUser(@RequestParam Long userId,
                           @RequestParam Long roleId) {
        return roleService.removeUserFromRole(userId, roleId);
    }

    @PostMapping("/assign")
    public User assignRole(@RequestParam Long userId,
                           @RequestParam Long roleId) {
        return roleService.assignRoleToUser(userId, roleId);
    }
}
