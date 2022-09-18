package com.stationary.api.service;


import com.stationary.api.dto.ListResponse;
import com.stationary.api.dto.ProductDto;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {
    ProductDto addProductToInventory(ProductDto productDto, MultipartFile[] multipartFiles);

    ProductDto getProduct(Integer code);

    ListResponse<ProductDto> getProducts(int pageNumber, int sizePage, String sortBy, String sortDir);

    ProductDto updateProduct(Integer code, ProductDto productDto);

    void deleteProduct(Integer code);



}
