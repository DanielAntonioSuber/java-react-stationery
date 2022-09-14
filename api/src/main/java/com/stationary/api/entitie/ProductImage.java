package com.stationary.api.entitie;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "product_images", uniqueConstraints = {
        @UniqueConstraint(name = "product_images_name_key", columnNames = {"name"})
})
@Getter
@Setter
@NoArgsConstructor
public class ProductImage {

    public ProductImage(String name, String path, Product product) {
        this.name = name;
        this.path = path;
        this.product = product;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String path;

    @ManyToOne
    @JoinColumn(name = "product_code")
    private Product product;

}
