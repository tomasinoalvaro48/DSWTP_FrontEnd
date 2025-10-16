import { createContext, useState, useContext, useLayoutEffect } from 'react'
import axios from 'axios'
import ModalAlert from '../components/ModalAlert.tsx'

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
  const [showModalAlert, setShowModalAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string>('')

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

  // Interceptor para añadir el token a las solicitudes
  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config) => {
      config.headers.Authorization = token ? `Bearer ${token}` : config.headers.Authorization
      return config
    })
    return () => {
      axios.interceptors.request.eject(authInterceptor)
    }
  }, [token])

  // Interceptor para manejar respuestas y error 401 (token inválido/expirado)
  useLayoutEffect(() => {
    const refreshInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // error 401 (Unauthorized) o 403 (Forbidden)
        if (error.response?.status === 401 || error.response?.status === 403) {
          const backendMessage = error.response.data.message
          console.error('Error de autenticación:', backendMessage)
          setAlertMessage(backendMessage)
          setShowModalAlert(true)
          logout() // hacemos logout directamente
          return Promise.reject(error)
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axios.interceptors.response.eject(refreshInterceptor)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ token, userRol: currentUserRol, login, logout }}>
      {children}
      {showModalAlert && (
        <ModalAlert
          setShowModalAlert={setShowModalAlert}
          title="Error en la sesión"
          body={alertMessage}
        />
      )}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider')
  return context
}
