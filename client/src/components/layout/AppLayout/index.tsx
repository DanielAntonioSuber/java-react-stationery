import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from './Navbar'
import { useAuth } from '@/hooks'

function AppLayout (): ReactElement {
  const [{ isLogged }] = useAuth()

  return (
    <>
      {isLogged && (
        <header>
          <Navbar />
        </header>
      )}
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
export default AppLayout
