import { useState } from 'react'
import { useNavigate } from 'react-router'
import { post } from '../../api/postManager.ts'
import { Link } from 'react-router'

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
      post('tipoanomalia', tipoNuevo)
      navigate('/show-tipo-anomalia') // Moverse a la ruta "show-tipo-anomalia" después del post
    }
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center bg-light">
      <form
        className="d-flex flex-column align-items-center justify-content-center p-4 border rounded bg-light"
        noValidate
        onSubmit={handleSubmit}
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
            value={tipoNuevo.nombre_tipo_anomalia}
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
              id="facil"
              onChange={() =>
                setTipoNuevo({
                  ...tipoNuevo,
                  dificultad_tipo_anomalia: 1,
                })
              }
            />
            <label className="form-check-label" htmlFor="facil">
              Fácil
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="dificultad"
              id="media"
              onChange={() =>
                setTipoNuevo({
                  ...tipoNuevo,
                  dificultad_tipo_anomalia: 2,
                })
              }
            />
            <label className="form-check-label" htmlFor="media">
              Media
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="dificultad"
              id="dificil"
              onChange={() =>
                setTipoNuevo({
                  ...tipoNuevo,
                  dificultad_tipo_anomalia: 3,
                })
              }
            />
            <label className="form-check-label" htmlFor="dificil">
              Difícil
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Cargar Tipo
        </button>
        <Link className="btn btn-secondary" to="/show-tipo-anomalia">
          Cancelar
        </Link>
      </form>
    </div>
  )
}
