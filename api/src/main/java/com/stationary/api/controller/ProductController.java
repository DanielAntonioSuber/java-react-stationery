package com.stationary.api.controller;

import com.stationary.api.dto.ListResponse;
import com.stationary.api.dto.ProductDto;
import com.stationary.api.service.ProductService;
import com.stationary.api.utils.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ProductDto> createProduct(@Valid @RequestPart("product") ProductDto productDto,@RequestPart("imageFiles") MultipartFile[] multipartFile) {
        return new ResponseEntity<>(productService.addProductToInventory(productDto, multipartFile), HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<ListResponse<ProductDto>> getProducts(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer pageNumber,
            @RequestParam(name = "sizePage", defaultValue = AppConstants.DEFAULT_SIZE_PAGE) Integer sizePage,
            @RequestParam(name = "sortBy", defaultValue = "code") String sortBy,
            @RequestParam(name = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIR) String sortDir
    ) {
        return new ResponseEntity<>(productService.getProducts(pageNumber, sizePage, sortBy, sortDir), HttpStatus.OK);
    }

    @GetMapping("/{code}")
    public ResponseEntity<ProductDto> getProductByCode(@PathVariable("code") Integer code) {
        return new ResponseEntity<>(productService.getProduct(code), HttpStatus.OK);
    }

    @PutMapping(name = "/{code}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ProductDto> updateProductByCode(@PathVariable("code") Integer code, @Valid @RequestBody ProductDto productDto) {
        ProductDto updatedProduct = productService.updateProduct(code, productDto);

        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/{code}")
    public ResponseEntity<String> deleteProductByCode(@PathVariable("code") Integer code) {
        productService.deleteProduct(code);
        return new ResponseEntity<>("Was deleted", HttpStatus.OK);
    }

    @Autowired
    ProductService productService;
}
