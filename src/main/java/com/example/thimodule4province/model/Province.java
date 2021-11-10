package com.example.thimodule4province.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Province {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    private Country country;

    private double area;

    private Long population;

    private double GDP;

    private String description;

}
