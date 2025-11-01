import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext.tsx'
import { BACKEND_URL } from '../../../endpoints.config'
import type { Zona } from '../../entities/entities.ts'
import ZonaByLocalidadSelection from '../ZonaByLocalidadSelection.tsx'

export function UpdatePerfil() {
  const { token, userRol } = useAuth()
  const [form, setForm] = useState<any>({})
  const [zonaSeleccionada, setZonaSeleccionada] = useState<Zona | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'success' | 'danger' | 'warning' | null>(null)
  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()

  const showMessage = (text: string, type: 'success' | 'danger' | 'warning') => {
    setMessage(text)
    setMessageType(type)
  }
    
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/auth/get-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        setForm(res.data.data)

        if (res.data.data.zona){
            setZonaSeleccionada(res.data.data.zona)
        }
      } catch (err: any) {
        showMessage('Error al cargar datos del perfil: ' + (err.response?.data?.message ?? err.message), 'danger')
      } finally {
        setLoading(false)
      }
    }
    fetchPerfil()
  }, [token, userRol])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let data: any = {}

      if (userRol === 'denunciante') {
        data = {
          nombre_apellido_denunciante: form.nombre_apellido_denunciante,
          telefono_denunciante: form.telefono_denunciante,
        }
      } else if (userRol === 'cazador' || userRol === 'operador') {
        data = {
          nombre_usuario: form.nombre_usuario,
          zona: zonaSeleccionada?.id,
        }
      }

      await axios.put(`${BACKEND_URL}/api/auth/update-profile`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })

      showMessage('Perfil actualizado correctamente', 'success')
      setShowModal(true)
    } catch (err: any) {
      showMessage('Error al actualizar el perfil: ' + (err.response?.data?.message ?? err.message), 'danger')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    navigate('/')
  }

  if (loading) return <p className="text-center mt-4">Cargando perfil...</p>

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Actualizar Perfil</h3>

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
        {userRol === 'denunciante' && (
          <>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                value={form.email_denunciante || ''}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Nombre y Apellido</label>
              <input
                type="text"
                className="form-control"
                value={form.nombre_apellido_denunciante || ''}
                onChange={(e) =>
                  setForm({ ...form, nombre_apellido_denunciante: e.target.value })
                }
                pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                title="El nombre no puede tener números"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Teléfono</label>
              <input
                type="text"
                className="form-control"
                value={form.telefono_denunciante || ''}
                onChange={(e) => setForm({ ...form, telefono_denunciante: e.target.value })}
                pattern="^[0-9]+$"
                title="El teléfono debe contener solo números"
                required
              />
            </div>
          </>
        )}

        {(userRol === 'cazador' || userRol === 'operador') && (
          <>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                value={form.email_usuario || ''}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={form.nombre_usuario || ''}
                onChange={(e) => setForm({ ...form, nombre_usuario: e.target.value })}
                pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                title="El nombre no puede tener números"
                required
              />
            </div>

            <div className="mt-3">
              <ZonaByLocalidadSelection setZona={setZonaSeleccionada} />
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Guardar cambios
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