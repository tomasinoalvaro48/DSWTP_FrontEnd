import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { post } from '../../api/dataManager.ts'

export function AddLocalidad() {
  const [localidadNueva, setLocalidadNueva] = useState({
    nombre_localidad: '',
    codigo_localidad: ''
  })

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await post('localidad', localidadNueva)
    navigate('/show-localidad')
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex flex-column bg-light p-4 border rounded shadow-sm">
            <h1 className="text-center mb-4">Agregar Localidad</h1>

            <form className="d-flex flex-column" onSubmit={handleSubmit}>
              <label htmlFor="codigo" className="form-label">Código:</label>
              <input
                required
                type="text"
                id="codigo"
                className="form-control mb-3"
                placeholder="Ingrese el código"
                pattern="^[0-9]+$"
                title="El código no puede tener letras"
                value={localidadNueva.codigo_localidad}
                onChange={(e) =>
                  setLocalidadNueva({ ...localidadNueva, codigo_localidad: e.target.value })
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
                value={localidadNueva.nombre_localidad}
                onChange={(e) =>
                  setLocalidadNueva({ ...localidadNueva, nombre_localidad: e.target.value })
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