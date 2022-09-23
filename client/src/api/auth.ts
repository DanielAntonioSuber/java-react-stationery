import { AxiosResponse } from 'axios'

import api from './api'

interface EmployeeData {
  name: string
  surname: string
  role: string
  email: string
  direction: string
  salary: string
  schedule: string
  rfc: string
  phoneNumber: string
  password: string
}

interface LoginRespone {
  accessToken: string
  kindToken: string
}

interface LoginRequestData {
  emailOrRfc: string
  password: string
}

interface RegisterResponse extends EmployeeData {
  id: number
  createdAt: Date
  updatedAt: Date
}

const loginRequest = async (data: LoginRequestData): Promise<AxiosResponse<LoginRespone>> =>
  await api.post('/auth/login', data)

const registerRequest = async (data: EmployeeData): Promise<AxiosResponse<RegisterResponse>> =>
  await api.post('/auth/register', data)

export { loginRequest, registerRequest }
