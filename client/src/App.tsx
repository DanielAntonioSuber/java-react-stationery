import { CssBaseline } from '@mui/material'
import { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { MainRoutes } from './routes'

function App (): ReactElement {
  return (
    <BrowserRouter>
      <CssBaseline />
      <MainRoutes />
    </BrowserRouter>
  )
}

export default App
