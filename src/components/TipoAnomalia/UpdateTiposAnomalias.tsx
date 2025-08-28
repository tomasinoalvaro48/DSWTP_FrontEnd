import { useNavigate, useParams, Link } from 'react-router'
import { useState } from 'react'
import { getOne, patch } from '../../api/dataManager.ts'
import type { TipoAnomalia } from '../../entities/entities.ts'

// Componente para actualizar un Tipo de Anomalía
export function UpdateTiposAnomalias() {
  const { id } = useParams()

  const { data } = getOne<TipoAnomalia>('tipo_anomalia/' + id)

  const [tipoToUpdate, setTipoToUpdate] = useState<TipoAnomalia>({
    id: '',
    nombre_tipo_anomalia: '',
    dificultad_tipo_anomalia: 0,
  })

  const navigate = useNavigate()

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    patch('tipo_anomalia/' + id, tipoToUpdate)
    navigate('/show-tipo-anomalia') // Moverse a la ruta "show-tipo-anomalia" después del patch
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center bg-light">
      <h1>Anomalia a Editar:</h1>
      <div className="container mb-3 border rounded bg-light p-2">
        <div>Id: {data?.id ?? 'error'}</div>
        <div>Nombre: {data?.nombre_tipo_anomalia ?? 'error'}</div>
        <div>Dificultad: {data?.dificultad_tipo_anomalia ?? 'error'}</div>
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
            placeholder="Ingrese Nombre"
            defaultValue={data?.nombre_tipo_anomalia}
            onChange={(e) =>
              setTipoToUpdate({
                ...tipoToUpdate,
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
                setTipoToUpdate({
                  ...tipoToUpdate,
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
                setTipoToUpdate({
                  ...tipoToUpdate,
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
                setTipoToUpdate({
                  ...tipoToUpdate,
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
