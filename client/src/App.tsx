import { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { CssBaseline } from '@mui/material'

import { MainRoutes } from './routes'
import { AuthProvider } from './contexts/AuthContext'

function App (): ReactElement {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CssBaseline />
        <MainRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
