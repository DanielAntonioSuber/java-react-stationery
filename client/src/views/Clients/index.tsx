import { ReactElement } from 'react'

import { Link } from 'react-router-dom'
import { Button, Container, Dialog, DialogActions, DialogTitle, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { TablePaginationActions } from '@/components/ui'

import useClients from './useClients'

function Clients (): ReactElement {
  const {
    clients,
    createHandleDeleteClient,
    pagination: {
      handleChangePage,
      handleChangeRowsPerPage,
      paginationOptions
    },
    confirmDialog: { handleCancel, handleClose, handleConfirm, open }
  } = useClients()

  return (
    <>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" margin={2}>
          <Typography component="h1" variant="h2">
            Clients
          </Typography>
          <Stack justifyContent="center">
            <Button
              component={Link}
              to="/clients/add"
              color="secondary"
              variant="outlined"
            >
              Add client
            </Button>
          </Stack>
        </Stack>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 3000, margin: 'auto' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Surname</TableCell>
                <TableCell align="center">Phone number</TableCell>
                <TableCell align="center">Direction</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={`client-${client.id}`}>
                  <TableCell align="center">{client.id}</TableCell>
                  <TableCell align="center">{client.name}</TableCell>
                  <TableCell align="center">{client.surname}</TableCell>
                  <TableCell align="center">{client.phoneNumber}</TableCell>
                  <TableCell align="center">{client.direction}</TableCell>
                  <TableCell align="center">{client.email}</TableCell>
                  <TableCell align="center">
                    <Button component={Link} to={`/clients/${client.id}`}>
                      Show
                    </Button>
                    <Button
                      component={Link}
                      color="warning"
                      to={`/clients/${client.id}/edit`}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      onClick={createHandleDeleteClient(client.id)}
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
          Are you sure to delete this client?
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

export default Clients
