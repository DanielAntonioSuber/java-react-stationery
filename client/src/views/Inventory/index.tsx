import { ReactElement } from 'react'

import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, Container, Typography } from '@mui/material'

import { TablePaginationActions } from '@/components/ui'

function Inventory (): ReactElement {
  return (
    <Container maxWidth='xl'>
      <Typography variant="h2" component='h1'>
        Inventory
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell align="right">Article name</TableCell>
              <TableCell align="right">Retail price</TableCell>
              <TableCell align="right">Wholesale price</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Supplier</TableCell>
              <TableCell align="right">Created at</TableCell>
              <TableCell align="right">Updated at</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={5}
                rowsPerPage={1}
                page={-1}
                onPageChange={() => {}}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page'
                  },
                  native: false
                }}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
        </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Inventory
