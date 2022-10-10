import { MouseEvent, MouseEventHandler, ReactElement } from 'react'

import { Box, IconButton, useTheme } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight, LastPage as LastPageIcon, FirstPage as FirstPageIcon } from '@mui/icons-material'

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (
    event: MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void
}

function TablePaginationActions (props: TablePaginationActionsProps): ReactElement {
  const { count, page, rowsPerPage, onPageChange } = props
  const theme = useTheme()

  const handleFirstPageButtonClick: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 5 }}>
      <Box sx={{ flexShrink: 0, ml: 3 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    </Box>
  )
}

export default TablePaginationActions
