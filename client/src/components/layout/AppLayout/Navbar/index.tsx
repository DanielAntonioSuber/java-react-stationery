import { ReactElement } from 'react'

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

function Navbar (): ReactElement {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stationery
          </Typography>
          <Button color="inherit">Inventory</Button>
          <Button color="inherit">Clients</Button>
          <Button color="inherit">Sell</Button>
          <Button color="inherit">Supplier</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
