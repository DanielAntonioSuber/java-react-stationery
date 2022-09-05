package com.stationary.api.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter @Setter
public class SupplierDto {

    private Integer id;

    @NotBlank
    private String supplierName;

    @NotBlank
    //@Pattern(regexp = "[a-zA-Z]{3,4}(\\d{6})((Dd){2,3})?")
    @Size(min = 12, max = 13)
    private String rfc;

}
