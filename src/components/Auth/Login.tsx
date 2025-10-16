import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext.tsx'
import { postAuth } from '../../api/dataManager.ts'
import ModalAlert from '../ModalAlert.tsx'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [modalAlert, setModalAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await postAuth(email, password)
    if (response.token && response.rol) {
      login(response.token, response.rol)
      navigate('/')
    }
    if (
      response.message !== 'Acceso denegado. Cazador pendiente de aprobación.' &&
      response.message !== 'Acceso denegado. Cazador rechazado.'
    ) {
      setAlertMessage(response.message)
      setModalAlert(true)
    }
  }

  return (
    <>
      {modalAlert && (
        <ModalAlert
          setShowModalAlert={setModalAlert}
          title="Error en el login"
          body={alertMessage}
        />
      )}
      <form onSubmit={handleSubmit} className="p-4">
        <h2>Login</h2>
        <input
          required
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          className="form-control mb-2"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary">Ingresar</button>
      </form>
    </>
  )
}
