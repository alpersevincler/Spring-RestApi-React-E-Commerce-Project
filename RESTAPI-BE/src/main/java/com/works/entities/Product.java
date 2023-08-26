package com.works.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pid;

    @Size(min = 2, max = 100)
    @NotEmpty
    @NotNull
    private String title;

    @Size(message = "3", max = 300)
    @NotEmpty
    @NotNull
    private String detail;

    @NotEmpty
    @NotNull
    private String thumbnail;

    @Max(1000000)
    @Min(1)
    @NotNull
    private Integer price;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "images", joinColumns = @JoinColumn(name = "pid"))
    @Column(name = "images")
    private List<String> images = new ArrayList<>();

    @ManyToMany
    List<Category> categories;

}
