import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

const MainRoutes: FC = () => (
  <Routes>
    <Route path='/' element={<h1>Hola</h1>} />
  </Routes>
)
export default MainRoutes
