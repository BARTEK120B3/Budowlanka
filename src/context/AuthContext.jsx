import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('budowlany_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = useCallback((email, password) => {
    const users = JSON.parse(localStorage.getItem('budowlany_users') || '[]')
    const found = users.find((u) => u.email === email)
    if (!found) return { success: false, message: 'Nie znaleziono użytkownika' }
    if (found.password !== password) return { success: false, message: 'Nieprawidłowe hasło' }
    const userData = { id: found.id, name: found.name, email: found.email }
    setUser(userData)
    localStorage.setItem('budowlany_user', JSON.stringify(userData))
    return { success: true }
  }, [])

  const register = useCallback((data) => {
    const users = JSON.parse(localStorage.getItem('budowlany_users') || '[]')
    if (users.find((u) => u.email === data.email)) {
      return { success: false, message: 'Email już zajęty' }
    }
    const newUser = { id: Date.now(), ...data }
    users.push(newUser)
    localStorage.setItem('budowlany_users', JSON.stringify(users))
    const userData = { id: newUser.id, name: newUser.name, email: newUser.email }
    setUser(userData)
    localStorage.setItem('budowlany_user', JSON.stringify(userData))
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('budowlany_user')
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
