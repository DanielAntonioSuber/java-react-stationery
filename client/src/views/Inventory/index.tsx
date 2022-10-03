import { ReactElement } from 'react'

import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, Container, Typography, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

import { TablePaginationActions } from '@/components/ui'

import useProducts from './useProducts'

function Inventory (): ReactElement {
  const { handleChangePage, handleChangeRowsPerPage, paginationOptions, products, handleCancel, handleClose, handleConfirm, handleDeleteProduct, open } = useProducts()

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete this product?
        </DialogTitle>
        <DialogActions>
          <Button color="error" onClick={handleConfirm}>
            Delete
          </Button>
          <Button onClick={handleCancel}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth='xl'>
        <Typography variant="h2" component='h1'>
          Inventory
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell align="center">Article name</TableCell>
                <TableCell align="center">Retail price</TableCell>
                <TableCell align="center">Wholesale price</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Brand</TableCell>
                <TableCell align="center">Supplier</TableCell>
                <TableCell align="center">Created at</TableCell>
                <TableCell align="center">Updated at</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(product => (
                <TableRow key={`product-${product.code}`} >
                  <TableCell>{product.code}</TableCell>
                  <TableCell align="center">{product.articleName}</TableCell>
                  <TableCell align="center">{product.retailPrice}</TableCell>
                  <TableCell align="center">{product.wholesalePrice}</TableCell>
                  <TableCell align="center">{product.amount}</TableCell>
                  <TableCell align="center">{product.brand}</TableCell>
                  <TableCell align="center">{product.supplierId}</TableCell>
                  <TableCell align="center">{new Date(product.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="center">{new Date(product.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <Button>Fotos</Button>
                    <Button>Editar</Button>
                    <Button onClick={() => {
                      handleDeleteProduct(product.code)
                    }}>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
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
    </>
  )
}

export default Inventory
