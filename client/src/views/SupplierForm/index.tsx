import { ReactElement } from 'react'

import { Button, Container, Stack, TextField, Typography } from '@mui/material'

import useSupplierForm from './useSupplierForm'

function SupplierForm (): ReactElement {
  const { handleInputChange, handleSubmit, isAdd, values } = useSupplierForm()

  return (
    <Container>
      <Typography component="h1" variant="h2" align="center" margin="1rem">
        {isAdd ? 'Add supplier' : 'Edit supplier'}
      </Typography>
      <Stack component="form" width="70%" margin="auto" onSubmit={handleSubmit}>
        <TextField
          name="supplierName"
          onChange={handleInputChange}
          value={values.supplierName}
          label="Supplier name"
          margin="normal"
        />
        <TextField
          name="rfc"
          onChange={handleInputChange}
          value={values.rfc}
          label="rfc"
          margin="normal"
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </Container>
  )
}

export default SupplierForm
