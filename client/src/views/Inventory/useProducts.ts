import { useEffect, useState } from 'react'

import { ProductResponse } from '@/api'
import { PaginationOptionsReturn } from '@/hooks/usePaginationOptions'

import { getProductsRequest } from '@/api/services/product'
import { usePaginationOptions } from '@/hooks'

interface UseProductsReturn extends PaginationOptionsReturn {
  products: ProductResponse[]
}

function useProducts (): UseProductsReturn {
  const { handleChangePage, handleChangeRowsPerPage, paginationOptions, setTotalElements } = usePaginationOptions()
  const [products, setProducts] = useState<ProductResponse[]>([])

  useEffect(() => {
    getProductsRequest({})
      .then(res => {
        setProducts(res.data.content)
        setTotalElements(res.data.totalElements)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    getProductsRequest({ pageNumber: paginationOptions.page, sizePage: paginationOptions.rowsPerPage })
      .then(res => {
        setProducts(res.data.content)
        setTotalElements(res.data.totalElements)
      })
      .catch(err => console.log(err))
  }, [paginationOptions.page, paginationOptions.rowsPerPage])

  return {
    products,
    handleChangePage,
    handleChangeRowsPerPage,
    paginationOptions,
    setTotalElements
  }
}

export default useProducts

export type { UseProductsReturn }
