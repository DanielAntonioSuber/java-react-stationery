import { ReactElement } from 'react'

import { Button, Container, Dialog, DialogActions, DialogTitle, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { TablePaginationActions } from '@/components/ui'

import useSuppliers from './useSuppliers'

function Suppliers (): ReactElement {
  const {
    suppliers,
    createHandleDeleteSupplier,
    pagination: {
      handleChangePage,
      handleChangeRowsPerPage,
      paginationOptions
    },
    confirmDialog: { handleCancel, handleClose, handleConfirm, open }
  } = useSuppliers()

  return (
    <>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" margin={2}>
          <Typography variant="h2" component="h1">
            Suppliers
          </Typography>
          <Stack justifyContent="center">
            <Button
              component={Link}
              to="/suppliers/add"
              color="secondary"
              variant="outlined"
            >
              Add supplier
            </Button>
          </Stack>
        </Stack>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1000, margin: 'auto' }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="center">Supplier name</TableCell>
                <TableCell align="center">rfc</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={`supplier-${supplier.id}`}>
                  <TableCell>{supplier.id}</TableCell>
                  <TableCell align="center">{supplier.supplierName}</TableCell>
                  <TableCell align="center">{supplier.rfc}</TableCell>
                  <TableCell align="center">
                    <Button component={Link} to={`/suppliers/${supplier.id}/`}>
                      Show
                    </Button>
                    <Button
                      color="warning"
                      component={Link}
                      to={`/suppliers/${supplier.id}/edit`}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      onClick={createHandleDeleteSupplier(supplier.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={4}
                  count={paginationOptions.totalElements}
                  rowsPerPage={paginationOptions.rowsPerPage}
                  page={paginationOptions.page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete this supplier?
        </DialogTitle>
        <DialogActions>
          <Button color="error" onClick={handleConfirm}>
            Delete
          </Button>
          <Button onClick={handleCancel}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Suppliers
