package com.stationary.api.dto;

import com.stationary.api.entitie.Role;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
public class EmployeeRequest {

    private Integer id;

    @NotEmpty
    @Size(min = 1)
    private String name;

    @NotEmpty
    @Size(min = 1)
    private String surname;

    @NotEmpty
    @Pattern(regexp = "ADMIN|SELLER")
    private Role role;

    @Email
    private String email;

    @NotEmpty
    private String direction;

    @NotEmpty
    private Float salary;

    @Size(min = 4)
    private String schedule;

    @Size(max = 20, min = 20)
    private String rfc;

    @Size(min = 8)
    private String phoneNumber;

    @Size(min = 8)
    private String password;

}
