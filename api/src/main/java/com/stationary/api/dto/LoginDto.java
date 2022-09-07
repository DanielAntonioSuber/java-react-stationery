package com.stationary.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginDto {
    private String emailOrRfc;

    private String password;
}
