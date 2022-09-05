package com.stationary.api.service;

import com.stationary.api.dto.SupplierDto;
import com.stationary.api.dto.SuppliersResponse;
import com.stationary.api.entitie.Supplier;
import com.stationary.api.exceptions.ResourceNotFoundException;
import com.stationary.api.repository.SupplierRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImp implements SupplierService {

    @Override
    public SupplierDto addSupplier(SupplierDto supplierDto) {
        Supplier newSupplier = supplierRepository.save(mapToEntity(supplierDto));
        return mapToDto(newSupplier);
    }

    @Override
    public SupplierDto getSupplierById(Integer supplierId) {
        Supplier supplierFound = supplierRepository.findById(supplierId).orElseThrow(() -> new ResourceNotFoundException(SupplierServiceImp.SUPPLIER, "id", supplierId));
        return mapToDto(supplierFound);
    }

    @Override
    public SuppliersResponse getSuppliers(int pageNumber, int sizePage, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, sizePage, sort);

        Page<Supplier> pageSupplier = supplierRepository.findAll(pageable);

        List<Supplier> supplierList = pageSupplier.getContent();

        List<SupplierDto> content = supplierList.stream().map(this::mapToDto).toList();

        var supplierResponse =  new SuppliersResponse();
        supplierResponse.setContent(content);
        supplierResponse.setLast(pageSupplier.isLast());
        supplierResponse.setPageNumber(pageNumber);
        supplierResponse.setSizePage(sizePage);
        supplierResponse.setTotalElements(pageSupplier.getTotalElements());
        supplierResponse.setTotalPages(pageSupplier.getTotalPages());

        return supplierResponse;
    }

    @Override
    public SupplierDto updateSupplier(Integer supplierId, SupplierDto supplierDto) {
        Supplier supplierFound = supplierRepository.findById(supplierId).orElseThrow(() -> new ResourceNotFoundException(SupplierServiceImp.SUPPLIER, "id", supplierId));

        supplierFound.setSupplierName(supplierDto.getSupplierName());
        supplierFound.setRfc(supplierDto.getRfc());

        Supplier updatedSupplier = supplierRepository.save(supplierFound);

        return mapToDto(updatedSupplier);
    }

    @Override
    public void deleteSupplierById(Integer supplierId) {
        Supplier supplierFound = supplierRepository.findById(supplierId).orElseThrow(() -> new ResourceNotFoundException(SupplierServiceImp.SUPPLIER, "id", supplierId));

        supplierRepository.delete(supplierFound);
    }

    private SupplierDto mapToDto(Supplier supplier) {
        var supplierDto = new SupplierDto();
        supplierDto.setId(supplier.getId());
        supplierDto.setSupplierName(supplier.getSupplierName());
        supplierDto.setRfc(supplier.getRfc());

        return supplierDto;
    }

    private Supplier mapToEntity(SupplierDto supplierDto) {
        var supplier = new Supplier();
        supplier.setId(supplierDto.getId());
        supplier.setSupplierName(supplierDto.getSupplierName());
        supplier.setRfc(supplierDto.getRfc());

        return supplier;

    }

    @Autowired
    private SupplierRepository supplierRepository;

    @Getter
    public static final String SUPPLIER  = "Supplier";
}
