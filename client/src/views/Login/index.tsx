import { ReactElement } from 'react'

import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import useLogin from './useLogin'

function Login (): ReactElement {
  const { handleInputChange, handleSubmit, showPassword, toggleShowPassword, values } = useLogin()

  return (
    <Box
      bgcolor="Background"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        bgcolor="whitesmoke"
        borderRadius="10px"
        minWidth="18%"
        padding="1.5rem"
      >
        <Typography variant="h2" component="h1" align="center">
          Login
        </Typography>
        <Stack component="form" margin="10px" onSubmit={handleSubmit}>
          <TextField
            name="emailOrRfc"
            label="Email Or RFC"
            margin="normal"
            onChange={handleInputChange}
            value={values.emailOrRfc}
          />
          <FormControl variant="outlined" margin='normal'>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button variant="contained" type="submit" size="large">
            Envíar
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default Login
