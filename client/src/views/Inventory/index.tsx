import { ReactElement } from 'react'

import { Link } from 'react-router-dom'

import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, Container, Typography, Button, Dialog, DialogActions, DialogTitle, Stack } from '@mui/material'
import { TablePaginationActions } from '@/components/ui'

import useProducts from './useProducts'

function Inventory (): ReactElement {
  const {
    confirmDialog: { handleCancel, handleClose, handleConfirm, open },
    createHandleDeleteProduct,
    pagination: {
      handleChangePage,
      handleChangeRowsPerPage,
      paginationOptions
    },
    products
  } = useProducts()

  return (
    <>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" margin={2}>
          <Typography variant="h2" component="h1">
            Inventory
          </Typography>
          <Stack justifyContent="center">
            <Button
              component={Link}
              to="/products/add"
              color="secondary"
              variant="outlined"
            >
              Add product
            </Button>
          </Stack>
        </Stack>
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
              {products.map((product) => (
                <TableRow key={`product-${product.code}`}>
                  <TableCell>{product.code}</TableCell>
                  <TableCell align="center">{product.articleName}</TableCell>
                  <TableCell align="center">{product.retailPrice}</TableCell>
                  <TableCell align="center">{product.wholesalePrice}</TableCell>
                  <TableCell align="center">{product.amount}</TableCell>
                  <TableCell align="center">{product.brand}</TableCell>
                  <TableCell align="center">{product.supplierId}</TableCell>
                  <TableCell align="center">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button component={Link} to={`/products/${product.code}`}>
                      Show
                    </Button>
                    <Button
                      component={Link}
                      color="warning"
                      to={`/products/${product.code}/edit`}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      onClick={createHandleDeleteProduct(product.code)}
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
                  colSpan={10}
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
          Are you sure to delete this product?
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

export default Inventory
