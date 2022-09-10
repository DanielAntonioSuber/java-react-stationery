package com.stationary.api.service;


import com.stationary.api.dto.ListResponse;
import com.stationary.api.dto.ProductDto;

public interface ProductService {
    ProductDto addProduct(ProductDto productDto);

    ProductDto getProduct(Integer code);

    ListResponse<ProductDto> getProducts(int pageNumber, int sizePage, String sortBy, String sortDir);

    ProductDto updateProduct(Integer code, ProductDto productDto);

    void deleteProduct(Integer code);



}
