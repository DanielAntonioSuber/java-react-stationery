package com.stationary.api.service;

import com.stationary.api.dto.ListResponse;
import com.stationary.api.dto.SaleDto;

public interface SalesService {
    SaleDto makeASale(SaleDto saleDto);

    SaleDto getSale(Integer saleId);

    ListResponse<SaleDto> getSales(int pageNumber, int sizePage, String sortBy, String sortDir);

}
