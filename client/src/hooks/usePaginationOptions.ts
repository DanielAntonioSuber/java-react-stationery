import { ChangeEventHandler, useState } from 'react'

interface PaginationOptions {
  page: number
  rowsPerPage: number
  totalElements: number
}

interface PaginationOptionsReturn {
  paginationOptions: PaginationOptions
  handleChangePage: (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  handleChangeRowsPerPage: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  setTotalElements: (totalElements: number) => void
}

function usePaginationOptions (totalElements: number = 10): PaginationOptionsReturn {
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    page: 0,
    rowsPerPage: 5,
    totalElements
  })

  const handleChangePage: (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void = (
    _event,
    newPage
  ) => {
    setPaginationOptions(prev => ({ ...prev, page: newPage }))
  }

  const handleChangeRowsPerPage: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setPaginationOptions(prev => (
      { ...prev, rowsPerPage: parseInt(event.target.value, 10), page: 0 }
    ))
  }

  const setTotalElements: (totalElements: number) => void = (totalElements) => {
    setPaginationOptions(prev => ({ ...prev, totalElements }))
  }

  return {
    paginationOptions,
    handleChangePage,
    handleChangeRowsPerPage,
    setTotalElements
  }
}

export default usePaginationOptions

export type { PaginationOptions, PaginationOptionsReturn }
