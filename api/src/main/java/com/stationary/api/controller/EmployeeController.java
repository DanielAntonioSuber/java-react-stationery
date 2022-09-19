package com.stationary.api.controller;

import com.stationary.api.dto.EmployeeDto;
import com.stationary.api.dto.EmployeeRequest;
import com.stationary.api.dto.ListResponse;
import com.stationary.api.service.EmployeeService;
import com.stationary.api.utils.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @GetMapping("/id/{employeeId}")
    public EmployeeDto getEmployeeById(@PathVariable("employeeId") Integer employeeId) {
        return employeeService.getEmployeeById(employeeId);
    }

    @GetMapping("/rfc/{employeeRfc}")
    public EmployeeDto getEmployeeByRfc(@PathVariable("employeeRfc") String employeeRfc) {
        return employeeService.getEmployeeByRfc(employeeRfc);
    }

    @GetMapping
    public ListResponse<EmployeeDto> getEmployees(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer pageNumber,
            @RequestParam(name = "sizePage", defaultValue = AppConstants.DEFAULT_SIZE_PAGE) Integer sizePage,
            @RequestParam(name = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(name = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIR) String sortDir) {

        return employeeService.getEmployees(pageNumber, sizePage, sortBy, sortDir);
    }

    @PutMapping("/{employeeId}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("employeeId") Integer employeeId, @Valid @RequestBody EmployeeRequest employeeRequest) {
        EmployeeDto updatedEmployee = employeeService.updateEmployeeById(employeeId, employeeRequest);

        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    @DeleteMapping("/{employeeId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("employeeId") Integer employeeId) {
        employeeService.deleteEmployeeById(employeeId);

        return new ResponseEntity<>("Was deleted", HttpStatus.OK);
    }

    @Autowired
    private EmployeeService employeeService;
}
