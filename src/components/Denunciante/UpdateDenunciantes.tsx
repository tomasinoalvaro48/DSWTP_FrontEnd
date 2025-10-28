//ELIMINAR ESTE ARCHIVO
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getOne, patch } from '../../api/dataManager.ts'
import type { Denunciante } from '../../entities/entities.ts'

export function UpdateDenunciantes() {
  const { id } = useParams()
  const { data } = getOne<Denunciante>('denunciantes/' + id)

  const [denuncianteToUpdate, setDenuncianteToUpdate] = useState<Denunciante>({
    id: '',
    nombre_apellido_denunciante: '',
    telefono_denunciante: '',
    email_denunciante: '',
    password_denunciante: '',
  })
  useEffect(() => {
    if (data) {
      setDenuncianteToUpdate({
        id: data.id,
        nombre_apellido_denunciante: data.nombre_apellido_denunciante,
        telefono_denunciante: data.telefono_denunciante,
        email_denunciante: data.email_denunciante,
        password_denunciante: data.password_denunciante,
      })
    }
  }, [data])

  const navigate = useNavigate()

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await patch('denunciantes/' + id, denuncianteToUpdate);
      navigate('/show-denunciante');
    } catch (err: any) {
      console.error("Error al actualizar denunciante:", err);
      alert(err?.response?.data?.message ?? "No se pudo actualizar el denunciante.");
    }
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center bg-light">
      <h1>Denunciante a Editar:</h1>
      <div className="container mb-3 border rounded bg-light p-2">
        <div>Id: {data?.id ?? 'error'}</div>
        <div>Nombre y apellido: {data?.nombre_apellido_denunciante ?? 'error'}</div>
        <div>Telefono: {data?.telefono_denunciante ?? 'error'}</div>
        <div>Email: {data?.email_denunciante ?? 'error'}</div>
      </div>
      <form
        className="d-flex flex-column align-items-center justify-content-center p-4 border rounded bg-light"
        onSubmit={handleUpdate}
      >
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre y apellido
          </label>
          <input
            required
            type="text"
            id="nombre"
            className="form-control"
            placeholder="Ingrese Nombre"
            defaultValue={data?.nombre_apellido_denunciante}
            pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
            title="El nombre no puede estar vacío ni tener números"
            onChange={(e) =>
              setDenuncianteToUpdate({
                ...denuncianteToUpdate,
                nombre_apellido_denunciante: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Telefono
          </label>
          <input
            required
            type="text"
            id="telefono"
            className="form-control"
            placeholder="Ingrese Telefono"
            defaultValue={data?.telefono_denunciante}
            pattern="^[0-9]+$"
            title="El teléfono no puede tener letras ni espacios"
            onChange={(e) =>
              setDenuncianteToUpdate({
                ...denuncianteToUpdate,
                telefono_denunciante: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            className="form-control"
            placeholder="Ingrese Email"
            defaultValue={data?.email_denunciante}
            onChange={(e) =>
              setDenuncianteToUpdate({ ...denuncianteToUpdate, email_denunciante: e.target.value })
            }
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>

        <Link className="btn btn-secondary" to="/show-denunciante">
          Cancelar
        </Link>
      </form>
    </div>
  )
}