import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export function RegisterDenunciante() {
  const [form, setForm] = useState({
    nombre_apellido_denunciante: '',
    telefono_denunciante: '',
    email_denunciante: '',
    password_denunciante: '',
    confir_password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'success' | 'danger' | 'warning' | null>(null)
  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const showMessage = (text: string, type: 'success' | 'danger' | 'warning') => {
    setMessage(text)
    setMessageType(type)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const {
      nombre_apellido_denunciante,
      telefono_denunciante,
      email_denunciante,
      password_denunciante,
      confir_password,
    } = form

    if (
      !nombre_apellido_denunciante ||
      !telefono_denunciante ||
      !email_denunciante ||
      !password_denunciante ||
      !confir_password
    ) {
      showMessage('Debe completar todos los campos', 'warning')
      return
    }

    if (password_denunciante !== confir_password) {
      showMessage('Las contraseñas no coinciden', 'warning')
      return
    }

    if (password_denunciante.length < 6) {
      showMessage('La contraseña debe tener al menos 6 caracteres', 'warning')
      return
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register-denunciante`, form)
      setMessage('Se ha registrado como denunciante.')
      setMessageType('success')
      setShowModal(true)
    } catch (err: any) {
      showMessage(err.response?.data?.message || 'Error al registrarse', 'danger')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    navigate('/login')
  }

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: '500px' }}>
      <h3 className="mb-3 text-center">Registrarse como Denunciante</h3>

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
          <label className="form-label fw-semibold">Nombre y Apellido</label>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Ej: Juan Perez"
            value={form.nombre_apellido_denunciante}
            onChange={(e) => setForm({ ...form, nombre_apellido_denunciante: e.target.value })}
            pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
            title="El nombre no puede tener números"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Teléfono</label>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Ej: 3411234567"
            value={form.telefono_denunciante}
            onChange={(e) => setForm({ ...form, telefono_denunciante: e.target.value })}
            pattern="^[0-9]+$"
            title="El teléfono no puede tener letras ni espacios"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Correo electrónico</label>
          <input
            type="email"
            required
            className="form-control"
            placeholder="Ej: denunciante@mail.com"
            value={form.email_denunciante}
            onChange={(e) => setForm({ ...form, email_denunciante: e.target.value })}
          />
        </div>

        <div className="mb-3 position-relative">
          <label className="form-label fw-semibold">Contraseña</label>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            className="form-control"
            minLength={6}
            placeholder="******"
            value={form.password_denunciante}
            onChange={(e) => setForm({ ...form, password_denunciante: e.target.value })}
          />
          <i
            className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute`}
            style={{ top: '38px', right: '15px', cursor: 'pointer' }}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>

        <div className="mb-3 position-relative">
          <label className="form-label fw-semibold">Confirmar contraseña</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            required
            className="form-control"
            minLength={6}
            placeholder="******"
            value={form.confir_password}
            onChange={(e) => setForm({ ...form, confir_password: e.target.value })}
          />
          <i
            className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute`}
            style={{ top: '38px', right: '15px', cursor: 'pointer' }}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          ></i>
        </div>

        <button className="btn btn-success w-100" type="submit">
          Registrarse
        </button>
      </form>

      <div className="text-center mt-3">
        <p className="mb-0 fw-semibold">
          ¿Ya tenés una cuenta?{' '}
          <Link to="/login" className="text-primary text-decoration-none fw-semibold">
            Iniciar sesión
          </Link>
        </p>
        <p className="mb-1 fw-semibold">
          ¿Deseas ser cazador?{' '}
          <Link to="/register-usuario" className="text-success text-decoration-none fw-semibold">
            Registrarse como cazador
          </Link>
        </p>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Registro exitoso</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p className="fw-semibold mb-0">{message}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={handleCloseModal}>
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
