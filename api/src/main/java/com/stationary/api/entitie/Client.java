package com.stationary.api.entitie;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clients", indexes = {
        @Index(name = "client_full_name_key", columnList = "name, surname", unique = true),
        @Index(name = "client_email_key", columnList = "email", unique = true)
})
@Getter
@Setter
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String surname;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String email;

    private String direction;

    @OneToMany(mappedBy = "client", orphanRemoval = true)
    private List<Sale> purchases = new ArrayList<>();

}