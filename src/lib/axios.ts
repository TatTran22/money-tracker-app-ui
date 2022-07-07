import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

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
  public static async get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return axiosInstances.get(url, config)
  }

  public static async post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return axiosInstances.post(url, data, config)
  }

  public static async put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return axiosInstances.put(url, data, config)
  }

  public static async patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return axiosInstances.patch(url, data, config)
  }

  public static async delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return axiosInstances.delete(url, config)
  }

  public static setToken() {
    const token = localStorage.getItem('token')
    axiosInstances.defaults.headers.common.Authorization = token ? `Bearer ${token}` : ''
  }
}

export default ApiService
