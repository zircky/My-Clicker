import axios from "axios"
import { userService } from '../service/user.service';

export const getContentType = () => ({
  'Content-Type': 'application/json'
})

const axiosOptions = {
  baseURL: process.env.SERVER_URL,
  headers: getContentType()
}

export const axiosInstasnce = axios.create(axiosOptions)

axiosInstasnce.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (config && config.headers && token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


