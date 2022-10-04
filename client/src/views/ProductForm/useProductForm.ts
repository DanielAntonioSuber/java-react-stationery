import { useState, ChangeEventHandler, ReactNode, FormEventHandler, useEffect } from 'react'

import { SelectChangeEvent } from '@mui/material'

import { useLocation, useNavigate } from 'react-router-dom'
import { createProductRequest } from '@/api/services/product'
import { ProductData, SupplierResponse } from '@/api'
import { getSuppliersRequest } from '@/api/services/supplier'

interface Values {
  amount: number | ''
  articleName: string
  brand: string
  retailPrice: number | ''
  supplierId: number | ''
  wholesalePrice: number | ''
}

interface UseProductFormResponse {
  images: FileList | null
  handleInputChange: ChangeEventHandler<HTMLInputElement>
  handleSelectChange: (event: SelectChangeEvent<number>, child: ReactNode) => void
  handleImageInputchange: ChangeEventHandler<HTMLInputElement>
  isAdd: boolean
  values: Values
  handleSubmit: FormEventHandler<HTMLFormElement>
  suppliers: SupplierResponse[]
}

function useProductForm (): UseProductFormResponse {
  const [values, setValues] = useState<Values>({
    amount: '',
    articleName: '',
    brand: '',
    retailPrice: '',
    supplierId: '',
    wholesalePrice: ''
  })
  const [images, setImages] = useState<FileList | null>(null)
  const [suppliers, setSuppliers] = useState<SupplierResponse[]>([])
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isAdd = pathname.includes('add')

  useEffect(() => {
    getSuppliersRequest({})
      .then(res => setSuppliers(prev => [...res.data.content]))
      .catch(() => {})
  }, [])

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelectChange: (event: SelectChangeEvent<number>, child: ReactNode) => void = (e) => {
    setValues((prev) => ({ ...prev, supplierId: e.target.value as number }))
  }

  const handleImageInputchange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setImages(e.target.files)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (images !== null) {
      createProductRequest({ imageFiles: images, product: values as ProductData }).then(() => {
        navigate('/inventory')
      }).catch(() => {})
    }
  }

  return {
    images,
    handleInputChange,
    handleSelectChange,
    handleImageInputchange,
    isAdd,
    values,
    handleSubmit,
    suppliers
  }
}

export default useProductForm
