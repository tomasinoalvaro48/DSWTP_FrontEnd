import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { post, get } from '../../api/dataManager.ts'
import type { Localidad, Zona } from '../../entities/entities.ts'

export function AddZona() {
  const [zonaNueva, setZonaNueva] = useState<Partial<Zona>>({
    nombre_zona: '',
    localidad: undefined
  })

  const navigate = useNavigate()
  const { data: localidades } = get<Localidad>('localidad')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await post('zona', {
      nombre_zona: zonaNueva.nombre_zona,
      localidad: zonaNueva.localidad?.id
    })
    navigate('/show-zona')
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex flex-column bg-light p-4 border rounded shadow-sm">
            <h1 className="text-center mb-4">Agregar Zona</h1>

            <form className="d-flex flex-column" onSubmit={handleSubmit}>
              <label htmlFor="nombre" className="form-label">Nombre:</label>
              <input
                required
                type="text"
                id="nombre"
                className="form-control mb-3"
                placeholder="Ingrese el nombre"
                pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                title="El nombre no puede tener números"
                value={zonaNueva.nombre_zona}
                onChange={(e) =>
                  setZonaNueva({ ...zonaNueva, nombre_zona: e.target.value })
                }
              />

              <label htmlFor="localidad" className="form-label">Localidad:</label>
              <select
                required
                id="localidad"
                className="form-select mb-4"
                value={zonaNueva.localidad?.id || ''}
                onChange={(e) => {
                  const selected = localidades.find((loc) => loc.id === e.target.value)
                  setZonaNueva({ ...zonaNueva, localidad: selected })
                }}
              >
                <option value="">Seleccione una localidad</option>
                {localidades.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.nombre_localidad}
                  </option>
                ))}
              </select>

              <div className="row gy-2 justify-content-between">
                <div className="col-12 col-md-5">
                  <Link className="btn btn-secondary w-100" to="/show-zona">
                    Cancelar
                  </Link>
                </div>
                <div className="col-12 col-md-5">
                  <button type="submit" className="btn btn-primary w-100">
                    Guardar
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