import { ReactElement } from 'react'

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
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
          <Button color="inherit">Sell</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
