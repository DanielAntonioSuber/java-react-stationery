import { useEffect, useState } from 'react'

import { deleteProductRequest, getProductsRequest, PaginationParams, ProductResponse } from '@/api'

import { PaginationOptionsReturn, useConfirmDialog, UseConfirmDialogReturn, usePaginationOptions } from '@/hooks'

interface UseProductsReturn {
  products: ProductResponse[]
  confirmDialog: Omit<UseConfirmDialogReturn, 'confirm'>
  pagination: Omit<PaginationOptionsReturn, 'setTotalElements'>
  createHandleDeleteProduct: (code: number) => () => void
}

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
  }, [paginationOptions.page, paginationOptions.rowsPerPage])

  const createHandleDeleteProduct: (code: number) => () => void = (code) => async () =>
    await confirm()
      .then(async () => await deleteProductRequest(code))
      .then(() => { fetchProducts({ pageNumber: paginationOptions.page, sizePage: paginationOptions.rowsPerPage }) })
      .catch(() => {

      })

  return {
    products,
    pagination: {
      handleChangePage,
      handleChangeRowsPerPage,
      paginationOptions
    },
    confirmDialog: {
      handleCancel,
      handleClose,
      handleConfirm,
      open
    },
    createHandleDeleteProduct
  }
}

export default useProducts

export type { UseProductsReturn }
