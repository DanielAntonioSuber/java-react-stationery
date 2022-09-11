package com.stationary.api.dto;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Calendar;

@Getter @Setter
public class ProductDto {
    private Integer code;

    @NotEmpty
    @Size(min = 1)
    private String articleName;

    @NotNull
    private Float wholesalePrice;

    @NotNull
    private Float retailPrice;

    @NotNull
    private Integer amount;

    @NotEmpty
    private String brand;

    private Calendar createdAt;
    private Calendar updatedAt;

    @NotNull
    private Integer supplierId;
}
