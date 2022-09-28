import { ReactElement } from 'react'
import { Navigate, Outlet, To } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactElement
  isAllowed: boolean
  redirectTo?: To
}

function ProtectedRoute ({ children, isAllowed, redirectTo = '/login' }: ProtectedRouteProps): ReactElement {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />
  }

  return children ?? <Outlet />
}

export default ProtectedRoute
