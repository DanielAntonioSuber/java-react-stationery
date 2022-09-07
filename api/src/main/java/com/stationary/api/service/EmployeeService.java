package com.stationary.api.service;

import com.stationary.api.dto.EmployeeDto;
import com.stationary.api.dto.EmployeeRequest;
import com.stationary.api.dto.ListResponse;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeRequest employeeRequest);

    EmployeeDto getEmployeeById(Integer employeeId);

    EmployeeDto getEmployeeByRfc(String rfc);

    EmployeeDto getEmployeeByEmail(String email);

    ListResponse<EmployeeDto> getEmployees(int pageNumber, int sizePage, String sortBy, String sortDir);

    EmployeeDto updateEmployeeById(Integer employeeId, EmployeeRequest employeeRequest);

    void deleteEmployeeById(Integer employeeId);

}
