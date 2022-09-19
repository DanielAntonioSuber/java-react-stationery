package com.stationary.api.repository;

import com.stationary.api.entitie.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Integer> {
    Optional<Client> findByNameAndSurname(String name, String surname);

}