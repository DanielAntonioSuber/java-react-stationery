package com.stationary.api.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;

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
    private String role;

    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    private String direction;

    @NotNull
    private Float salary;

    @NotEmpty
    @Size(min = 4)
    private String schedule;

    @NotEmpty
    @Size(max = 13, min = 12)
    private String rfc;

    @NotEmpty
    @Size(min = 8)
    private String phoneNumber;

    @NotEmpty
    @Size(min = 8)
    private String password;

}
