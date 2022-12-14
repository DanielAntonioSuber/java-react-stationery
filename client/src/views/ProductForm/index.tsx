import { ReactElement } from 'react'

import { Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'

import useProductForm from './useProductForm'

function ProductForm (): ReactElement {
  const {
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    isAdd,
    values,
    suppliers
  } = useProductForm()

  return (
    <Container>
      <Typography variant="h2" component="h1" align="center" margin="1rem 0">
        {isAdd ? 'Add Product' : 'Edit product'}
      </Typography>
      <Stack component="form" width="70%" margin="auto" onSubmit={handleSubmit}>
        <TextField
          name="articleName"
          onChange={handleInputChange}
          value={values.articleName}
          label="Artilce name"
          margin="normal"
        />
        <TextField
          name="brand"
          onChange={handleInputChange}
          value={values.brand}
          label="Brand"
          margin="normal"
        />
        <TextField
          name="wholesalePrice"
          onChange={handleInputChange}
          value={values.wholesalePrice}
          label="Wholesale Price"
          margin="normal"
          type="number"
        />
        <TextField
          name="retailPrice"
          onChange={handleInputChange}
          value={values.retailPrice}
          label="Retail Price"
          margin="normal"
          type="number"
        />
        <TextField
          name="amount"
          onChange={handleInputChange}
          value={values.amount}
          label="Amount"
          margin="normal"
          type="number"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="supplier-select">Supplier</InputLabel>
          <Select
            name="supplierId"
            value={values.supplierId}
            onChange={handleSelectChange}
            labelId="supplier-select"
            label="Supplier"
          >
            {suppliers.map((supplier) => (
              <MenuItem key={`supplier-${supplier.id}`} value={supplier.id}>
                {supplier.supplierName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" size="large" type="submit">
          Submit
        </Button>
      </Stack>
    </Container>
  )
}

export default ProductForm
