import { createContext, ReactElement, ReactNode, Reducer, useReducer } from 'react'

import { AxiosResponse } from 'axios'

import { LoginData, LoginRespone } from '@/api'
import { loginRequest, removeTokenInHeader, setTokenInHeaders } from '@/api/auth'

interface AuthState {
  isLogged: boolean
  employee: {
    emailOrRfc: string
    role: string
  } | null
}

interface AuthActions {
  logout: () => void
  login: (loginData: LoginData) => Promise<AxiosResponse<LoginRespone, any>>
}

type AuthContextType = [AuthState, AuthActions]

type AuthAction =
  | { type: 'logout' }
  | { type: 'loginSucces', payload: { emailOrRfc: string, role: string } }

const AuthContext = createContext<AuthContextType | null>(null)

const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  switch (action.type) {
    case 'logout':
      return { isLogged: false, employee: null }
    case 'loginSucces':
      return { isLogged: true, employee: action.payload }
    default:
      return state
  }
}

const initialState: AuthState = {
  employee: null,
  isLogged: false
}

function AuthProvider ({ children }: { children: ReactNode }): ReactElement {
  const [authState, authDispatch] = useReducer(authReducer, initialState)

  const login = async (loginData: LoginData): Promise<AxiosResponse<LoginRespone, any>> => {
    const res = await loginRequest(loginData)

    setTokenInHeaders(res.data.kindToken, res.data.accessToken)

    authDispatch({
      type: 'loginSucces',
      payload: {
        emailOrRfc: loginData.emailOrRfc,
        role: res.data.role
      }
    })

    return res
  }

  const logout = (): void => {
    removeTokenInHeader()
    authDispatch({ type: 'logout' })
  }

  const actions: AuthActions = {
    login,
    logout
  }

  return (
    <AuthContext.Provider value={[authState, actions]}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }

export type { AuthActions, AuthContextType, AuthState, AuthAction }
