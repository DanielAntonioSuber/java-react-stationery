package com.stationary.api.controller;

import com.stationary.api.dto.EmployeeDto;
import com.stationary.api.dto.EmployeeRequest;
import com.stationary.api.dto.JWTAuthResponseDTO;
import com.stationary.api.dto.LoginDto;
import com.stationary.api.security.JwtTokenProvider;
import com.stationary.api.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<JWTAuthResponseDTO> authenticateUser(@Valid @RequestBody LoginDto loginDTO) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmailOrRfc(), loginDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return new ResponseEntity<>(new JWTAuthResponseDTO(token, (String) authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList().get(0)), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<EmployeeDto> registerUser(@Valid @RequestBody EmployeeRequest employeeRequest) {
        EmployeeDto employeeDto = userService.createEmployee(employeeRequest);
        return new ResponseEntity<>(employeeDto, HttpStatus.OK);
    }

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private EmployeeService userService;
}
