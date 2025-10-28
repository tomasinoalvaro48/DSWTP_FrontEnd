//ELIMINAR ESTE ARCHIVO
/*import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { post } from '../../api/dataManager.ts'
import { Link } from 'react-router-dom'
import ZonaByLocalidadSelection from '../ZonaByLocalidadSelection.tsx'
import type { Zona } from '../../entities/entities.ts'

export function AddUsuario() {
  const navigate = useNavigate()

  const [zona, setZona] = useState<Zona>()
  const [newUsuario, setnNewUsuario] = useState({
    id: '',
    nombre_usuario: '',
    email_usuario: '',
    password_usuario: '',
    confirm_password: '',
    zona: zona?.id,
  })

  // Sincroniza zona seleccionada con el usuario
  useEffect(() => {
    setnNewUsuario((prev) => ({
      ...prev,
      zona: zona?.id,
    }))
  }, [zona])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else if (newUsuario.password_usuario !== newUsuario.confirm_password) {
      alert('Las contraseñas no coinciden')
      return
    } else {
      post('auth/register-usuario', newUsuario)
      navigate('/show-usuario')
    }
  }

  return (
    <div className="d-flex flex-column bg-light">
      <form className="d-flex flex-column p-4 border rounded bg-light" onSubmit={handleSubmit}>
        <h1>Agregar Nuevo Usuario</h1>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            required
            type="text"
            id="nombre"
            className="form-control"
            placeholder="Nombre"
            pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
            title="El nombre no puede tener números"
            onChange={(e) =>
              setnNewUsuario({
                ...newUsuario,
                nombre_usuario: e.target.value,
              })
            }
          />

          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            className="form-control"
            placeholder="Email"
            onChange={(e) =>
              setnNewUsuario({
                ...newUsuario,
                email_usuario: e.target.value,
              })
            }
          />
          <label htmlFor="psw" className="form-label">
            Password
          </label>
          <input
            required
            type="text"
            id="psw"
            className="form-control"
            placeholder="Password"
            minLength={6}
            title="La contraseña debe tener al menos 6 caracteres"
            onChange={(e) =>
              setnNewUsuario({
                ...newUsuario,
                password_usuario: e.target.value,
              })
            }
          />

          <label htmlFor="confir_password" className="form-label">
            Repetir contraseña
          </label>
          <input
            required
            type="text"
            id="psw"
            className="form-control"
            placeholder="Repetir contraseña"
            minLength={6}
            title="Repetí la misma contraseña"
            onChange={(e) =>
              setnNewUsuario({
                ...newUsuario,
                confirm_password: e.target.value,
              })
            }
          />

          <ZonaByLocalidadSelection setZona={setZona} />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
        <Link className="btn btn-secondary" to="/show-usuario">
          Cancelar
        </Link>
      </form>
    </div>
  )
}*/