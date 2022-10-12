import { useEffect, useState } from 'react'

import { deleteSupplierRequest, getSuppliersRequest, PaginationParams, SupplierResponse } from '@/api'
import { PaginationOptionsReturn, useConfirmDialog, UseConfirmDialogReturn, usePaginationOptions } from '@/hooks'

interface UseSupplierResponse {
  suppliers: SupplierResponse[]
  pagination: Omit<PaginationOptionsReturn, 'setTotalElements'>
  confirmDialog: Omit<UseConfirmDialogReturn, 'confirm'>
  createHandleDeleteSupplier: (id: number) => () => void
}

function useSuppliers (): UseSupplierResponse {
  const [suppliers, setSuppliers] = useState<SupplierResponse[]>([])
  const { handleChangePage, handleChangeRowsPerPage, paginationOptions, setTotalElements } = usePaginationOptions()
  const { confirm, handleCancel, handleClose, handleConfirm, open } = useConfirmDialog()

  const fetchSuppliers: (paginationParams: PaginationParams) => void = (
    paginationParams
  ) => {
    getSuppliersRequest(paginationParams)
      .then((res) => {
        setSuppliers(res.data.content)
        setTotalElements(res.data.totalElements)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchSuppliers({
      pageNumber: paginationOptions.page,
      sizePage: paginationOptions.rowsPerPage
    })
  }, [paginationOptions.page, paginationOptions.rowsPerPage])

  const createHandleDeleteSupplier: (id: number) => () => void = (id) => async () => {
    await confirm()
      .then(async () => await deleteSupplierRequest(id))
      .then(() => { fetchSuppliers({ pageNumber: paginationOptions.page, sizePage: paginationOptions.rowsPerPage }) })
      .catch(() => {

      })
  }

  return {
    suppliers,
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
    createHandleDeleteSupplier
  }
}

export default useSuppliers
