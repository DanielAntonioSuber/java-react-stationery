package com.stationary.api.controller;

import com.stationary.api.dto.ListResponse;
import com.stationary.api.dto.SupplierDto;
import com.stationary.api.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(name = "/api/supplier")
public class SupplierController {

    @GetMapping
    public ListResponse<SupplierDto> getSuppliers(
            @RequestParam(name = "pageNumber", value = "0") Integer pageNumber,
            @RequestParam(name = "sizePage", value = "10") Integer sizePage,
            @RequestParam(name = "sortBy", value = "id") String sortBy,
            @RequestParam(name = "sortDir", value = "ASC") String sortDir
    ) {
        return supplierService.getSuppliers(pageNumber, sizePage, sortBy, sortDir);
    }

    @GetMapping("/{supplierId}")
    public SupplierDto getSupplierById(@PathVariable(name = "supplierId") Integer supplierId) {
        return supplierService.getSupplierById(supplierId);
    }

    @PostMapping
    public ResponseEntity<SupplierDto> createSupplier(@Valid @RequestBody SupplierDto supplierDto) {
        SupplierDto newSupplier = supplierService.addSupplier(supplierDto);
        return new ResponseEntity<>(newSupplier, HttpStatus.CREATED);
    }

    @DeleteMapping("/{supplierId}")
    public ResponseEntity<String> deleteSupplierById(@PathVariable(name = "supplierId") Integer supplierId) {
        supplierService.deleteSupplierById(supplierId);
        return new ResponseEntity<>("Supplier was deleted", HttpStatus.OK);
    }

    @PutMapping("/{supplierId}")
    public SupplierDto updateSupplier(@PathVariable(name = "supplierId") Integer supplierId, @Valid @RequestBody SupplierDto supplierDto) {
        return supplierService.updateSupplier(supplierId, supplierDto);
    }

    @Autowired
    private SupplierService supplierService;

}
