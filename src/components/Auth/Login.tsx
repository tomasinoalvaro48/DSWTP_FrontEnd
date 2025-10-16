import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext.tsx'
import { postAuth } from '../../api/dataManager.ts'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'success' | 'danger' | 'warning' | null>(null)

  const { login } = useAuth()
  const navigate = useNavigate()

  const showMessage = (text: string, type: 'danger' | 'warning') => {
    setMessage(text)
    setMessageType(type)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      showMessage('Debe completar todos los campos', 'warning')
      return
    }

    try {
      const response = await postAuth(email, password)

      if (response) {
        login(response.token, response.rol)
        navigate('/')
      } else {
        showMessage('Email o contraseña incorrectos', 'danger')
      }
    } catch (err: any) {
      showMessage('Error al intentar iniciar sesión', 'danger')
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '420px' }}>
      <h3 className="mb-4 text-center">Iniciar Sesión</h3>

      {message && (
        <div
          className={`alert alert-${messageType} alert-dismissible fade show text-center fw-semibold`}
          role="alert"
        >
          {message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage(null)}
            aria-label="Cerrar"
          ></button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">
            Correo electrónico
          </label>
          <input
            required
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-semibold">
            Contraseña
          </label>
          <input
            required
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Ingresar
        </button>
      </form>
    </div>
  )
}