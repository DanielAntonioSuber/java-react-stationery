package com.stationary.api.entitie;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;


@Entity
@Table(name = "employee", indexes = {
        @Index(name = "employee_rfc_key", columnList = "rfc", unique = true)
})
@Getter
@Setter
public class Employee {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    private String name;

    private String surname;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String email;

    private String direction;

    private Float salary;

    private String schedule;

    private String rfc;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String password;


    @CreationTimestamp
    @Temporal(TemporalType.DATE)
    @Column(name = "created_at")
    private Calendar createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.DATE)
    @Column(name = "updated_at")
    private Calendar updatedAt;

    @OneToMany(mappedBy = "employee",orphanRemoval = true)
    private List<Sale> sales = new ArrayList<>();
}