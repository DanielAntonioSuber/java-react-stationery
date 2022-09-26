import { AxiosResponse } from 'axios'
import { URLSearchParams } from 'url'

import api from '../api'

import { CreateProductData, ListResponse, PaginationParams, ProductResponse } from '..'

const createProductRequest = async (data: CreateProductData): Promise<AxiosResponse<ProductResponse, any>> =>
  await api.postForm('/products', data)

const getProductRequest = async (code: number): Promise<AxiosResponse<ProductResponse, any>> =>
  await api.get(`/products/${code}`)

const getProductsRequest = async (paginationParams: PaginationParams): Promise<AxiosResponse<ListResponse<ProductResponse>, any>> => {
  const params = new URLSearchParams()

  Object.entries(paginationParams).forEach(([key, value]) => {
    params.set(key, value)
  })
  const isEmpty = Array.from(params.values()).length === 0

  return await api.get(`/products/${isEmpty ? '' : '?'}${params.toString()}`)
}

const updateProductRequest = async (code: number, data: CreateProductData): Promise<AxiosResponse<ProductResponse, any>> =>
  await api.put(`/products/${code}`, data)

const deleteProductRequest = async (code: number): Promise<AxiosResponse<string, any>> =>
  await api.delete(`/products/${code}`)

export {
  createProductRequest,
  getProductRequest,
  getProductsRequest,
  updateProductRequest,
  deleteProductRequest
}
