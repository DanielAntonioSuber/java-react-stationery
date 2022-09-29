import { lazy, ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Loadable } from '@/components/ui'
import { AppLayout } from '@/components/layout'

import { useAuth } from '@/hooks'

import ProtectedRoute from './ProtectedRoute'

const Login = Loadable(lazy(async () => await import('@/views/Login')))
const Inventory = Loadable(lazy(async () => await import('@/views/Inventory')))
const Home = Loadable(lazy(async () => await import('@/views/Home')))
const Register = Loadable(lazy(async () => await import('@/views/Register')))

function MainRoutes (): ReactElement {
  const [authState] = useAuth()

  return (
    <Routes>
      <Route path='/' element={<AppLayout />} >
        <Route path='login' element={<Login />} />

          <Route index element={
            <ProtectedRoute isAllowed={authState.isLogged} >
              <Home />
            </ProtectedRoute>
          } />
          <Route path='inventory' element={
            <ProtectedRoute isAllowed={authState.isLogged}>
              <Inventory />
            </ProtectedRoute>
          } />
          <Route path='register' element={
            <ProtectedRoute isAllowed={authState.isLogged}>
              <Register />
            </ProtectedRoute>
          } />
        </Route>
    </Routes>
  )
}

export default MainRoutes
