import { useState } from 'react'
import type { Zona } from '../../entities/entities.ts'
import ZonaByLocalidadSelection from '../ZonaByLocalidadSelection.tsx'
import { post } from '../../api/dataManager.ts'
import ModalAlert from '../ModalAlert.tsx'

export function RegisterUsuario() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [zona, setZona] = useState<Zona>()
  const [showModalAlert, setShowModalAlert] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const form = {
    nombre_usuario: nombre,
    email_usuario: email,
    password_usuario: password,
    confirm_password: confirmPassword,
    zona: zona?.id,
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.password_usuario !== form.confirm_password) {
      setTitle('Las contraseñas no coinciden.')
      setBody('Las contraseñas no coinciden.')
      setShowModalAlert(true)
      return
    }

    const res = await post('auth/register-usuario', form)
    setTitle(res?.data.message)
    setBody(res?.data.message)
    if (res?.status === 201) {
      setBody(
        'Registro exitoso como cazador. Deberás esperar a que un administrador apruebe tu cuenta antes de poder iniciar sesión.'
      )
    }
    setShowModalAlert(true)
  }

  return (
    <>
      {showModalAlert && (
        <ModalAlert
          setShowModalAlert={setShowModalAlert}
          title={title}
          body={body}
          navigateOnClose="/login"
        />
      )}
      <div className="d-flex flex-column bg-light">
        <form className="d-flex flex-column p-4 border rounded bg-light" onSubmit={handleSubmit}>
          <h2>Registro de Cazador</h2>

          <label htmlFor="nombre" className="form-label">
            Nombre y Apellido
          </label>
          <input
            required
            type="text"
            className="form-control mb-2"
            placeholder="Nombre y Apellido"
            value={form.nombre_usuario}
            onChange={(e) => setNombre(e.target.value)}
            pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
            title="El nombre no puede tener números"
          />

          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            required
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={form.email_usuario}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            required
            type="password"
            className="form-control mb-2"
            placeholder="Contraseña"
            value={form.password_usuario}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            title="La contraseña debe tener al menos 6 caracteres"
          />

          <label htmlFor="confir_password" className="form-label">
            Repetir contraseña
          </label>
          <input
            required
            type="password"
            className="form-control mb-2"
            placeholder="Repetir contraseña"
            value={form.confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
            title="Repetí la misma contraseña"
          />

          <ZonaByLocalidadSelection setZona={setZona} />

          <button className="btn btn-success" type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </>
  )
}
