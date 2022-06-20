import React, { useEffect, useState, createContext, useContext } from 'react'
import { useAuth } from '@/hooks/auth'
const UserContext = createContext<{ user: User | null; setUser: (user: User | null) => void }>({
  user: null,
  setUser: () => {},
})

export const UserProvider = (props: any) => {
  const [user, setUser] = useState<User | null>(null)
  const { currentUser } = useAuth()
  useEffect(() => {
    setUser(currentUser || null)
    return () => {
      setUser(null)
    }
  }, [currentUser])

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
