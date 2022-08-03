import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.API_HOST
})

const { get, post, put } = axiosInstance
export { get, post, put }
