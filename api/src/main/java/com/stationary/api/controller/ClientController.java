package com.stationary.api.controller;

import com.stationary.api.dto.ClientDto;
import com.stationary.api.dto.ListResponse;
import com.stationary.api.service.ClientService;
import com.stationary.api.utils.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @PostMapping
    public ResponseEntity<ClientDto> saveClient(@Valid @RequestBody ClientDto clientDto) {
        ClientDto savedClient = clientService.saveClient(clientDto);

        return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
    }

    @GetMapping("/id/{id}")
    public ClientDto getClientById(@PathVariable(name = "id") Integer id) {
        return clientService.getClientById(id);
    }

    @GetMapping("/name")
    public ClientDto getClientByFullName(@RequestParam(name = "name") String name,
                                         @RequestParam(name = "surname") String surname) {
        return clientService.getClientByFullName(name, surname);
    }

    @GetMapping
    public ListResponse<ClientDto> getClients(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer pageNumber,
            @RequestParam(name = "sizePage", defaultValue = AppConstants.DEFAULT_SIZE_PAGE) Integer sizePage,
            @RequestParam(name = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(name = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIR) String sortDir) {

        return clientService.getClients(pageNumber, sizePage, sortBy, sortDir);
    }

    @PutMapping("/{id}")
    public ClientDto updateClient(@PathVariable(name = "id") Integer id, @Valid @RequestBody ClientDto clientDto) {
        return clientService.updateClient(id, clientDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClient(@PathVariable(name = "id") Integer id) {
        clientService.deleteClient(id);
        return new ResponseEntity<>("Client was deleted", HttpStatus.OK);
    }

    @Autowired
    private ClientService clientService;
}
