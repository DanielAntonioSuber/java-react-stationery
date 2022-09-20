package com.stationary.api.controller;

import com.stationary.api.dto.ListResponse;
import com.stationary.api.dto.SaleDto;
import com.stationary.api.service.SalesService;
import com.stationary.api.utils.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/sales")
public class SalesController {

    @PostMapping
    public ResponseEntity<SaleDto> makeASale(@Valid @RequestBody SaleDto saleDto) {
        return new ResponseEntity<>(salesService.makeASale(saleDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ListResponse<SaleDto> getSales(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer pageNumber,
            @RequestParam(name = "sizePage", defaultValue = AppConstants.DEFAULT_SIZE_PAGE) Integer sizePage,
            @RequestParam(name = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(name = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIR) String sortDir) {

        return salesService.getSales(pageNumber, sizePage, sortBy, sortDir);
    }

    @GetMapping("/{id}")
    public SaleDto getSale(@PathVariable(name = "id") Integer id) {
        return salesService.getSale(id);
    }

    @Autowired
    private SalesService salesService;

}
