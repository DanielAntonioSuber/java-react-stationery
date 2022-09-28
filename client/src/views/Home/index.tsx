import { AttachMoney, Inventory, LocalShipping, Person } from '@mui/icons-material'
import { Button, Container, Stack } from '@mui/material'
import { ReactElement } from 'react'

function Home (): ReactElement {
  return (
    <Container >
      <Stack spacing={2} margin='5rem'>
        <Button variant="contained" sx={{ height: '80px' }} endIcon={<Inventory />}>
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
