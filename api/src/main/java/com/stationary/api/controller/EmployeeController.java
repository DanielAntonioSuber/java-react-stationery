package com.stationary.api.controller;

import com.stationary.api.dto.EmployeeDto;
import com.stationary.api.dto.EmployeeRequest;
import com.stationary.api.dto.ListResponse;
import com.stationary.api.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/employee")
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
    public ListResponse<EmployeeDto> getEmployees(@RequestParam(name = "pageNumber", value = "0") Integer pageNumber,
                                                  @RequestParam(name = "sizePage", value = "10") Integer sizePage,
                                                  @RequestParam(name = "sortBy", value = "id") String sortBy,
                                                  @RequestParam(name = "sortDir", value = "ASC") String sortDir) {
        return employeeService.getEmployees(pageNumber, sizePage, sortBy, sortDir);
    }

    @PutMapping("/{employeeId}")
    public ResponseEntity<String> updateEmployee(@PathVariable("employeeId") Integer employeeId, @Valid @RequestBody EmployeeRequest employeeRequest) {
        employeeService.updateEmployeeById(employeeId, employeeRequest);

        return new ResponseEntity<>("Was updated", HttpStatus.OK);
    }

    @DeleteMapping("/{employeeId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("employeeId") Integer employeeId) {
        employeeService.deleteEmployeeById(employeeId);

        return new ResponseEntity<>("Was deleted", HttpStatus.OK);
    }

    @Autowired
    private EmployeeService employeeService;
}
