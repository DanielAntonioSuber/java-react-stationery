import { FC, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import AppLayout from '@/components/layout/AppLayout'
import Loadable from '@/components/ui/Loadable'

const Login = Loadable(lazy(async () => await import('@/views/Login')))

const MainRoutes: FC = () => (
  <Routes>
    <Route path='/' element={<AppLayout/>} >
      <Route path='login' element={<Login/>} />
    </Route>
  </Routes>
)

export default MainRoutes
