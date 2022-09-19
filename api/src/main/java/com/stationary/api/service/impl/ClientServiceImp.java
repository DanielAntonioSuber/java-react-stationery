package com.stationary.api.service.impl;

import com.stationary.api.dto.ClientDto;
import com.stationary.api.dto.ListResponse;
import com.stationary.api.entitie.Client;
import com.stationary.api.exceptions.ResourceNotFoundException;
import com.stationary.api.repository.ClientRepository;
import com.stationary.api.service.ClientService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImp implements ClientService {
    @Override
    public ClientDto saveClient(ClientDto clientDto) {
        Client newClient = clientRepository.save(mapToEntity(clientDto));
        return mapToDto(newClient);
    }

    @Override
    public ClientDto getClientById(Integer id) {
        Client clientFound = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_NAME, "Id", id+""));

        return mapToDto(clientFound);
    }

    @Override
    public ClientDto getClientByFullName(String name, String surname) {
    Client clientFound = clientRepository.findByNameAndSurname(name, surname)
            .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_NAME, "Name or Surname", name + " " + surname));

        return mapToDto(clientFound);
    }

    @Override
    public ListResponse<ClientDto> getClients(int pageNumber, int sizePage, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, sizePage, sort);

        Page<Client> pageClient = clientRepository.findAll(pageable);

        List<Client> clientList = pageClient.getContent();

        List<ClientDto> content = clientList.stream().map(this::mapToDto).toList();

        var clientsResponse = new ListResponse<ClientDto>();
        clientsResponse.setContent(content);
        clientsResponse.setLast(pageClient.isLast());
        clientsResponse.setPageNumber(pageNumber);
        clientsResponse.setSizePage(sizePage);
        clientsResponse.setTotalElements(pageClient.getTotalElements());
        clientsResponse.setTotalPages(pageClient.getTotalPages());

        return clientsResponse;
    }

    @Override
    public ClientDto updateClient(Integer id, ClientDto clientDto) {
        Client clientFound = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_NAME, "Id", id+""));

        clientFound.setDirection(clientDto.getDirection());
        clientFound.setEmail(clientDto.getEmail());
        clientFound.setName(clientDto.getEmail());
        clientFound.setSurname(clientDto.getSurname());
        clientFound.setPhoneNumber(clientDto.getPhoneNumber());

        Client updatedClient = clientRepository.save(clientFound);

        return mapToDto(updatedClient);
    }

    @Override
    public void deleteClient(Integer id) {
        Client clientFound = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_NAME, "Id", id+""));

        clientRepository.delete(clientFound);
    }

    Client mapToEntity(ClientDto clientDto) {
        return modelMapper.map(clientDto, Client.class);
    }

    ClientDto mapToDto(Client client) {
        return modelMapper.map(client, ClientDto.class);
    }

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ModelMapper modelMapper;

    private static final String RESOURCE_NAME = "Client";
}
