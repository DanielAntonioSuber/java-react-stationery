package com.stationary.api.service;

import com.stationary.api.dto.SupplierDto;
import com.stationary.api.dto.SuppliersResponse;

public interface SupplierService {

    SupplierDto addSupplier(SupplierDto supplierDto);

    SupplierDto getSupplierById(Integer supplierId);

    SuppliersResponse getSuppliers(int pageNumber, int sizePage, String sortBy, String sortDir);

    SupplierDto updateSupplier(Integer supplierId, SupplierDto supplierDto);

    void deleteSupplierById(Integer supplierId);
}
