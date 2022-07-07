import React, { createContext, useContext, useEffect, useState } from 'react'
import AuthService from '@/hooks/auth'

const UserContext = createContext<{ user: User | null; setUser: (user: User | null) => void }>({
  user: null,
  setUser: () => {},
})

export const UserProvider = (props: any) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    AuthService.me()
      .then(({ data }) => {
        setUser(data.user ? data.user : null)
      })
      .catch(() => {
        setUser(null)
      })
  }, [])

  return <UserContext.Provider value={{ user, setUser }} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}

const AuthUser = () => {
  const { user } = useUser()
  return user
}

export default AuthUser
