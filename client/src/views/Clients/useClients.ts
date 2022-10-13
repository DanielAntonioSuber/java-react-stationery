import { ClientResponse, deleteClientResponse, getClientsRequest, PaginationParams } from '@/api'
import { PaginationOptionsReturn, useConfirmDialog, UseConfirmDialogReturn, usePaginationOptions } from '@/hooks'
import { useEffect, useState } from 'react'

interface UseClientsReturn {
  clients: ClientResponse[]
  pagination: Omit<PaginationOptionsReturn, 'setTotalElements'>
  confirmDialog: Omit<UseConfirmDialogReturn, 'confirm'>
  createHandleDeleteClient: (clientId: number) => () => void
}

function useClients (): UseClientsReturn {
  const [clients, setClients] = useState<ClientResponse[]>([])
  const { handleChangePage, handleChangeRowsPerPage, paginationOptions, setTotalElements } = usePaginationOptions()
  const { confirm, handleCancel, handleClose, handleConfirm, open } = useConfirmDialog()

  const fetchClients: (paginationParams: PaginationParams) => void = (paginationParams) => {
    getClientsRequest(paginationParams)
      .then((res) => {
        setClients(res.data.content)
        setTotalElements(res.data.totalElements)
      })
      .catch(() => {})
  }

  useEffect(() => {
    fetchClients({ pageNumber: paginationOptions.page, sizePage: paginationOptions.rowsPerPage })
  }, [paginationOptions.page, paginationOptions.rowsPerPage])

  const createHandleDeleteClient: (clientId: number) => () => void = (clientId) => async () => {
    await confirm()
      .then(async () => await deleteClientResponse(clientId))
      .then(() => { fetchClients({ pageNumber: paginationOptions.page, sizePage: paginationOptions.rowsPerPage }) })
      .catch()
  }

  return {
    clients,
    createHandleDeleteClient,
    pagination: {
      paginationOptions,
      handleChangePage,
      handleChangeRowsPerPage
    },
    confirmDialog: {
      handleCancel,
      handleClose,
      handleConfirm,
      open
    }
  }
}

export default useClients
