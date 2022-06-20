import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8866'

export const axiosInstances = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
  withCredentials: true,
})

class ApiService {
  public static async get(url: string, data?: AxiosRequestConfig): Promise<AxiosResponse> {
    return axiosInstances.get(url, data ? data.params : undefined)
  }

  public static async post(url: string, data?: AxiosRequestConfig): Promise<AxiosResponse> {
    return axiosInstances.post(url, data ? data.params : undefined)
  }

  public static async put(url: string, data?: AxiosRequestConfig): Promise<AxiosResponse> {
    return axiosInstances.put(url, data ? data.params : undefined)
  }

  public static async delete(url: string, data?: AxiosRequestConfig): Promise<AxiosResponse> {
    return axiosInstances.delete(url, data ? data.params : undefined)
  }

  public static async patch(url: string, data?: AxiosRequestConfig): Promise<AxiosResponse> {
    return axiosInstances.patch(url, data ? data.params : undefined)
  }

  public static setToken() {
    const token = localStorage.getItem('token')
    axiosInstances.defaults.headers.common.Authorization = `Bearer ${token || ''}`
  }
}

export default ApiService
