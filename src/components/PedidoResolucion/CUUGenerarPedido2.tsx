import { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import type { TipoAnomalia, PedidoResolucion, Anomalia } from '../../entities/entities.ts'
import { get, post } from '../../api/dataManager.ts'

export function GenerarPedidoPaso2() {
  const navigate = useNavigate()

  const [anoms, setAnoms] = useState<Anomalia[]>([])
  const [descripcion, setDescripcion] = useState('')
  const { data: tipos, loading, error } = get<TipoAnomalia>('tipo_anomalia')

  // Datos del paso 1
  const location = useLocation()

  // Objeto modelo
  const pedidoRes = {
    ...location.state,
    anomalias: anoms,
    descripcion_pedido_resolucion: descripcion,
  }

  const handleAddAnomalia = (t: TipoAnomalia) => {
    if (anoms.map((a) => a.tipo_anomalia.id).includes(t.id)) {
      return alert('Anomalía ya agregada')
    }
    const nuevaAnomalia: Anomalia = {
      id: '',
      tipo_anomalia: t,
      resultado_anomalia: 'inconcluso',
    }
    setAnoms([...anoms, nuevaAnomalia])
  }

  const handleDeleteAnomalia = (ida: string) => {
    setAnoms(anoms.filter((a) => a.tipo_anomalia.id !== ida))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const token = localStorage.getItem('token')

    post<PedidoResolucion>('pedido_resolucion', pedidoRes, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    navigate('/show-pedido')
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex flex-column bg-light p-4 border rounded shadow-sm">
            <h1 className="text-center mb-4">Generar Pedido - Paso 2</h1>

            <form className="d-flex flex-column" onSubmit={handleSubmit}>
              {loading && <p>Cargando tipos de anomalía...</p>}
              {!loading && error && (
                <p className="text-danger">Error al cargar tipos de anomalías.</p>
              )}

              {!loading && !error && tipos.length > 0 && (
                <table
                  className="table table-bordered mt-3"
                  style={{ tableLayout: 'fixed', width: '100%' }}
                >
                  <colgroup>
                    <col style={{ width: '60%' }} />
                    <col style={{ width: '40%' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>Anomalía</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tipos.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="text-center">
                          No hay entidades cargadas
                        </td>
                      </tr>
                    ) : (
                      tipos.map((t) => (
                        <tr key={t.id}>
                          <td>{t.nombre_tipo_anomalia}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary w-100"
                              onClick={() => handleAddAnomalia(t)}
                            >
                              Agregar anomalía
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              <table
                className="table table-bordered mt-4"
                style={{ tableLayout: 'fixed', width: '100%' }}
              >
                <colgroup>
                  <col style={{ width: '60%' }} />
                  <col style={{ width: '40%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th colSpan={2}>Anomalías cargadas:</th>
                  </tr>
                </thead>
                <tbody>
                  {anoms.map((a) => (
                    <tr key={a.tipo_anomalia.id}>
                      <td>{a.tipo_anomalia.nombre_tipo_anomalia}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger w-100"
                          onClick={() => handleDeleteAnomalia(a.tipo_anomalia.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {anoms.length === 0 && (
                <label htmlFor="descripcion" className="form-label mt-3">
                  Descripción (obligatorio si no agregó anomalías):
                </label>
              )}
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                className="form-control mb-4"
                placeholder="Ingrese una descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required={anoms.length === 0}
              />

              {/* Botones finales */}
              <div className="row gy-2 justify-content-between">
                <div className="col-12 col-md-4">
                  <Link className="btn btn-secondary w-100" to="/show-pedido">
                    Cancelar Pedido
                  </Link>
                </div>
                <div className="col-12 col-md-4">
                  <button type="submit" className="btn btn-primary w-100">
                    Realizar Pedido
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
