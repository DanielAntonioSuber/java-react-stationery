import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '@/hooks/useAuth'

function useLogin (): {
  handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  handleSubmit: FormEventHandler<HTMLFormElement>
  toggleShowPassword: MouseEventHandler
  showPassword: boolean
  values: {
    password: string
    emailOrRfc: string
  }
} {
  const [values, setValues] = useState({ password: '', emailOrRfc: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [authContext, actions] = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    authContext.isLogged && navigate('/')
  }, [])

  const handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const toggleShowPassword: MouseEventHandler = () => setShowPassword(prev => !prev)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    actions.login(values)
      .then(() => navigate('/'))
      .catch((err) => console.error(err))
  }

  return { values, handleInputChange, handleSubmit, toggleShowPassword, showPassword }
}

export default useLogin
