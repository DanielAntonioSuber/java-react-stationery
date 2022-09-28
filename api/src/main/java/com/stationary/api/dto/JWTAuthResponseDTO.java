package com.stationary.api.dto;

import lombok.Getter;
import lombok.Setter;

public class JWTAuthResponseDTO {

    public JWTAuthResponseDTO(String accessToken, String role) {
        this.accessToken = accessToken;
        this.role = role;
    }

    @Getter @Setter
    private String accessToken;

    @Getter @Setter
    private String kindToken = "Bearer";

    @Getter @Setter
    private String role;
}
