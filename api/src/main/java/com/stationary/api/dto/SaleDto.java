package com.stationary.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private Integer clientId;

    @NotNull
    @JsonIgnore
    private Integer productId;

    @NotNull
    @JsonIgnore
    private Integer employeeId;

    private Calendar saleDate;

    private String client;

    private String product;

    private String employee;
}
