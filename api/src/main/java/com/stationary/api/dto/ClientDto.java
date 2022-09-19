package com.stationary.api.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@Setter
public class ClientDto {
    private Integer id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String surname;

    @NotEmpty
    @Size(min = 7, max = 16)
    private String phoneNumber;

    @NotEmpty
    private String direction;

    @Email
    private String email;
}
