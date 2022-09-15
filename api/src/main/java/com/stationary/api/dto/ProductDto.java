package com.stationary.api.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

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

    private List<Image> images = new ArrayList<>();

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Image {
        private String url;
        private String name;
    }
}
