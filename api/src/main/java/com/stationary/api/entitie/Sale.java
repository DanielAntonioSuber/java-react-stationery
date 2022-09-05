package com.stationary.api.entitie;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Calendar;

@Entity
@Table(name = "sales")
@Getter
@Setter
public class Sale {

    @Id
    private Integer id;

    private Float price;

    private Integer amount;

    private Float total;

    @CreationTimestamp
    @Column(name = "sale_date")
    private Calendar saleDate;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = true)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "product_code")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
