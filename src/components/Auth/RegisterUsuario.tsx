import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import type { Zona } from '../../entities/entities.ts'
import ZonaByLocalidadSelection from '../ZonaByLocalidadSelection.tsx'
//import { post } from '../../api/dataManager.ts'
import axios from 'axios'
import { BACKEND_URL } from '../../../endpoints.config'

export function RegisterUsuario() {
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [zona, setZona] = useState<Zona>()
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'success' | 'danger' | 'warning' | null>(null)
  const [showModal, setShowModal] = useState(false)

  const form = {
    nombre_usuario: nombre,
    email_usuario: email,
    password_usuario: password,
    confirm_password: confirmPassword,
    zona: zona?.id,
  }

  const showMessage = (text: string, type: 'success' | 'danger' | 'warning') => {
    setMessage(text)
    setMessageType(type)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombre || !email || !password || !confirmPassword || !zona) {
      showMessage('Debe completar todos los campos', 'warning')
      return
    }

    if (password !== confirmPassword) {
      showMessage('Las contraseñas no coinciden', 'warning')
      return
    }

    if (password.length < 6) {
      showMessage('La contraseña debe tener mínimo 6 caracteres', 'warning')
      return
    }

    try {
      //si uso la línea comentada en vez de la línea de abajo, no muestra la validacion de que si email ya está registrado como usuario
      //await post('auth/register-usuario', form)
      await axios.post(`${BACKEND_URL}/api/auth/register-usuario`, form)
      setMessage('Se ha registrado como cazador.')
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
    <div className="container mt-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-3 text-center">Registro de Cazador</h3>

      {message && messageType !== 'success' && (
        <div className={`alert alert-${messageType} alert-dismissible fade show text-center fw-semibold`} role="alert">
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage(null)} aria-label="Cerrar"></button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
        <div className="mb-3">
          <label className="form-label fw-semibold">Nombre y Apellido</label>
          <input
            required
            type="text"
            className="form-control"
            placeholder="Ej: Juana Perez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
            title="El nombre no puede tener números"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Correo electrónico</label>
          <input
            required
            type="email"
            className="form-control"
            placeholder="Ej: usuario@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3 position-relative">
          <label className="form-label fw-semibold">Contraseña</label>
          <input
            required
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            placeholder="******"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            required
            type={showConfirmPassword ? 'text' : 'password'}
            className="form-control"
            placeholder="******"
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <i
            className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute`}
            style={{ top: '38px', right: '15px', cursor: 'pointer' }}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          ></i>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Zona</label>
          <ZonaByLocalidadSelection setZona={setZona} />
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
          ¿Tenés anomalías y querés denunciarlo?{' '}
          <Link to="/register-denunciante" className="text-success text-decoration-none fw-semibold">
            Registrarse como denunciante
          </Link>
        </p>
      </div>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Registro exitoso</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
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