import { useState, ChangeEventHandler, ReactNode, FormEventHandler, useEffect } from 'react'

import { SelectChangeEvent } from '@mui/material'

import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { createProductRequest, getProductRequest, updateProductRequest } from '@/api/services/product'
import { getSuppliersRequest } from '@/api/services/supplier'

import { ProductData, SupplierResponse } from '@/api'

interface Values {
  amount: number | ''
  articleName: string
  brand: string
  retailPrice: number | ''
  supplierId: number | ''
  wholesalePrice: number | ''
}

interface UseProductFormResponse {
  handleInputChange: ChangeEventHandler<HTMLInputElement>
  handleSelectChange: (
    event: SelectChangeEvent<number>,
    child: ReactNode
  ) => void
  isAdd: boolean
  values: Values
  handleSubmit: FormEventHandler<HTMLFormElement>
  suppliers: SupplierResponse[]
}

const initialValues: Values = {
  amount: '',
  articleName: '',
  brand: '',
  retailPrice: '',
  supplierId: '',
  wholesalePrice: ''
}

function useProductForm (): UseProductFormResponse {
  const [values, setValues] = useState<Values>(initialValues)
  const [suppliers, setSuppliers] = useState<SupplierResponse[]>([])
  const { pathname } = useLocation()
  const { productCode } = useParams()
  const navigate = useNavigate()
  const isAdd = pathname.includes('add')

  useEffect(() => {
    getSuppliersRequest({})
      .then((res) => setSuppliers([...res.data.content]))
      .catch(() => {})

    if (!isAdd && productCode != null) {
      getProductRequest(productCode as unknown as number)
        .then(
          ({
            data: {
              amount,
              articleName,
              brand,
              retailPrice,
              supplierId,
              wholesalePrice
            }
          }) => {
            setValues({
              amount,
              articleName,
              brand,
              retailPrice,
              supplierId,
              wholesalePrice
            })
          }
        )
        .catch(() => {})
    }
  }, [])

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelectChange: (
    event: SelectChangeEvent<number>,
    child: ReactNode
  ) => void = (e) => {
    setValues((prev) => ({ ...prev, supplierId: e.target.value as number }))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (isAdd) {
      createProductRequest(values as ProductData)
        .then(() => {
          navigate('/inventory')
        })
        .catch(() => {})
    } else if (productCode != null) {
      updateProductRequest(
        productCode as unknown as number,
        values as ProductData
      )
        .then(() => {
          navigate('/inventory')
        })
        .catch(() => {})
    }
  }

  return {
    handleInputChange,
    handleSelectChange,
    isAdd,
    values,
    handleSubmit,
    suppliers
  }
}

export default useProductForm
