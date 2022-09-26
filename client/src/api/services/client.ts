import { AxiosResponse } from 'axios'

import api from '../api'

import { ClientData, ClientResponse, ListResponse, PaginationParams } from '..'

const createClientRequest = async (data: ClientData): Promise<AxiosResponse<ClientResponse, any>> =>
  await api.post('/clients', data)

const getClientByIdRequest = async (id: number): Promise<AxiosResponse<ClientResponse, any>> =>
  await api.get(`/clients/id/${id}`)

const getClientByFullname = async (name: string, surname: string): Promise<AxiosResponse<ClientResponse, any>> => {
  const params = new URLSearchParams()

  params.set('name', name)
  params.set('surname', surname)

  return await api.get(`/name?${params.toString()}`)
}

const getClientsRequest = async (paginationParams: PaginationParams): Promise<AxiosResponse<ListResponse<ClientResponse>, any>> => {
  const params = new URLSearchParams()

  Object.entries(paginationParams).forEach(([key, value]) => {
    params.set(key, value)
  })
  const isEmpty = Array.from(params.values()).length === 0

  return await api.get(`/clients/${isEmpty ? '' : '?'}${params.toString()}`)
}

const updateClientResponse = async (id: number, data: ClientData): Promise<AxiosResponse<ClientResponse, any>> =>
  await api.put(`/clients/${id}`, data)

const deleteClientResponse = async (id: number): Promise<AxiosResponse<string, any>> =>
  await api.delete(`/clients/${id}`)

export {
  createClientRequest,
  getClientByIdRequest,
  getClientByFullname,
  getClientsRequest,
  updateClientResponse,
  deleteClientResponse
}
