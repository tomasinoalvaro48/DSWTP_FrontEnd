import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../auth/AuthContext.tsx'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../../endpoints.config'

export function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'success' | 'danger' | 'warning' | null>(null)
  const [showModal, setShowModal] = useState(false)

  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const showMessage = (text: string, type: 'success' | 'danger' | 'warning') => {
    setMessage(text)
    setMessageType(type)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      showMessage('Debe completar todos los campos', 'warning')
      return
    }

    if (newPassword !== confirmNewPassword) {
      showMessage('Las contraseñas nuevas no coinciden', 'warning')
      return
    }

    if (newPassword.length < 6) {
      showMessage('La contraseña nueva debe tener mínimo 6 caracteres', 'warning')
      return
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/change-password`,
        { currentPassword, newPassword, confirmNewPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setMessage(response.data.message)
      setMessageType('success')
      setShowModal(true)

      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    } catch (err: any) {
      if (err.response?.status === 400 && err.response?.data?.message === 'Token error') {
        showMessage('Sesión expirada. Vuelva a iniciar sesión', 'danger')
        logout()
      } else {
        showMessage(err.response?.data?.message || 'Error al cambiar la contraseña', 'danger')
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    navigate('/nav-map') //cambiar a home despues
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Cambiar Contraseña</h3>

      {message && messageType !== 'success' && (
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
          <label htmlFor="currentPassword" className="form-label fw-semibold">
            Contraseña actual
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label fw-semibold">
            Nueva contraseña
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="newPassword"
            minLength={6}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmNewPassword" className="form-label fw-semibold">
            Repetir nueva contraseña
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="confirmNewPassword"
            minLength={6}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Cambiar contraseña
        </button>
      </form>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Éxito</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label="Cerrar"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p className="fw-semibold mb-0">{message}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleCloseModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}