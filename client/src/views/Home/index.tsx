import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

import { AttachMoney, Inventory, LocalShipping, Person } from '@mui/icons-material'
import { Button, Container, Stack } from '@mui/material'

function Home (): ReactElement {
  const navigate = useNavigate()

  return (
    <Container >
      <Stack spacing={2} margin='5rem'>
        <Button variant="contained" sx={{ height: '80px' }} endIcon={<Inventory />} onClick={() => navigate('/inventory')}>
          Inventory
        </Button>
        <Button variant="contained" sx={{ height: '80px' }} endIcon={<AttachMoney />}>
          Sell
        </Button>
        <Button variant="contained" sx={{ height: '80px' }} endIcon={<Person />}>
          Clients
        </Button>
        <Button variant="contained" sx={{ height: '80px' }} endIcon={<LocalShipping />}>
          Suppliers
        </Button>
      </Stack>
    </Container>
  )
}

export default Home
