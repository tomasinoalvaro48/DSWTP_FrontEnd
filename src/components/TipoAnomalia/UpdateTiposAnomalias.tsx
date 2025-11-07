import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getOne, patch } from '../../api/dataManager.ts'
import ModalAlert from '../ModalAlert.tsx'
import type { TipoAnomalia } from '../../entities/entities.ts'

export function UpdateTiposAnomalias() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = getOne<TipoAnomalia>('tipo_anomalia/' + id)
  const [modalAlert, setModalAlert] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const [tipoToUpdate, setTipoToUpdate] = useState<TipoAnomalia>({
    id: '',
    nombre_tipo_anomalia: '',
    dificultad_tipo_anomalia: 0,
  })

  useEffect(() => {
    if (data) {
      setTipoToUpdate({
        id: data.id,
        nombre_tipo_anomalia: data.nombre_tipo_anomalia,
        dificultad_tipo_anomalia: data.dificultad_tipo_anomalia,
      })
    }
  }, [data])

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await patch('tipo_anomalia/' + id, tipoToUpdate)
      navigate('/show-tipo-anomalia')
    } catch (err: any) {
      setTitle('Nombre de Tipo de Anomalía Duplicado')
      setBody('El nombre del tipo de anomalía ya existe. Por favor, elija otro nombre.')
      setModalAlert(true)
    }
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex flex-column bg-light p-4 border rounded shadow-sm">
            {modalAlert && (
              <ModalAlert title={title} body={body} setShowModalAlert={setModalAlert} />
            )}
            <h1 className="text-center mb-4">Editar Tipo de Anomalía</h1>

            <form className="d-flex flex-column" onSubmit={handleUpdate}>
              <label htmlFor="nombre" className="form-label">
                Nombre del tipo:
              </label>
              <input
                required
                type="text"
                id="nombre"
                className="form-control mb-3"
                placeholder="Ingrese el nombre"
                value={tipoToUpdate.nombre_tipo_anomalia}
                pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                title="El nombre no puede tener números"
                onChange={(e) =>
                  setTipoToUpdate({
                    ...tipoToUpdate,
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
                value={tipoToUpdate.dificultad_tipo_anomalia}
                onChange={(e) =>
                  setTipoToUpdate({
                    ...tipoToUpdate,
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
