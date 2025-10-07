import { useState, useEffect } from 'react'
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
    tipo_usuario: '',
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
    } else {
      post('usuario', newUsuario)
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

          <div className="mb-3">
            <label className="form-label">Tipo</label>
            <div className="form-check">
              <input
                required
                className="form-check-input"
                type="radio"
                name="tipo"
                id="t1"
                onChange={() =>
                  setnNewUsuario({
                    ...newUsuario,
                    tipo_usuario: 'cazador',
                  })
                }
              />
              <label className="form-check-label" htmlFor="t1">
                Cazador
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="tipo"
                id="t2"
                onChange={() =>
                  setnNewUsuario({
                    ...newUsuario,
                    tipo_usuario: 'operador',
                  })
                }
              />
              <label className="form-check-label" htmlFor="t2">
                Operador
              </label>
            </div>
          </div>

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
}
