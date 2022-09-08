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
@Table(name = "products")
@Getter @Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer code;

    @Column(name = "article_name")
    private String articleName;

    @Column(name = "wholesale_price")
    private Float wholesalePrice;

    @Column(name = "retail_price")
    private Float retailPrice;

    private Integer amount;

    private String brand;

    @CreationTimestamp
    @Temporal(TemporalType.DATE)
    @Column(name = "created_at")
    private Calendar createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.DATE)
    @Column(name = "updated_at")
    private Calendar updatedAt;

    @OneToMany(mappedBy = "product", orphanRemoval = true)
    private List<Sale> sales = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

}
