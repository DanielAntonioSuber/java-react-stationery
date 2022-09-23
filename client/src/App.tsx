import { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { CssBaseline } from '@mui/material'

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
