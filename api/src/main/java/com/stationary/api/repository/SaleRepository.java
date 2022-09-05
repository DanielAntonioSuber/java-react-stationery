package com.stationary.api.repository;

import com.stationary.api.entitie.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Integer> {
}