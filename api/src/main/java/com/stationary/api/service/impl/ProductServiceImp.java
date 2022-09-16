package com.stationary.api.service.impl;

import com.stationary.api.dto.ListResponse;
import com.stationary.api.dto.ProductDto;
import com.stationary.api.entitie.Product;
import com.stationary.api.entitie.ProductImage;
import com.stationary.api.entitie.Supplier;
import com.stationary.api.exceptions.AppException;
import com.stationary.api.exceptions.ResourceNotFoundException;
import com.stationary.api.repository.ProductImageRepository;
import com.stationary.api.repository.ProductRepository;
import com.stationary.api.repository.SupplierRepository;
import com.stationary.api.service.ProductService;
import com.stationary.api.utils.AppConstants;
import com.stationary.api.utils.FileUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class ProductServiceImp implements ProductService {
    @Override
    public ProductDto addProduct(ProductDto productDto, MultipartFile[] multipartFiles) {
        Supplier supplier = supplierRepository.findById(productDto.getSupplierId()).orElseThrow(() -> new ResourceNotFoundException("Supplier", "id", productDto.getSupplierId() + ""));
        Product product = mapToEntity(productDto);
        product.setSupplier(supplier);
        Product newProduct = productRepository.save(product);

        AtomicInteger count = new AtomicInteger();
        Arrays.stream(multipartFiles).forEach(multipartFile -> {
            int number = count.getAndIncrement();

            String fileName = product.getArticleName() + "-" + number + "-" + new GregorianCalendar().getTimeInMillis();
            String fileExt = "." + Objects.requireNonNull(multipartFile.getContentType()).split("image/")[1];
            Path uploadPath = Paths.get(AppConstants.IMAGES_DIR);

            try {
                var productImage = new ProductImage(fileName, uploadPath.resolve(fileName + fileExt).toString(), newProduct);
                productImageRepository.save(productImage);
                FileUtils.saveFile(uploadPath, fileName + fileExt, multipartFile);
            } catch (IOException e) {
                throw new AppException(HttpStatus.INTERNAL_SERVER_ERROR, "Error to upload file");
            }

        });

        return mapToDto(newProduct);
    }

    @Override
    public ProductDto getProduct(Integer code) {
        Product productFound = productRepository.getReferenceById(code);
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
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", code + ""));
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
        Product productFound = productRepository.findById(code).orElseThrow(() -> new ResourceNotFoundException("Product", "id", code + ""));

        List<ProductImage> images = productFound.getProductImages();

        images.forEach(image -> {
            Path filePath = Paths.get(image.getPath());
            try {
                FileUtils.deleteFile(filePath, image.getName());
            } catch (IOException e) {
                throw new AppException(HttpStatus.INTERNAL_SERVER_ERROR, "Error");
            }
        });

        productRepository.delete(productFound);
    }

    private Product mapToEntity(ProductDto productDto) {
        return modelMapper.map(productDto, Product.class);
    }

    private ProductDto mapToDto(Product product) {
        ProductDto productDto = modelMapper.typeMap(Product.class, ProductDto.class)
                .addMappings(mapper -> mapper.skip(ProductDto::setImages)).map(product);

        List<ProductDto.Image> images = product.getProductImages().stream()
                .map(image -> new ProductDto.Image(image.getPath(), image.getName())).toList();

        productDto.setImages(images);

        return productDto;
    }

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ModelMapper modelMapper;
}
