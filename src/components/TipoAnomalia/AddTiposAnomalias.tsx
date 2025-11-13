import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { post } from '../../api/dataManager.ts'

export function AddTiposAnomalias() {
  const [tipoNuevo, setTipoNuevo] = useState({
    nombre_tipo_anomalia: '',
    dificultad_tipo_anomalia: 0,
  })

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await post('tipo_anomalia', tipoNuevo)
    navigate('/show-tipo-anomalia')
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex flex-column bg-light p-4 border rounded shadow-sm">
            <h1 className="text-center mb-4">Agregar Tipo de Anomalía</h1>

            <form className="d-flex flex-column" onSubmit={handleSubmit}>
              <label htmlFor="nombre" className="form-label">
                Nombre del tipo de anomalía:
              </label>
              <input
                required
                type="text"
                id="nombre"
                className="form-control mb-3"
                placeholder="Ingrese un nombre"
                pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                title="El nombre no puede tener números"
                value={tipoNuevo.nombre_tipo_anomalia}
                onChange={(e) =>
                  setTipoNuevo({
                    ...tipoNuevo,
                    nombre_tipo_anomalia: e.target.value,
                  })
                }
              />

              <label htmlFor="dificultad" className="form-label">
                Dificultad:
              </label>
              <select
                id="dificultad"
                className="form-select mb-4"
                required
                value={tipoNuevo.dificultad_tipo_anomalia}
                onChange={(e) =>
                  setTipoNuevo({
                    ...tipoNuevo,
                    dificultad_tipo_anomalia: Number(e.target.value),
                  })
                }
              >
                <option value="">Seleccione nivel...</option>
                <option value={1}>Nivel 1</option>
                <option value={2}>Nivel 2</option>
                <option value={3}>Nivel 3</option>
              </select>

              <div className="row gy-2 justify-content-between">
                <div className="col-12 col-md-5">
                  <Link className="btn btn-secondary w-100" to="/show-tipo-anomalia">
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
