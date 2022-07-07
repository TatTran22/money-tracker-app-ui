declare type ErrorResponse = {
  errors: {
    message: string
    status_code: string
  }
}

declare type SignUpError = {
  first_name?: string[]
  last_name?: string[]
  email?: string[]
  password?: string[]
}
