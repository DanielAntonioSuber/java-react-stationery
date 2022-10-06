import { ReactElement, useEffect, useState } from 'react'

import { Box, Container, ImageList, ImageListItem, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import { getProductRequest } from '@/api/services/product'
import { ProductResponse } from '@/api'

import { BASE_URL_API } from '@/config/appProperties'

const initialState = {
  amount: 0,
  articleName: '',
  brand: '',
  code: 0,
  images: [],
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
        margin="0.5rem auto 4rem"
      >
        Product {product.code}
      </Typography>
      <Stack direction="row">
        <Box margin="auto">
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
        </Box>
        <Box margin="0 auto auto auto">
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
        </Box>
      </Stack>
      <Box margin="5rem auto">
        <ImageList
          sx={{ width: 500, height: 450, margin: 'auto' }}
          cols={product?.images.length}
          rowHeight={164}
        >
          {product.images.map((image) => (
            <ImageListItem key={image.name}>
              <img
                src={`${BASE_URL_API}${image.url}`}
                srcSet={`${BASE_URL_API}${image.url}`}
                loading="lazy"
                alt={image.name}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  )
}

export default Product
