package com.stationary.api.service;

import com.stationary.api.dto.ClientDto;
import com.stationary.api.dto.ListResponse;

public interface ClientService {

    ClientDto saveClient (ClientDto clientDto);

    ClientDto getClientById(Integer id);

    ClientDto getClientByFullName(String name, String surname);

    ListResponse<ClientDto> getClients(int pageNumber, int sizePage, String sortBy, String sortDir);

    ClientDto updateClient(Integer id, ClientDto clientDto);

    void deleteClient(Integer id);

}
