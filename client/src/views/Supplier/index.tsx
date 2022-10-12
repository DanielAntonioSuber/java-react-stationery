import { ReactElement, useEffect, useState } from 'react'

import { Container, Stack, Typography } from '@mui/material'

import { getSupplierRequest, SupplierResponse } from '@/api'

import { useParams } from 'react-router-dom'

const initialState: SupplierResponse = {
  id: 0,
  rfc: '',
  supplierName: ''
}

function Supplier (): ReactElement {
  const [supplier, setSupplier] = useState<SupplierResponse>(initialState)
  const { supplierId } = useParams()

  useEffect(() => {
    getSupplierRequest(supplierId as unknown as number)
      .then((res) => {
        setSupplier(res.data)
      })
      .catch(() => {})
  }, [])

  return (
    <Container>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        margin="0.5rem auto 1.4rem"
      >
        Supplier {supplier.id}
      </Typography>
      <Stack alignItems="center" direction="column">
        <Typography component="p" variant="body1">
          Id: {supplier.id}
        </Typography>
        <Typography component="p" variant="body1">
          Supplier Name: {supplier.supplierName}
        </Typography>
        <Typography component="p" variant="body1">
          RFC: {supplier.rfc}
        </Typography>
      </Stack>
    </Container>
  )
}

export default Supplier
