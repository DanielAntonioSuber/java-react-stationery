package com.stationary.api.service.impl;

import com.stationary.api.dto.EmployeeDto;
import com.stationary.api.dto.EmployeeRequest;
import com.stationary.api.dto.ListResponse;
import com.stationary.api.entitie.Employee;
import com.stationary.api.exceptions.AppException;
import com.stationary.api.exceptions.ResourceNotFoundException;
import com.stationary.api.repository.EmployeeRepository;
import com.stationary.api.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImp implements EmployeeService {
    @Override
    public EmployeeDto createEmployee(EmployeeRequest employeeRequest) {
        if (Boolean.TRUE.equals(employeeRepository.existsByRfc(employeeRequest.getRfc()))) {
            throw new AppException(HttpStatus.BAD_REQUEST, "The employee is exists");
        }

        Employee employee = modelMapper.map(employeeRequest, Employee.class);
        employee.setPassword(passwordEncoder.encode(employeeRequest.getPassword()));

        Employee savedEmployee = employeeRepository.save(employee);
        savedEmployee.setPassword(null);

        return mapToDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Integer employeeId) {
        Employee employeeFound = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException(EMPLOYEE, "Id", employeeId + ""));
        return mapToDto(employeeFound);
    }

    @Override
    public ListResponse<EmployeeDto> getEmployees(int pageNumber, int sizePage, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, sizePage, sort);

        Page<Employee> pageEmployee = employeeRepository.findAll(pageable);

        List<Employee> employeeList = pageEmployee.getContent();

        List<EmployeeDto> content = employeeList.stream().map(this::mapToDto).toList();

        var employeesResponse = new ListResponse<EmployeeDto>();
        employeesResponse.setContent(content);
        employeesResponse.setLast(pageEmployee.isLast());
        employeesResponse.setPageNumber(pageNumber);
        employeesResponse.setSizePage(sizePage);
        employeesResponse.setTotalElements(pageEmployee.getTotalElements());
        employeesResponse.setTotalPages(pageEmployee.getTotalPages());

        return employeesResponse;
    }

    @Override
    public EmployeeDto getEmployeeByRfc(String rfc) {
        Employee employeeFound = employeeRepository.findByRfc(rfc).orElseThrow(() -> new ResourceNotFoundException(EMPLOYEE, "Rfc", rfc));
        return mapToDto(employeeFound);
    }

    @Override
    public EmployeeDto getEmployeeByEmail(String email) {
        Employee employeeFound = employeeRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException(EMPLOYEE, "Email", email));
        return mapToDto(employeeFound);
    }

    @Override
    public EmployeeDto updateEmployeeById(Integer employeeId, EmployeeRequest employeeRequest) {
        Employee employeeFound = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException(EMPLOYEE, "Id", employeeId + ""));

        Employee employee = mapToEntity(employeeRequest);
        employee.setId(employeeFound.getId());
        employee.setPassword(passwordEncoder.encode(employeeRequest.getPassword()));

        Employee employeeUpdated = employeeRepository.save(employee);

        return mapToDto(employeeUpdated);
    }

    @Override
    public void deleteEmployeeById(Integer employeeId) {
        employeeRepository.deleteById(employeeId);
    }


    private Employee mapToEntity(EmployeeRequest employeeRequest) {
        return modelMapper.map(employeeRequest, Employee.class);
    }

    private EmployeeDto mapToDto(Employee employee) {
        return modelMapper.map(employee, EmployeeDto.class);
    }

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    public static final String EMPLOYEE = "Employee";
}
