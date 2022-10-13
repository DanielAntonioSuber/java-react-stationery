import { ReactElement } from 'react'

import { Button, Container, Stack, TextField, Typography } from '@mui/material'

import useClientForm from './useClientForm'

function ClientForm (): ReactElement {
  const { handleInputChange, handleSubmit, isAdd, values } = useClientForm()

  return (
    <Container>
      <Typography component="h1" variant="h2" align="center">
        {isAdd ? 'Add client' : 'Edit client'}
      </Typography>
      <Stack component="form" width="70%" margin="auto" onSubmit={handleSubmit}>
        <TextField label="Name" margin="normal" onChange={handleInputChange} value={values.name} name="name" />
        <TextField label="Surname" margin="normal" onChange={handleInputChange} value={values.surname} name="surname" />
        <TextField label="Phone number" margin="normal" onChange={handleInputChange} value={values.phoneNumber} name="phoneNumber" />
        <TextField label="Direction" margin="normal" onChange={handleInputChange} value={values.direction} name="direction" />
        <TextField label="Email" margin="normal" onChange={handleInputChange} value={values.email} name="email" />
        <Button type="submit" variant="contained" size="large">
          Submit
        </Button>
      </Stack>
    </Container>
  )
}

export default ClientForm
