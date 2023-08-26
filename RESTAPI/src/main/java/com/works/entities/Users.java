package com.works.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;

@Entity
@Data
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;


    @NotEmpty
    @NotNull
    @Size(message = "Your name can be a minimum of 2 and maximum of 100 characters.", min = 2, max = 100)
    private String name;

    @NotEmpty
    @NotNull
    @Size(message = "Your Surname can be a minimum of 2 and maximum of 100 characters.", min = 2, max = 100)
    private String surName;

    @NotNull
    @Max(150)
    @Min(message = "Only people over 18 can register :(", value = 18)
    private Integer age;

    @Column(unique = true)
    @Size(min = 5, max = 100)
    @NotEmpty
    @NotNull
    private String email;

    @Size(min = 5, max = 50)
    @NotEmpty
    @NotNull
    private String password;

    @ManyToMany
    private List<Authority> authorities;
}
