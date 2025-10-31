import { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { get, post } from '../../api/dataManager.ts'
import type { TipoAnomalia, PedidoResolucion, Anomalia } from '../../entities/entities.ts'
import ModalAlert from '../ModalAlert.tsx'

export function GenerarPedidoPaso2() {
  const navigate = useNavigate()

  const [anoms, setAnoms] = useState<Anomalia[]>([])
  const [descripcion, setDescripcion] = useState('')
  const [mensaje, setMensaje] = useState<string | null>(null)
  const [tipoMensaje, setTipoMensaje] = useState<'danger' | 'success' | null>(null)
  const [showModalAlert, setShowModalAlert] = useState(false)

  const { data: tipos, loading, error } = get<TipoAnomalia>('tipo_anomalia')

  // Datos del paso 1
  const location = useLocation()

  // Objeto modelo
  const pedidoRes = {
    ...location.state,
    anomalias: anoms,
    descripcion_pedido_resolucion: descripcion.trim() || null,
  }

  const handleAddAnomalia = (t: TipoAnomalia) => {
    if (anoms.map((a) => a.tipo_anomalia.id).includes(t.id)) {
      setShowModalAlert(true)
      return
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const token = localStorage.getItem('token')

    if (anoms.length === 0) {
      setMensaje('Debe agregar al menos una anomalía.')
      setTipoMensaje('danger')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    try {
      await post<PedidoResolucion>('pedido_resolucion', pedidoRes, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMensaje('Pedido generado con éxito.')
      setTipoMensaje('success')
      navigate('/show-mis-pedidos-denunciante')
      window.location.reload()
    } catch (err: any) {
      setMensaje('Error al generar el pedido. Intente nuevamente.')
      setTipoMensaje('danger')
    }
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex flex-column bg-light p-4 border rounded shadow-sm">
            <div className="text-center mb-2">
              <h2 className="mb-0">Generar Pedido - Paso 2</h2>
            </div>

            {showModalAlert && (
              <ModalAlert
                setShowModalAlert={setShowModalAlert}
                title="Anomalía duplicada"
                body={'La anomalía ya fue agregada anteriormente.'}
              />
            )}

            <div className="mb-4 text-end">
              <Link to="/generar-pedido-paso-1" className="btn btn-outline-secondary">
                Volver
              </Link>
            </div>

            {mensaje && (
              <div className={`alert alert-${tipoMensaje} text-center fw-semibold`} role="alert">
                {mensaje}
                <button
                  type="button"
                  className="btn-close ms-2"
                  onClick={() => setMensaje(null)}
                  aria-label="Cerrar"
                ></button>
              </div>
            )}

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

              <label htmlFor="descripcion" className="form-label mt-3">
                Descripción (opcional):
              </label>

              <input
                type="text"
                id="descripcion"
                name="descripcion"
                className="form-control mb-4"
                placeholder="Ingrese una descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />

              {/* Botones finales */}
              <div className="row gy-2 justify-content-between">
                <div className="col-12 col-md-4">
                  <Link className="btn btn-secondary w-100" to="/show-mis-pedidos-denunciante">
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
