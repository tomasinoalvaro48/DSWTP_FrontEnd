import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext.tsx'
import { BACKEND_URL } from '../../../endpoints.config'

export function DeleteAccount() {
  const { token, logout, userRol } = useAuth()
  const navigate = useNavigate()

  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'success' | 'danger' | 'warning' | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const showMessage = (text: string, type: 'success' | 'danger' | 'warning') => {
    setMessage(text)
    setMessageType(type)
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/auth/delete-account`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      showMessage(response.data.message, 'success')
      setShowModal(true)
    } catch (err: any) {
      if (err.response?.status === 400 && err.response?.data?.message === 'Token error') {
        showMessage('Sesión expirada. Vuelva a iniciar sesión', 'danger')
        logout()
      } else {
        showMessage(err.response?.data?.message || 'Error al eliminar la cuenta', 'danger')
      }
    }
  }

  const handleConfirm = () => {
    setConfirming(true)
  }

  const handleCancel = () => {
    setConfirming(false)
    setMessage(null)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    logout()
    navigate('/')
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-danger">Eliminar Cuenta</h3>
      <p className="fw-semibold">
        {userRol === 'denunciante'
          ? 'Al eliminar tu cuenta de denunciante, se eliminarán todos tus datos personales y ya no podrás iniciar sesión con esta cuenta.'
          : 'Al eliminar tu cuenta de cazador, se eliminarán todos tus datos personales y ya no podrás participar en pedidos.'}
      </p>

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

      {!confirming ? (
        <button className="btn btn-danger w-100 mt-3" onClick={handleConfirm}>
          Eliminar mi cuenta
        </button>
      ) : (
        <div className="border p-3 rounded bg-light mt-3">
          <p className="fw-semibold text-center text-danger">
            ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Confirmar eliminación
            </button>
          </div>
        </div>
      )}

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
                <h5 className="modal-title">Cuenta eliminada</h5>
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
                <button type="button" className="btn btn-success" onClick={handleCloseModal}>
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}