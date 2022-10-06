import axios from 'axios'

import { BASE_URL_API } from '@/config/appProperties'

const api = axios.create({
  baseURL: `${BASE_URL_API}/api`
})

export default api
