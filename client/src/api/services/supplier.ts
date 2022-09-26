import { AxiosResponse } from 'axios'
import { ListResponse, PaginationParams, ProductResponse, SupplierData, SupplierResponse } from '..'
import api from '../api'

const createSupplierRequest = async (data: SupplierData): Promise<AxiosResponse<SupplierResponse, any>> =>
  await api.post('/suppliers', data)

const getSupplierRequest = async (id: number): Promise<AxiosResponse<SupplierData, any>> =>
  await api.get(`/suppliers/${id}`)

const getSuppliersRequest = async (paginationParams: PaginationParams): Promise<AxiosResponse<ListResponse<ProductResponse>, any>> => {
  const params = new URLSearchParams()

  Object.entries(paginationParams).forEach(([key, value]) => {
    params.set(key, value)
  })

  return await api.get(`/suppliers/${params.toString()}`)
}

const updateSupplierRequest = async (id: number, data: SupplierData): Promise<AxiosResponse<SupplierData, any>> =>
  await api.put(`/suppliers/${id}`, data)

const deleteSupplierRequest = async (id: number): Promise<AxiosResponse<string, any>> =>
  await api.delete(`/suppliers/${id}`)

export {
  createSupplierRequest,
  getSupplierRequest,
  getSuppliersRequest,
  updateSupplierRequest,
  deleteSupplierRequest
}
