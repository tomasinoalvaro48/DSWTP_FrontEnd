import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOne, patch } from '../../api/dataManager.ts'
import type { Zona } from '../../entities/entities.ts'

export function UpdateZona() {
  const { id } = useParams()
  const { data } = getOne<Zona>('zona/' + id)
  const navigate = useNavigate()

  const [zonaToUpdate, setZonaToUpdate] = useState<Partial<Zona>>({
    nombre_zona: '',
    localidad: undefined
  })

  useEffect(() => {
    if (data) {
      setZonaToUpdate({
        id: data.id,
        nombre_zona: data.nombre_zona,
        localidad: data.localidad
      })
    }
  }, [data])

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await patch('zona/' + id, {
      nombre_zona: zonaToUpdate.nombre_zona,
      localidad: zonaToUpdate.localidad?.id
    })
    navigate('/show-zona')
  }

  if (!zonaToUpdate) return <div>Cargando...</div>

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex flex-column bg-light p-4 border rounded shadow-sm">
            <h1 className="text-center mb-4">Editar Zona</h1>

            <form className="d-flex flex-column" onSubmit={handleUpdate}>
              <label htmlFor="nombre" className="form-label">Nombre:</label>
              <input
                required
                type="text"
                id="nombre"
                className="form-control mb-4"
                placeholder="Ingrese el nombre"
                pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                title="El nombre no puede tener números"
                value={zonaToUpdate.nombre_zona}
                onChange={(e) =>
                  setZonaToUpdate({ ...zonaToUpdate, nombre_zona: e.target.value })
                }
              />

              <div className="row gy-2 justify-content-between">
                <div className="col-12 col-md-5">
                  <Link className="btn btn-secondary w-100" to="/show-zona">
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