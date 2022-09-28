import { useContext } from 'react'

import { AuthContext, AuthContextType } from '@/contexts/AuthContext'

function useAuth (): AuthContextType {
  const context = useContext(AuthContext)
  if (context == null) throw new Error('There is no Auth provider')
  return context
}

export default useAuth
