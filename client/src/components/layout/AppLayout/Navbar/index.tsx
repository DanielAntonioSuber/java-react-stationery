import { ReactElement } from 'react'

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function Navbar (): ReactElement {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, color: 'ButtonFace', textDecoration: 'none' }}
          >
            Stationery
          </Typography>
          <Button color="inherit">Inventory</Button>
          <Button color="inherit">Clients</Button>
          <Button color="inherit">Sell</Button>
          <Button color="inherit">Supplier</Button>
          <Button color="inherit" startIcon={<AddCircle />}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
