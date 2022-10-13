import { ClientData, createClientRequest, getClientByIdRequest, updateClientResponse } from '@/api'
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

interface Values extends ClientData {}

interface UseClientFormReturn {
  handleInputChange: ChangeEventHandler<HTMLInputElement>
  handleSubmit: FormEventHandler<HTMLFormElement>
  values: Values
  isAdd: boolean
}

const initialState: Values = {
  direction: '',
  email: '',
  name: '',
  phoneNumber: '',
  surname: ''
}

function useClientForm (): UseClientFormReturn {
  const [values, setValues] = useState<Values>(initialState)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { clientId } = useParams()

  const isAdd = pathname.includes('add')

  useEffect(() => {
    if (!isAdd && clientId !== null) {
      getClientByIdRequest(clientId as unknown as number)
        .then((res) => { setValues(res.data) })
        .catch(() => {})
    }
  }, [])

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (isAdd) {
      createClientRequest(values)
        .then(() => { navigate(-1) })
        .catch(() => {})
    } else {
      updateClientResponse(clientId as unknown as number, values)
        .then(() => { navigate(-1) })
        .catch(() => {})
    }
  }

  return {
    handleInputChange,
    handleSubmit,
    values,
    isAdd
  }
}

export default useClientForm
