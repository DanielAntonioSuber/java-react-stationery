package com.stationary.api.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.Calendar;

@Getter
@Setter
public class SaleDto {
    private Integer id;

    @NotNull
    private Float price;

    @NotNull
    private Integer amount;

    @NotNull
    private Float total;

    @NotNull
    private Integer clientId;

    @NotNull
    private Integer productCode;

    @NotNull
    private Integer employeeId;

    private Calendar saleDate;
}
