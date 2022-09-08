package com.stationary.api.entitie;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clients")
@Getter @Setter
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String direction;

    @OneToMany(mappedBy = "client", orphanRemoval = true)
    private List<Sale> purchases = new ArrayList<>();

}