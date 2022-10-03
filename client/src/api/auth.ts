import { AxiosResponse } from 'axios'

import api from './api'

import { EmployeeData, LoginData, LoginRespone, RegisterResponse } from '.'

const loginRequest = async (data: LoginData): Promise<AxiosResponse<LoginRespone>> =>
  await api.post('/auth/login', data)

const registerRequest = async (data: EmployeeData): Promise<AxiosResponse<RegisterResponse>> =>
  await api.post('/auth/register', data)

const setTokenInHeaders = (kind: string, token: string): void => {
  api.defaults.headers.post.Authorization = `${kind} ${token}`
  api.defaults.headers.delete.Authorization = `${kind} ${token}`
  api.defaults.headers.put.Authorization = `${kind} ${token}`
}

const removeTokenInHeader = (): void => {
  api.defaults.headers.post.Authorization = ''
  api.defaults.headers.delete.Authorization = ''
  api.defaults.headers.put.Authorization = ''
}

export { loginRequest, registerRequest, setTokenInHeaders, removeTokenInHeader }
