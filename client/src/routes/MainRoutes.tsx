import { FC, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Loadable } from '@/components/ui'
import { AppLayout } from '@/components/layout'

const Login = Loadable(lazy(async () => await import('@/views/Login')))
const Inventory = Loadable(lazy(async () => await import('@/views/Inventory')))

const MainRoutes: FC = () => (
  <Routes>
    <Route path='/' element={<AppLayout/>} >
      <Route path='login' element={<Login/>} />
      <Route path='inventory' element={<Inventory />} />
    </Route>
  </Routes>
)

export default MainRoutes
