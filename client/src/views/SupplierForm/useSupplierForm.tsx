import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react'

import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { SupplierData } from '@/api'
import { createSupplierRequest, getSupplierRequest, updateSupplierRequest } from '@/api/services/supplier'

interface Values {
  supplierName: string
  rfc: string
}

interface UseSupplierFormReturn {
  isAdd: boolean
  values: Values
  handleInputChange: ChangeEventHandler<HTMLInputElement>
  handleSubmit: FormEventHandler<HTMLFormElement>
}

const initialValues: Values = {
  supplierName: '',
  rfc: ''
}

function useSupplierForm (): UseSupplierFormReturn {
  const [values, setValues] = useState<Values>(initialValues)
  const { pathname } = useLocation()
  const { supplierId } = useParams()
  const navigate = useNavigate()

  const isAdd = pathname.includes('add')

  useEffect(() => {
    if (!isAdd && supplierId !== null) {
      getSupplierRequest(supplierId as unknown as number)
        .then(({ data: { rfc, supplierName } }) => { setValues({ rfc, supplierName }) })
        .catch(() => {})
    }
  }, [])

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (isAdd) {
      createSupplierRequest(values as SupplierData)
        .then(() => navigate(-1))
        .catch(() => {})
    } else {
      updateSupplierRequest(supplierId as unknown as number, values as SupplierData)
        .then(() => navigate(-1))
        .catch(() => {})
    }
  }

  return {
    isAdd,
    values,
    handleInputChange,
    handleSubmit
  }
}

export default useSupplierForm
