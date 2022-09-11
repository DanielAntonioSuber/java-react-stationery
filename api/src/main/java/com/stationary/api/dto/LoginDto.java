package com.stationary.api.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter @Setter
public class LoginDto {

    @NotNull
    private String emailOrRfc;

    @NotNull
    private String password;
}
