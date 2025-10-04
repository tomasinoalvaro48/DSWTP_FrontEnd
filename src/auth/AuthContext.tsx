import { createContext, useState, useContext } from 'react'

interface AuthContextType {
  token: string | null
  userRol: string | null
  login: (token: string, userRol: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Estado para el token y el usuario actual
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [currentUserRol, setCurrentUserRol] = useState<string | null>(localStorage.getItem('rol'))

  // Función login: guarda token y usuario en estado y localStorage
  const login = (newToken: string, newUserRol: string) => {
    try {
      setToken(newToken)
      localStorage.setItem('token', newToken)
      setCurrentUserRol(newUserRol)
      localStorage.setItem('rol', newUserRol)
    } catch {
      logout()
    }
  }

  // Logout function para limpiar el token
  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
    setCurrentUserRol(null)
    localStorage.removeItem('rol')
  }

  return (
    <AuthContext.Provider value={{ token, userRol: currentUserRol, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider')
  return context
}
