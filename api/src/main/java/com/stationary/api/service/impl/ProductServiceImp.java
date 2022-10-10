package com.stationary.api.service.impl;

import com.stationary.api.dto.ListResponse;
import com.stationary.api.dto.ProductDto;
import com.stationary.api.entitie.Product;
import com.stationary.api.entitie.Supplier;
import com.stationary.api.exceptions.AppException;
import com.stationary.api.exceptions.ResourceNotFoundException;
import com.stationary.api.repository.ProductRepository;
import com.stationary.api.repository.SupplierRepository;
import com.stationary.api.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@Service
public class ProductServiceImp implements ProductService {
    @Transactional(
            rollbackFor = {IOException.class, AppException.class, SQLException.class},
            noRollbackFor = {ResourceNotFoundException.class})
    @Override
    public ProductDto addProductToInventory(ProductDto productDto) {
        Supplier supplier = supplierRepository.findById(productDto.getSupplierId())
                .orElseThrow(() -> new ResourceNotFoundException("Supplier", "id", productDto.getSupplierId() + ""));
        Product product = mapToEntity(productDto);
        product.setSupplier(supplier);

        Product newProduct = productRepository.save(product);

        return mapToDto(newProduct);
    }

    @Override
    public ProductDto getProduct(Integer code) {
        Product productFound = productRepository.findById(code)
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_NAME, "id", code + ""));
        return mapToDto(productFound);
    }

    @Override
    public ListResponse<ProductDto> getProducts(int pageNumber, int sizePage, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, sizePage, sort);

        Page<Product> pageSupplier = productRepository.findAll(pageable);

        List<Product> productList = pageSupplier.getContent();

        List<ProductDto> content = productList.stream().map(this::mapToDto).toList();

        var productsResponse = new ListResponse<ProductDto>();
        productsResponse.setContent(content);
        productsResponse.setLast(pageSupplier.isLast());
        productsResponse.setPageNumber(pageNumber);
        productsResponse.setSizePage(sizePage);
        productsResponse.setTotalElements(pageSupplier.getTotalElements());
        productsResponse.setTotalPages(pageSupplier.getTotalPages());

        return productsResponse;
    }

    @Override
    public ProductDto updateProduct(Integer code, ProductDto productDto) {
        Product productFound = productRepository.findById(code)
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_NAME, "id", code + ""));
        Supplier supplier = supplierRepository.findById(productDto.getSupplierId())
                .orElseThrow(() -> new ResourceNotFoundException("Supplier", "id", productDto.getSupplierId() + ""));

        productFound.setAmount(productDto.getAmount());
        productFound.setArticleName(productDto.getArticleName());
        productFound.setBrand(productDto.getBrand());
        productFound.setRetailPrice(productDto.getRetailPrice());
        productFound.setWholesalePrice(productDto.getWholesalePrice());
        productFound.setSupplier(supplier);

        Product productUpdated = productRepository.save(productFound);

        return mapToDto(productUpdated);
    }

    @Override
    public void deleteProduct(Integer code) {
        Product productFound = productRepository.findById(code).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_NAME, "id", code + ""));

        productRepository.delete(productFound);
    }

    private Product mapToEntity(ProductDto productDto) {
        return modelMapper.map(productDto, Product.class);
    }

    private ProductDto mapToDto(Product product) {
        return modelMapper.map(product, ProductDto.class);
    }

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ModelMapper modelMapper;

    public static final String RESOURCE_NAME = "Product";
}
