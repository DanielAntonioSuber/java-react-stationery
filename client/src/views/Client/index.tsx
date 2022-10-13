import { ReactElement, useEffect, useState } from 'react'

import { Container, Stack, Typography } from '@mui/material'

import { useParams } from 'react-router-dom'

import { ClientResponse, getClientByIdRequest } from '@/api'

const initialState: ClientResponse = {
  direction: '',
  email: '',
  id: 0,
  name: '',
  phoneNumber: '',
  surname: ''
}

function Client (): ReactElement {
  const [client, setClient] = useState<ClientResponse>(initialState)
  const { clientId } = useParams()

  useEffect(() => {
    getClientByIdRequest(clientId as unknown as number)
      .then((res) => { setClient(res.data) })
      .catch(() => {})
  }, [])

  return (
    <Container>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        margin="0.5rem auto 1rem"
      >
        Client {client.id}
      </Typography>
      <Stack direction="column" alignItems="center">
          <Typography component="p" variant="body1">
            Id: {client.id}
          </Typography>
          <Typography component="p" variant="body1">
            Name: {client.name}
          </Typography>
          <Typography component="p" variant="body1">
            Surname: {client.surname}
          </Typography>
          <Typography component="p" variant="body1">
            Email: {client.email}
          </Typography>
          <Typography component="p" variant="body1">
            Direction: {client.direction}
          </Typography>
          <Typography component="p" variant="body1">
            Phone number: {client.phoneNumber}
          </Typography>
      </Stack>
    </Container>
  )
}

export default Client
