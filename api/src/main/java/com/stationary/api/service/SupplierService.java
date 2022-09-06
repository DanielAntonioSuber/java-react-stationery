package com.stationary.api.service;

import com.stationary.api.dto.ListResponse;
import com.stationary.api.dto.SupplierDto;

public interface SupplierService {

    SupplierDto addSupplier(SupplierDto supplierDto);

    SupplierDto getSupplierById(Integer supplierId);

    ListResponse<SupplierDto> getSuppliers(int pageNumber, int sizePage, String sortBy, String sortDir);

    SupplierDto updateSupplier(Integer supplierId, SupplierDto supplierDto);

    void deleteSupplierById(Integer supplierId);
}
