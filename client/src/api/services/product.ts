import { AxiosResponse } from 'axios'
import { URLSearchParams } from 'url'

import api from '../api'

import { CreateProductData, ListResponse, PaginationParams, ProductResponse } from '..'

const createProductRequest = async (data: CreateProductData): Promise<AxiosResponse<ProductResponse, any>> =>
  await api.postForm('/products', data)

const getProductRequest = async (code: number): Promise<AxiosResponse<ProductResponse, any>> =>
  await api.get(`/products/${code}`)

const getProducts = async (paginationParams: PaginationParams): Promise<AxiosResponse<ListResponse<ProductResponse>, any>> => {
  const params = new URLSearchParams()

  Object.entries(paginationParams).forEach(([key, value]) => {
    params.set(key, value)
  })

  return await api.get('/products')
}

const updateProductRequest = async (code: number, data: CreateProductData): Promise<AxiosResponse<ProductResponse, any>> =>
  await api.put('/products', data)

const deleteProductRequest = async (code: number): Promise<AxiosResponse<string, any>> => await api.delete('/products')

export {
  createProductRequest,
  getProductRequest,
  getProducts,
  updateProductRequest,
  deleteProductRequest
}