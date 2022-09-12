package com.stationary.api.entitie;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "product_images", uniqueConstraints = {
        @UniqueConstraint(name = "product_images_path_key", columnNames = {"path"})
})
@Getter
@Setter
@NoArgsConstructor
public class ProductImage {

    public ProductImage(String name, String path) {
        this.name = name;
        this.path = path;
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
