/* eslint-disable @typescript-eslint/no-unsafe-call */
import useSWR from 'swr'
import ApiService from '@/lib/axios'
import { AxiosResponse } from 'axios'

interface SignUpProps {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}
export const useAuth = () => {
  const prefix = '/api'
  const { data: currentUser } = useSWR(`${prefix}/user`, async () => {
    return ApiService.get(`${prefix}/user`)
      .then((res) => res.data)
      .catch(() => null)
  })

  return {
    currentUser,
  }
}

const csrf = () => ApiService.get('/sanctum/csrf-cookie')

class AuthService {
  public static async register(props: SignUpProps): Promise<AxiosResponse> {
    await csrf()
    return ApiService.post(`/api/register`, {
      params: props,
    })
      .then((response) => {
        if (response.status === 201) {
          localStorage.setItem('token', response.data.token.token || '')
        }
        ApiService.setToken()
        return response
      })
      .catch((err) => err.response)
  }

  public static async login(props: { email: string; password: string }): Promise<AxiosResponse> {
    await csrf()
    return ApiService.post(`/api/login`, { params: props })
      .then((response) => {
        localStorage.setItem('token', response.data.token.token || '')
        ApiService.setToken()
        return response
      })
      .catch((err) => err.response)
  }

  public static async logout(): Promise<AxiosResponse> {
    return ApiService.post(`/api/logout`)
      .then((res) => {
        console.log(res)
        localStorage.removeItem('token')
        return res
      })
      .catch((err) => err.response)
  }
}

export default AuthService
