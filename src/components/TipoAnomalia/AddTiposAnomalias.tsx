import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { post } from '../../api/dataManager.ts'
import { Link } from 'react-router-dom'

export function AddTiposAnomalias() {
  const [tipoNuevo, setTipoNuevo] = useState({
    nombre_tipo_anomalia: '',
    dificultad_tipo_anomalia: 0,
  })

  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      post('tipo_anomalia', tipoNuevo)
      navigate('/show-tipo-anomalia') // Moverse a la ruta "show-tipo-anomalia" después del post
    }
  }

  return (
    <div className="d-flex flex-column bg-light">
      <form
        className="d-flex flex-column p-4 border rounded bg-light"
        onSubmit={handleSubmit}
      >
        <h1>Agregar Tipo de Anomalía</h1>
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
              setTipoNuevo({
                ...tipoNuevo,
                nombre_tipo_anomalia: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dificultad</label>
          <div className="form-check">
            <input
              required
              className="form-check-input"
              type="radio"
              name="dificultad"
              id="n1"
              onChange={() =>
                setTipoNuevo({
                  ...tipoNuevo,
                  dificultad_tipo_anomalia: 1,
                })
              }
            />
            <label className="form-check-label" htmlFor="n1">
              Nivel 1
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="dificultad"
              id="n2"
              onChange={() =>
                setTipoNuevo({
                  ...tipoNuevo,
                  dificultad_tipo_anomalia: 2,
                })
              }
            />
            <label className="form-check-label" htmlFor="n2">
              Nivel 2
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="dificultad"
              id="n3"
              onChange={() =>
                setTipoNuevo({
                  ...tipoNuevo,
                  dificultad_tipo_anomalia: 3,
                })
              }
            />
            <label className="form-check-label" htmlFor="n3">
              Nivel 3
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
        <Link className="btn btn-secondary" to="/show-tipo-anomalia">
          Cancelar
        </Link>
      </form>
    </div>
  )
}
