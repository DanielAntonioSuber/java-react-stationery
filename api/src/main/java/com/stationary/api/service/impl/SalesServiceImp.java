package com.stationary.api.service.impl;

import com.stationary.api.dto.ListResponse;
import com.stationary.api.dto.SaleDto;
import com.stationary.api.entitie.*;
import com.stationary.api.exceptions.AppException;
import com.stationary.api.exceptions.ResourceNotFoundException;
import com.stationary.api.repository.ClientRepository;
import com.stationary.api.repository.EmployeeRepository;
import com.stationary.api.repository.ProductRepository;
import com.stationary.api.repository.SaleRepository;
import com.stationary.api.service.SalesService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Service
public class SalesServiceImp implements SalesService {

    @Transactional(
            rollbackFor = {AppException.class, SQLException.class},
            noRollbackFor = ResourceNotFoundException.class
    )
    @Override
    public SaleDto makeASale(SaleDto saleDto) {
        Sale sale = mapToEntity(saleDto);
        Client client = clientRepository.findById(saleDto.getClientId())
                .orElseThrow(() -> new ResourceNotFoundException("Client", "Id", saleDto.getClientId() + ""));
        Employee employee = employeeRepository.findById(saleDto.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "Id", saleDto.getEmployeeId() + ""));
        Product product = productRepository.findById(saleDto.getProductCode())
                .orElseThrow(() -> new ResourceNotFoundException("Product", "Code", saleDto.getClientId() + ""));

        sale.setClient(client);
        sale.setEmployee(employee);
        sale.setProduct(product);

        int amount = product.getAmount() - saleDto.getAmount();
        product.setAmount(amount);
        productRepository.save(product);

        Sale saleSaved = saleRepository.save(sale);

        return mapToDto(saleSaved);
    }

    @Override
    public SaleDto getSale(Integer saleId) {
        Sale sale = saleRepository.findById(saleId)
                .orElseThrow(() -> new ResourceNotFoundException("Sale", "Id", saleId + ""));

        return mapToDto(sale);
    }


    @Override
    public ListResponse<SaleDto> getSales(int pageNumber, int sizePage, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, sizePage, sort);

        Page<Sale> pageSale = saleRepository.findAll(pageable);

        List<Sale> saleList = pageSale.getContent();

        List<SaleDto> content = saleList.stream().map(this::mapToDto).toList();

        var salesResponse = new ListResponse<SaleDto>();
        salesResponse.setContent(content);
        salesResponse.setLast(pageSale.isLast());
        salesResponse.setPageNumber(pageNumber);
        salesResponse.setSizePage(sizePage);
        salesResponse.setTotalElements(pageSale.getTotalElements());
        salesResponse.setTotalPages(pageSale.getTotalPages());

        return salesResponse;
    }


    private Sale mapToEntity(SaleDto saleDto) {
        return modelMapper.typeMap(SaleDto.class, Sale.class)
                .addMappings(mapper -> {
                    mapper.skip(Sale::setClient);
                    mapper.skip(Sale::setEmployee);
                    mapper.skip(Sale::setEmployee);
                })
                .map(saleDto);
    }

    private SaleDto mapToDto(Sale sale) {
        return modelMapper.typeMap(Sale.class, SaleDto.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getClient().getId(), SaleDto::setClientId);
                    mapper.map(src -> src.getEmployee().getId(), SaleDto::setEmployeeId);
                    mapper.map(src -> src.getProduct().getCode(),SaleDto::setProductCode);
                })
                .map(sale);
    }

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;
}
