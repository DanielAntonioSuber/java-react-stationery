export interface ListResponse<T> {
  content: T[]
  sizePage: number
  totalPages: number
  totalElements: number
  last: boolean
}

export interface PaginationParams {
  pageNumber?: number
  sizePage?: number
  sortBy?: string
  sortDir?: string
}

export * from './services/client'
export * from './services/product'
export * from './services/supplier'
