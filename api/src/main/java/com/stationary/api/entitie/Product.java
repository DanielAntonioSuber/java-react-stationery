package com.stationary.api.entitie;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Getter @Setter
public class Product {

    @Id
    private Integer code;

    @Column(name = "article_name")
    private String articleName;

    @Column(name = "wholesale_price")
    private Float wholesalePrice;

    @Column(name = "retail_price")
    private Float retailPrice;

    private Integer amount;

    private String brand;

    @OneToMany(mappedBy = "product", orphanRemoval = true)
    private List<Sale> sales = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

}
