import { ReactElement, useState } from 'react'

import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

function Login (): ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <Box bgcolor='Background' display="flex" justifyContent="center"
      alignItems="center" minHeight="100vh"
    >
      <Box bgcolor='whitesmoke' borderRadius='10px'
        minWidth='18%' padding='1.5rem'
      >
        <Typography variant='h2' component='h1' align='center'>
          Login
        </Typography>
        <Stack component='form' margin='10px'>
          <TextField label='Email Or RFC' margin='normal' />
          <TextField label='Password' margin='normal'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton aria-label="toggle password visibility"
                    onClick={() => setShowPassword(prevValue => !prevValue)}
                    edge='end'
                  />
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              )
            }}
          />
          <Button variant='contained' type='submit' size='large'>
            Envíar
          </Button>
        </Stack>

      </Box>
    </Box>
  )
}

export default Login
