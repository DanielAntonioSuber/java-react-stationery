import { AxiosResponse } from 'axios'

import api from './api'

import { EmployeeData, LoginRequestData, LoginRespone, RegisterResponse } from '.'

const loginRequest = async (data: LoginRequestData): Promise<AxiosResponse<LoginRespone>> =>
  await api.post('/auth/login', data)

const registerRequest = async (data: EmployeeData): Promise<AxiosResponse<RegisterResponse>> =>
  await api.post('/auth/register', data)

export { loginRequest, registerRequest }
