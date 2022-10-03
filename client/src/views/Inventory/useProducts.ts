import { useEffect, useState } from 'react'

import { PaginationParams, ProductResponse } from '@/api'
import { PaginationOptionsReturn } from '@/hooks/usePaginationOptions'

import { deleteProductRequest, getProductsRequest } from '@/api/services/product'
import { useConfirmDialog, usePaginationOptions } from '@/hooks'
import { UseConfirmDialogReturn } from '@/hooks/useConfirmDialog'

type UseProductsReturn = Omit<PaginationOptionsReturn, 'setTotalElements'> & {
  products: ProductResponse[]
  handleDeleteProduct: (code: number) => void
} & Omit<UseConfirmDialogReturn, 'confirm'>

function useProducts (): UseProductsReturn {
  const [products, setProducts] = useState<ProductResponse[]>([])
  const { confirm, handleClose, handleCancel, handleConfirm, open } = useConfirmDialog()
  const { handleChangePage, handleChangeRowsPerPage, paginationOptions, setTotalElements } = usePaginationOptions()

  const fetchProducts: (paginationParams?: PaginationParams) => void = (paginationParams = {}) => {
    getProductsRequest(paginationParams)
      .then(res => {
        setProducts(res.data.content)
        setTotalElements(res.data.totalElements)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchProducts({ pageNumber: paginationOptions.page, sizePage: paginationOptions.rowsPerPage })
  }, [])

  useEffect(() => {
    fetchProducts({ pageNumber: paginationOptions.page, sizePage: paginationOptions.rowsPerPage })
  }, [paginationOptions.page, paginationOptions.rowsPerPage])

  const handleDeleteProduct: (code: number) => void = (code) => {
    confirm()
      .then(async () => await deleteProductRequest(code))
      .then(() => { fetchProducts({ pageNumber: paginationOptions.page, sizePage: paginationOptions.rowsPerPage }) })
      .catch(() => {

      })
  }

  return {
    products,
    handleChangePage,
    handleChangeRowsPerPage,
    paginationOptions,
    handleCancel,
    handleClose,
    handleConfirm,
    open,
    handleDeleteProduct
  }
}

export default useProducts

export type { UseProductsReturn }
