package com.stationary.api.repository;

import com.stationary.api.entitie.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Optional<Product> findByArticleNameAndBrand(String articleName, String brand);
}