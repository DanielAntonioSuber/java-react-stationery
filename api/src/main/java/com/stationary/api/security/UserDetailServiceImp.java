package com.stationary.api.security;

import com.stationary.api.entitie.Employee;
import com.stationary.api.exceptions.ResourceNotFoundException;
import com.stationary.api.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailServiceImp implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByEmailOrRfc(username, username).orElseThrow(() -> new ResourceNotFoundException("Employee", "Email or Rfc", username));

        return new User(employee.getEmail(), employee.getPassword(), Collections.singleton(new SimpleGrantedAuthority(employee.getRole().toString())));
    }

    @Autowired
    private EmployeeRepository employeeRepository;
}
