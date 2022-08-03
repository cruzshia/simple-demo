import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { notifySubject } from '@/components/CommonNotification'

const axiosInstance = axios.create({
  baseURL: process.env.API_HOST
})

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  console.log('request configs', request)
  return request
})

axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    if (response.status >= 200 && response.status < 300 && response.data?.success) {
      return response.data?.data
    }

    notifySubject.next({
      type: 'error',
      message: response.data
    })
  },
  (err) => {
    notifySubject.next({
      type: 'error',
      message: err?.message || 'request error, please try again later'
    })
    if (err.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

const { get, post, put } = axiosInstance
export { get, post, put }
