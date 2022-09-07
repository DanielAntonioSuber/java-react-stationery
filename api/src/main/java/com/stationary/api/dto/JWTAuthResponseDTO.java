package com.stationary.api.dto;

import lombok.Getter;
import lombok.Setter;

public class JWTAuthResponseDTO {

    public JWTAuthResponseDTO(String accessToken) {
        this.accessToken = accessToken;
    }

    @Getter @Setter
    private String accessToken;

    @Getter @Setter
    private String kindToken = "Bearer";
}
