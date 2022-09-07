package com.stationary.api.repository;

import com.stationary.api.entitie.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    Optional<Employee> findByRfc(String rfc);

    Optional<Employee> findByEmail(String email);

    Optional<Employee> findByEmailOrRfc(String emailOrRfc);

    Boolean existsByRfc(String rfc);

    void deleteByRfc(String rfc);


}