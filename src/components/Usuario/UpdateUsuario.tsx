//ELIMINAR ESTE ARCHIVO
/*import { useNavigate, useParams, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { getOne, patch } from '../../api/dataManager.ts'
import type { Usuario } from '../../entities/entities.ts'

export function UpdateUsuario() {
  const { id } = useParams()
  const { data } = getOne<Usuario>('usuario/' + id)

  const [usuarioToUpdate, setUsuarioToUpdate] = useState<Usuario | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setUsuarioToUpdate({
        id: data.id,
        nombre_usuario: data.nombre_usuario,
        email_usuario: data.email_usuario,
        password_usuario: data.password_usuario,
        tipo_usuario: data.tipo_usuario,
        zona: data.zona,
        estado_aprobacion: data.estado_aprobacion,
        nivel_cazador: data.nivel_cazador,
      })
    }
  }, [data])

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await patch('usuario/' + id, usuarioToUpdate)
      navigate('/show-usuario')
    } catch (err: any) {
      console.error('Error al actualizar usuario:', err)
      alert(err?.response?.data?.message ?? 'No se pudo actualizar el usuario.')
    }
  }

  if (!usuarioToUpdate) return <div>Cargando localidad...</div>

  return (
    <div className="d-flex flex-column align-items-center justify-content-center bg-light">
      <h1>Localidad a Editar</h1>
      <div className="container mb-3 border rounded bg-light p-2">
        <div>Id: {data?.id ?? 'error'}</div>
        <div>Nombre: {data?.nombre_usuario ?? 'error'}</div>
        <div>Email: {data?.email_usuario ?? 'error'}</div>
        <div>Password: {data?.password_usuario ?? 'error'}</div>
        <div>Tipo: {data?.tipo_usuario ?? 'error'}</div>
        <div>Zona: {data?.zona.nombre_zona ?? 'error'}</div>
        <div>Nivel de Usuario: {data?.nivel_cazador ?? 'error'}</div>
        <div>Estado de Aprobación: {data?.estado_aprobacion ?? 'error'}</div>
      </div>

      <form
        className="d-flex flex-column align-items-center justify-content-center p-4 border rounded bg-light"
        onSubmit={handleUpdate}
      >
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
            value={usuarioToUpdate.nombre_usuario}
            pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
            title="El nombre no puede tener números"
            onChange={(e) =>
              setUsuarioToUpdate({
                ...usuarioToUpdate,
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
            value={usuarioToUpdate.email_usuario}
            onChange={(e) =>
              setUsuarioToUpdate({
                ...usuarioToUpdate,
                email_usuario: e.target.value,
              })
            }
          />
        </div>

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
                setUsuarioToUpdate({
                  ...usuarioToUpdate,
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
                setUsuarioToUpdate({
                  ...usuarioToUpdate,
                  tipo_usuario: 'operador',
                })
              }
            />
            <label className="form-check-label" htmlFor="t2">
              Operador
            </label>
          </div>
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