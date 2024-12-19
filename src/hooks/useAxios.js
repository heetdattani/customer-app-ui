import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as storage from '../helpers/storageRequests'

const useAxios = () => {
  const navigate = useNavigate()

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_ENDPOINT,
  })

  axiosInstance.interceptors.request.use((config) => {
    const token = storage.getAuth()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        if (
          error?.response?.status === 401 &&
          error?.response?.data?.status === false &&
          error.response?.data?.message === 'Unauthorized!'
        ) {
          storage.removeAuth()
          error.response.data.message = 'Your Session is expired, please login again!'
          navigate('/login')
        } else if (error?.response?.status === 403 && error?.response?.data?.status === false) {
          error.response.data.message = "You don't have permission to access this"
          navigate('/dashboard')
        }
        return Promise.reject(error)
      } else {
        return Promise.reject(error)
      }
    },
  )

  return { axiosInstance }
}

export default useAxios
