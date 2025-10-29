import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getOne, patch } from '../../api/dataManager.ts'
import type { Localidad } from '../../entities/entities.ts'

export function UpdateLocalidad() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = getOne<Localidad>('localidad/' + id)

  const [localidadToUpdate, setLocalidadToUpdate] = useState<Localidad>({
    id: '',
    codigo_localidad: '',
    nombre_localidad: '',
    zonas: []
  })

  useEffect(() => {
    if (data) {
      setLocalidadToUpdate({
        id: data.id,
        codigo_localidad: data.codigo_localidad,
        nombre_localidad: data.nombre_localidad,
        zonas: data.zonas ?? []
      })
    }
  }, [data])

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await patch('localidad/' + id, localidadToUpdate)
    navigate('/show-localidad')
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex flex-column bg-light p-4 border rounded shadow-sm">
            <h1 className="text-center mb-4">Editar Localidad</h1>

            <form className="d-flex flex-column" onSubmit={handleUpdate}>
              <label htmlFor="codigo" className="form-label">Código:</label>
              <input
                required
                type="text"
                id="codigo"
                className="form-control mb-3"
                placeholder="Ingrese el código"
                pattern="^[0-9]+$"
                title="El código no puede tener letras"
                value={localidadToUpdate.codigo_localidad}
                onChange={(e) =>
                  setLocalidadToUpdate({ ...localidadToUpdate, codigo_localidad: e.target.value })
                }
              />

              <label htmlFor="nombre" className="form-label">Nombre:</label>
              <input
                required
                type="text"
                id="nombre"
                className="form-control mb-4"
                placeholder="Ingrese el nombre"
                pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                title="El nombre no puede tener números"
                value={localidadToUpdate.nombre_localidad}
                onChange={(e) =>
                  setLocalidadToUpdate({ ...localidadToUpdate, nombre_localidad: e.target.value })
                }
              />

              <div className="row gy-2 justify-content-between">
                <div className="col-12 col-md-5">
                  <Link className="btn btn-secondary w-100" to="/show-localidad">
                    Cancelar
                  </Link>
                </div>
                <div className="col-12 col-md-5">
                  <button type="submit" className="btn btn-primary w-100">
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}