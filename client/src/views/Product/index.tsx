import { ReactElement, useEffect, useState } from 'react'

import { Container, Stack, Typography } from '@mui/material'

import { useParams } from 'react-router-dom'

import { getProductRequest, ProductResponse } from '@/api'

const initialState: ProductResponse = {
  amount: 0,
  articleName: '',
  brand: '',
  code: 0,
  createdAt: '',
  retailPrice: 0,
  supplierId: 0,
  updatedAt: '',
  wholesalePrice: 0
}

function Product (): ReactElement {
  const [product, setProduct] = useState<ProductResponse>(initialState)
  const { productCode } = useParams()

  useEffect(() => {
    getProductRequest(productCode as unknown as number)
      .then((res) => {
        setProduct(res.data)
      })
      .catch(() => {})
  }, [])

  return (
    <Container>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        margin="0.5rem auto 1rem"
      >
        Product {product.code}
      </Typography>
      <Stack direction="column" alignItems="center">
          <Typography component="p" variant="body1">
            Code: {product?.code}
          </Typography>
          <Typography component="p" variant="body1">
            Article Name: {product?.articleName}
          </Typography>
          <Typography component="p" variant="body1">
            Amount: {product?.amount}
          </Typography>
          <Typography component="p" variant="body1">
            Brand: {product?.brand}
          </Typography>
          <Typography component="p" variant="body1">
            Retail Price: {product?.retailPrice}
          </Typography>
          <Typography component="p" variant="body1">
            Wholesale Price: {product?.wholesalePrice}
          </Typography>
          <Typography component="p" variant="body1">
            CreatedAt: {product?.createdAt}
          </Typography>
          <Typography component="p" variant="body1">
            UpdatedAt: {product?.updatedAt}
          </Typography>
          <Typography component="p" variant="body1">
            Supplier: {product?.supplierId}
          </Typography>
      </Stack>
    </Container>
  )
}

export default Product
