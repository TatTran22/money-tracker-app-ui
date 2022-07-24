declare type User = {
  id: string
  first_name: string
  last_name: string
  uuid: string
  nickname: string
  email: string
  email_verified_at: string | null
  password_changed_at: string | Date | null
  avatar_url: string | null
  website: string | null
  bio: string | null
  gender: string | null
  phone: string | null
  phone_verified_at: string | null
  birthday: string | number | null
  country_code: string | null
  created_at: string
  updated_at: string
}

declare type Token = {
  expires_in: number
  token: string
  token_type: string
}
