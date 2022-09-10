package com.stationary.api.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.Calendar;

@Getter @Setter
public class ProductDto {
    private Integer code;
    private String articleName;
    private Float wholesalePrice;
    private Float retailPrice;
    private Integer amount;
    private String brand;
    private Calendar createdAt;
    private Calendar updatedAt;
    private Integer supplierId;
}
