package com.stationary.api.entitie;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "suppliers")
@Getter @Setter
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "supplier_name")
    private String supplierName;

    private String rfc;

    @OneToMany(mappedBy = "supplier", orphanRemoval = true)
    private List<Product> products;
}