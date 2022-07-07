/* eslint-disable @typescript-eslint/no-unsafe-call */
import { AxiosResponse } from 'axios'
import Router from 'next/router'
import ApiService from '@/lib/axios'

interface SignUpProps {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}

const prefix = '/api'

const csrf = () => ApiService.get('/sanctum/csrf-cookie')

class AuthService {
  public static async register(props: SignUpProps): Promise<AxiosResponse> {
    await csrf()
    return ApiService.post(`${prefix}/register`, props)
      .then((response) => {
        console.log(response)
        if (response.status === 201) {
          localStorage.setItem('token', response.data.token.token || '')
        }
        ApiService.setToken()
        return response
      })
      .catch((err) => err.response)
  }

  public static async login(props: { email: string; password: string; remember?: boolean }): Promise<AxiosResponse> {
    await csrf()
    return ApiService.post(`${prefix}/login`, props)
      .then((response) => {
        console.log(response)
        localStorage.setItem('token', response.data.token.token || '')
        ApiService.setToken()
        return response
      })
      .catch((err) => err.response)
  }

  public static async logout(): Promise<AxiosResponse> {
    return ApiService.post(`${prefix}/logout`)
      .then((res) => {
        console.log(res)
        localStorage.removeItem('token')
        void Router.push('/login')
        return res
      })
      .catch((err) => err.response)
  }

  public static async me(): Promise<AxiosResponse> {
    ApiService.setToken()
    return ApiService.get(`${prefix}/me`)
      .then((res) => res)
      .catch((err) => err.response)
  }

  public static async forgotPassword(props: { email: string }): Promise<AxiosResponse> {
    return ApiService.post(`${prefix}/forgot-password`, props)
      .then((res) => res)
      .catch((err) => err.response)
  }

  public static async resetPassword(props: {
    token: string
    email: string
    password: string
    password_confirmation: string
  }): Promise<AxiosResponse> {
    return ApiService.post(`${prefix}/reset-password`, props)
      .then((res) => res)
      .catch((err) => err.response)
  }

  public static async verifyEmail({
    id,
    hash,
    query,
  }: {
    id: string
    hash: string
    query: string
  }): Promise<AxiosResponse> {
    return ApiService.get(`${prefix}/verify-email/${id}/${hash}`, { params: query })
      .then((res) => res)
      .catch((err) => err.response)
  }

  public static async resendEmailVerification(): Promise<AxiosResponse> {
    return ApiService.post(`${prefix}/email/verification-notification`)
      .then((res) => res)
      .catch((err) => err.response)
  }
}

export default AuthService
