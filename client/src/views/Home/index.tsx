import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { AttachMoney, Inventory, LocalShipping, Person } from '@mui/icons-material'
import { Button, Container, Stack } from '@mui/material'

function Home (): ReactElement {
  return (
    <Container >
      <Stack spacing={2} margin='5rem'>
        <Button variant="contained" sx={{ height: '80px' }} component={Link} endIcon={<Inventory />} to="/inventory" >
          Inventory
        </Button>
        <Button variant="contained" sx={{ height: '80px' }} endIcon={<AttachMoney />}>
          Sell
        </Button>
        <Button variant="contained" sx={{ height: '80px' }} endIcon={<Person />}>
          Clients
        </Button>
        <Button variant="contained" sx={{ height: '80px' }} endIcon={<LocalShipping />} component={Link} to="/suppliers">
          Suppliers
        </Button>
      </Stack>
    </Container>
  )
}

export default Home
