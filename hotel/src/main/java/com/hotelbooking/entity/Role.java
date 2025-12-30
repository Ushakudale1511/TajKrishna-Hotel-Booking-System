package com.hotelbooking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private Set<User> users = new HashSet<>();

    public Role(String name){
        this.name = name;
    }

    public void assignRoleToUser(User user){
        user.getRoles().add(this);
        this.users.add(user);
    }

    public void removeUserFromRole(User user){
        user.getRoles().remove(this);
        this.users.remove(user);
    }

    public void removeAllUserFromRole(){
        List<User> copy = users.stream().toList();
        copy.forEach(this::removeUserFromRole);
    }
}
