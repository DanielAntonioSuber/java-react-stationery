package com.stationary.api.dto;

import com.stationary.api.entitie.Role;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class EmployeeDto {

    private Integer id;

    private String name;

    private String surname;

    private Role role;

    private String email;

    private String direction;

    private Float salary;

    private String schedule;

    private String rfc;

    private String phoneNumber;

    private String password;

    private Date updatedAt;

    private Date createdAt;

}
