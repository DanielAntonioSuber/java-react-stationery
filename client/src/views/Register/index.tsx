import { ReactElement } from 'react'

import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { Send } from '@mui/icons-material'

function Register (): ReactElement {
  return (
    <Container>
      <Typography variant='h2' component='h1' align='center'>
        Register Employee
      </Typography>
      <Stack component='form' width='60%' margin='auto'>
        <TextField label='Name' margin='normal' />
        <TextField label='Surname' margin='normal' />
        <FormControl fullWidth margin='normal'>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Role"
          >
            <MenuItem value={10}>Admin</MenuItem>
            <MenuItem value={20}>Seller</MenuItem>
          </Select>
        </FormControl>
        <TextField label='Email' margin='normal' />
        <TextField label='Direction' margin='normal' />
        <TextField label='Salary' margin='normal' />
        <TextField label='Schedule' margin='normal' />
        <TextField label='Rfc' margin='normal' />
        <TextField label='Phone number' margin='normal' />
        <TextField label='password' margin='normal' type='password' />
        <Button variant="contained" endIcon={<Send />}>
          Send
        </Button>
      </Stack>
    </Container>
  )
}

export default Register
