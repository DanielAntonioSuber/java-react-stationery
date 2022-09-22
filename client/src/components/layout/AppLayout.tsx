import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout: FC = () => (
  <>
    <header></header>
    <main>
      <Outlet />
    </main>
    <footer></footer>
  </>
)

export default AppLayout
