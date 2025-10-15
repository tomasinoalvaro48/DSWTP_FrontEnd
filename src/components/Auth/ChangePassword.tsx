import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../auth/AuthContext.tsx'
import { BACKEND_URL } from '../../../endpoints.config'

export function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const { token, logout } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword.length < 6) {
      alert('La contraseña nueva debe tener mínimo 6 caracteres')
      return
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/change-password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      alert(response.data.message)
      setCurrentPassword('')
      setNewPassword('')
    } catch (err: any) {
      if (err.response?.status === 400 && err.response?.data?.message === 'Token error') {
        alert('Sesión expirada. Vuelva a iniciar sesión')
        logout()
      } else {
        alert(err.response?.data?.message || 'Error al cambiar la contraseña')
      }
    }
  }

  return (
    <div className="container mt-4">
      <h3>Cambiar Contraseña</h3>
      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">
            Contraseña actual
          </label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            Nueva contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            required
            minLength={6}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Cambiar contraseña
        </button>
      </form>
    </div>
  )
}