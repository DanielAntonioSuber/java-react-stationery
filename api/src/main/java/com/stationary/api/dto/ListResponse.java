package com.stationary.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class ListResponse<C> {

    private List<C> content;

    private int sizePage;

    private int pageNumber;

    private int totalPages;

    private long totalElements;

    private boolean last;
}
