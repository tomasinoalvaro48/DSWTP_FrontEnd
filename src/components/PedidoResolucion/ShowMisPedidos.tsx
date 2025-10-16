import { get, patch, getFilter } from '../../api/dataManager.ts'
import type { PedidoResolucion, Localidad } from '../../entities/entities.ts'
import { Accordion, Spinner, Alert, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function ShowMisPedidos() {
  const navigate = useNavigate()

  const { data: localidades, loading: loadingLoc, error: errorLoc } = get<Localidad>('localidad')

  const handleCambioLocalidad = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const loc_id = event.target.value
    const loc = localidades.find((l) => l.id === loc_id)
    setLocalidadSeleccionada(loc)
  }

  const [localidadSeleccionada, setLocalidadSeleccionada] = useState<Localidad>()

  const [dificultadFilter, setDificultadFilter] = useState(0)
  const [dificultadMostrada, setDificultadMostrada] = useState(dificultadFilter)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDificultadMostrada(dificultadFilter)
    }, 200) // 300 ms de delay

    return () => clearTimeout(timer)
  }, [dificultadFilter])

  const token = localStorage.getItem('token')

  const [queryActual, setQueryActual] = useState(
    `pedido_resolucion/mis_pedidos?estado_pedido_resolucion=${'aceptado'}`
  )

  let {
    data: pedido_resolucion_actual,
    loading: pedido_resolucion_loading_actual,
    error: pedido_resolucion_error_actual,
  } = get<PedidoResolucion>(queryActual, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const [queryHistorico, setQueryHistorico] = useState(
    `pedido_resolucion/mis_pedidos?estado_pedido_resolucion=${'resuelto'}`
  )

  let {
    data: pedido_resolucion_historico,
    loading: pedido_resolucion_loading_historico,
    error: pedido_resolucion_error_historico,
  } = getFilter<PedidoResolucion>(queryHistorico, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const haddleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      const params = new URLSearchParams()

      // Estado del pedido
      const estado_pedido_resolucion = 'resuelto'
      if (estado_pedido_resolucion) {
        params.append('estado_pedido_resolucion', estado_pedido_resolucion)
      }

      // Dificultad
      if (dificultadFilter > 0) {
        params.append('dificultad_pedido_resolucion', dificultadFilter.toString())
      }

      // Zonas
      if (localidadSeleccionada?.zonas) {
        localidadSeleccionada.zonas.forEach((zona: any) => {
          params.append('zonas', zona.id.toString())
        })
      }

      // Construir nueva URL
      const nuevaUrl = `pedido_resolucion/mis_pedidos?${params.toString()}`

      // Actualizar estado en React
      setQueryHistorico(nuevaUrl)
    } catch (err: any) {
      console.error(err)
      alert(err?.response?.data?.message ?? 'Error al realizar la busqueda.')
    }
  }

  const haddleResolucionAnomalia = async (id: string) => {
    try {
      await patch(
        `anomalia/resolver_anomalia/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      alert('Anomalía resuelta correctamente.')
      location.reload()
    } catch (err: any) {
      console.error('Error al resolver anomalía:', err)
      alert(err?.response?.data?.message ?? 'No se pudo resolver la anomalía.')
    }
  }

  const haddleAgregarInspeccion = (idPedidoResolcion: string) => {
    navigate(`/add-inspeccion/${idPedidoResolcion}`)
  }

  const haddleFinalizarPedido = (idPedidoResolcion: string) => {
    try {
      navigate(`/finalizar-pedido/${idPedidoResolcion}`)
    } catch (err: any) {
      console.error('Error al resolver anomalía:', err)
      alert(err?.response?.data?.message ?? 'Hay anomalias pendientes')
    }
  }
  return (
    <div className="ShowPosiblesPedidos">
      <div className="navbar bg-body-tertiary px-3">
        <h1 className="me-auto">Mis Pedidos</h1>
      </div>

      <div className="mb-4 border-bottom border-2">
        {pedido_resolucion_loading_actual && (
          <div className="d-flex align-items-center">
            <Spinner animation="border" role="status" size="sm" className="me-2" />
            <span>Cargando pedidos...</span>
          </div>
        )}
        {pedido_resolucion_error_actual && (
          <Alert variant="danger">Error al cargar pedidos: {pedido_resolucion_error_actual}</Alert>
        )}

        {!pedido_resolucion_loading_actual &&
          !pedido_resolucion_error_actual &&
          pedido_resolucion_actual && (
            <div className="accordion my-3 mx-4">
              <Accordion
                alwaysOpen
                defaultActiveKey={pedido_resolucion_actual?.map((p) => p.id.toString())}
              >
                {pedido_resolucion_actual?.map((unPedido) => (
                  <Accordion.Item eventKey={unPedido.id.toString()} key={unPedido.id}>
                    <Accordion.Header>
                      <div className="row justify-content-between w-100 align-items-center">
                        <div className="col-3 md">
                          <strong>Localidad: </strong> {unPedido.zona.localidad.nombre_localidad}{' '}
                          <br />
                          <strong>Zona: </strong> {unPedido.zona.nombre_zona}
                        </div>

                        <div className="col-3 md">
                          <strong>Direccion: </strong> {unPedido.direccion_pedido_resolucion}
                        </div>

                        <div className="col-2 md">
                          <strong>Dificultad: </strong> {unPedido.dificultad_pedido_resolucion}
                        </div>

                        <div className="col-md-3 col-sm-2">
                          <strong>Fecha Realiz: </strong>
                          {new Date(unPedido.fecha_pedido_resolucion).toLocaleDateString('es-AR')}
                        </div>

                        <div className="col-md-1 col-sm-2 justify-content-right">Ver detalle</div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="container">
                        <div className="container denunciante border rounded-4 mb-4 p-4">
                          <div className="row justify-content-left w-100 align-items-center ">
                            <h2>Datos Denunciante</h2>
                          </div>
                          <div className="row justify-content-between w-100 align-items-center ">
                            <div className="col-3 md">
                              <strong>Nombre y Apellido: </strong>
                              {unPedido.denunciante.nombre_apellido_denunciante}
                            </div>

                            <div className="col-md-2">
                              <strong>Tipo Documento: </strong>
                              {unPedido.denunciante.tipo_documento_denunciante}
                            </div>
                            <div className="col-md-2">
                              <strong>Numero Documento: </strong>
                              {unPedido.denunciante.numero_documento_denunciante}
                            </div>

                            <div className="col-md-2">
                              <strong>Telefono: </strong>{' '}
                              {unPedido.denunciante.telefono_denunciante}
                            </div>

                            <div className="col-md-3">
                              <strong>Email: </strong>
                              {unPedido.denunciante.email_denunciante}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <strong>Descripcion: </strong>
                          {unPedido.descripcion_pedido_resolucion
                            ? unPedido.descripcion_pedido_resolucion
                            : 'No hay descripcion cargada'}
                        </div>

                        <div className="mb-4">
                          {/* Ver anomalías */}
                          <Accordion>
                            {/* La primera anomalía (la de mayor dificultad) */}
                            {unPedido.anomalias.length > 0 && (
                              <Accordion.Item eventKey={`${unPedido.id}-top`}>
                                <Accordion.Header>
                                  <div className="row justify-content-center w-100 align-items-center">
                                    Ver Anomalías
                                  </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  {/* Cuando se despliega muestro TODAS las anomalías */}
                                  <div className="row justify-content-center w-100 align-items-center">
                                    {unPedido.anomalias.map((anomalia) => (
                                      <div
                                        key={anomalia.id}
                                        className="row border-bottom py-1 text-center"
                                      >
                                        <div className="col-md-3">
                                          <strong>
                                            {anomalia.tipo_anomalia.nombre_tipo_anomalia}
                                          </strong>
                                        </div>
                                        <div className="col-md-3">
                                          <strong>Dificultad: </strong>
                                          {anomalia.tipo_anomalia.dificultad_tipo_anomalia}
                                        </div>
                                        <div className="col-md-3 d-flex align-items-center">
                                          <strong className="me-2">Resultado:</strong>
                                          <Badge
                                            bg={
                                              anomalia.resultado_anomalia === 'inconcluso'
                                                ? 'warning'
                                                : 'success'
                                            }
                                            text={
                                              anomalia.resultado_anomalia === 'inconcluso'
                                                ? 'dark'
                                                : 'light'
                                            }
                                          >
                                            {anomalia.resultado_anomalia.toUpperCase()}
                                          </Badge>
                                        </div>

                                        <div className="col-md-3">
                                          {anomalia.resultado_anomalia === 'inconcluso' && (
                                            <button
                                              className="btn btn-success"
                                              onClick={() => haddleResolucionAnomalia(anomalia.id)}
                                            >
                                              Resolver
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            )}
                          </Accordion>
                        </div>

                        <div className="mb-4">
                          <Accordion>
                            {/* Inspecciones) */}

                            {unPedido.inspecciones.length > 0 && (
                              <Accordion.Item eventKey={`${unPedido.id}-top`}>
                                {' '}
                                {/*ver que onda con el pedidoId */}
                                <Accordion.Header>
                                  <div className="row justify-content-center w-100 align-items-center">
                                    <div className="row justify-content-center w-100 align-items-center">
                                      <div className="col-md-12">
                                        <h2>Inspecciones</h2>
                                      </div>
                                    </div>

                                    <div className="row justify-content-between w-100 align-items-left">
                                      <div className="col-md-2">
                                        <strong>Inspeccion Número: </strong>{' '}
                                        {unPedido.inspecciones[0].numero_inspeccion}
                                      </div>
                                      <div className="col-md-2">
                                        <strong>Fecha: </strong>
                                        {new Date(
                                          unPedido.inspecciones[0].fecha_inspeccion
                                        ).toLocaleDateString('es-AR')}
                                      </div>
                                      <div className="col-md-8 text-">
                                        <strong>Comentario de avance: </strong>
                                        {unPedido.inspecciones[0].comentario_inspeccion}
                                      </div>
                                    </div>
                                  </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  {/* Cuando se despliega muestro TODAS las anomalías */}
                                  <div className="row justify-content-center w-100 align-items-left">
                                    {unPedido.inspecciones.map((inspeccion) => (
                                      <div
                                        key={inspeccion.id}
                                        className="row border-bottom py-1 text-left"
                                      >
                                        <div className="col-md-2">
                                          <strong>Inspeccion Número: </strong>{' '}
                                          {inspeccion.numero_inspeccion}
                                        </div>
                                        <div className="col-md-2">
                                          <strong>Fecha: </strong>
                                          {new Date(inspeccion.fecha_inspeccion).toLocaleDateString(
                                            'es-AR'
                                          )}
                                        </div>
                                        <div className="col-md-8">
                                          <strong>Comentario de avance: </strong>{' '}
                                          {inspeccion.comentario_inspeccion}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            )}
                          </Accordion>
                        </div>

                        <div className="row mb-4 justify-content-center">
                          <div className="col-md-6 mb-2">
                            <button
                              className="btn btn-secondary w-100"
                              onClick={() => haddleAgregarInspeccion(unPedido.id)}
                            >
                              Agregar Inspección
                            </button>
                          </div>
                          <div className="col-md-6">
                            <button
                              className="btn btn-success w-100"
                              onClick={() => haddleFinalizarPedido(unPedido.id)}
                            >
                              Finalizar Pedido
                            </button>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          )}

        {pedido_resolucion_loading_actual && <div>Cargando...</div>}
        {pedido_resolucion_error_actual && <div>{pedido_resolucion_error_actual}</div>}
      </div>

      <div>
        {loadingLoc && (
          <div className="d-flex align-items-center">
            <Spinner animation="border" role="status" size="sm" className="me-2" />
            <span>Cargando localidades...</span>
          </div>
        )}
        {errorLoc && <Alert variant="danger">Error al cargar pedidos: {errorLoc}</Alert>}

        {!loadingLoc && !errorLoc && (localidades?.length ?? 0) > 0 && (
          <div className="bg-body-tertiary d-flex align-items-center justify-content-between px-4 py-3 flex-wrap">
            {/* Título */}
            <h2 className="m-0 flex-shrink-0">Pedidos Históricos</h2>

            {/* Filtros */}
            <form
              className="d-flex align-items-center gap-5 flex-nowrap"
              onSubmit={haddleSearch}
              style={{ flexGrow: 1, justifyContent: 'flex-end' }}
            >
              {/* Dificultad */}
              <div className="d-flex align-items-center gap-3">
                <label htmlFor="dificultad" className="mb-0">
                  <strong>Dificultad:</strong>
                </label>
                <span style={{ minWidth: '40px', textAlign: 'center' }}>
                  {dificultadMostrada === 0 ? '0' : dificultadMostrada}
                </span>
                <input
                  id="dificultad"
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={dificultadFilter}
                  onChange={(e) => setDificultadFilter(parseInt(e.target.value))}
                  className="form-range"
                  style={{
                    width: '150px',
                    height: '6px',
                    accentColor: '#0d6efd',
                  }}
                />
              </div>

              {/* Localidad */}
              <div className="d-flex align-items-center gap-3">
                <label htmlFor="localidad" className="mb-0">
                  <strong>Localidad:</strong>
                </label>
                <select
                  className="form-select"
                  id="localidad"
                  name="localidad"
                  value={localidadSeleccionada?.id}
                  onChange={handleCambioLocalidad}
                  style={{ width: '220px' }}
                >
                  <option value="">Seleccionar localidad</option>
                  {localidades?.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.nombre_localidad}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botón */}
              <button className="btn btn-success px-4" type="submit">
                Buscar
              </button>
            </form>
          </div>
        )}
      </div>

      <div>
        {pedido_resolucion_loading_historico && (
          <div className="d-flex align-items-center">
            <Spinner animation="border" role="status" size="sm" className="me-2" />
            <span>Cargando pedidos...</span>
          </div>
        )}
        {pedido_resolucion_error_historico && (
          <Alert variant="danger">
            Error al cargar pedidos: {pedido_resolucion_error_historico}
          </Alert>
        )}

        {!pedido_resolucion_loading_historico &&
          !pedido_resolucion_error_historico &&
          pedido_resolucion_historico && (
            <div className="accordion my-3 mx-4">
              <Accordion>
                {pedido_resolucion_historico?.map((unPedido) => (
                  <Accordion.Item eventKey={unPedido.id.toString()} key={unPedido.id}>
                    <Accordion.Header>
                      <div className="row justify-content-between w-100 align-items-center">
                        <div className="col-3 md">
                          <strong>Localidad: </strong> {unPedido.zona.localidad.nombre_localidad}{' '}
                          <br />
                          <strong>Zona: </strong> {unPedido.zona.nombre_zona}
                        </div>

                        <div className="col-3 md">
                          <strong>Direccion: </strong> {unPedido.direccion_pedido_resolucion}
                        </div>

                        <div className="col-2 md">
                          <strong>Dificultad: </strong> {unPedido.dificultad_pedido_resolucion}
                        </div>

                        <div className="col-md-3 col-sm-2">
                          <strong>Fecha Realiz: </strong>
                          {new Date(unPedido.fecha_pedido_resolucion).toLocaleDateString('es-AR')}
                        </div>

                        <div className="col-md-1 col-sm-2 justify-content-right">Ver detalle</div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="container">
                        <div className="container denunciante border rounded-4 mb-4 p-4">
                          <div className="row justify-content-left w-100 align-items-center ">
                            <h2>Datos Denunciante</h2>
                          </div>
                          <div className="row justify-content-between w-100 align-items-center ">
                            <div className="col-3 md">
                              <strong>Nombre y Apellido: </strong>
                              {unPedido.denunciante.nombre_apellido_denunciante}
                            </div>

                            <div className="col-md-2">
                              <strong>Tipo Documento: </strong>
                              {unPedido.denunciante.tipo_documento_denunciante}
                            </div>
                            <div className="col-md-2">
                              <strong>Numero Documento: </strong>
                              {unPedido.denunciante.numero_documento_denunciante}
                            </div>

                            <div className="col-md-2">
                              <strong>Telefono: </strong>{' '}
                              {unPedido.denunciante.telefono_denunciante}
                            </div>

                            <div className="col-md-3">
                              <strong>Email: </strong>
                              {unPedido.denunciante.email_denunciante}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <strong>Descripcion: </strong>
                          {unPedido.descripcion_pedido_resolucion
                            ? unPedido.descripcion_pedido_resolucion
                            : 'No hay descripcion cargada'}
                        </div>

                        <div className="mb-4">
                          {/* Ver anomalías */}
                          <Accordion>
                            {/* La primera anomalía (la de mayor dificultad) */}
                            {unPedido.anomalias.length > 0 && (
                              <Accordion.Item eventKey={`${unPedido.id}-top`}>
                                <Accordion.Header>
                                  <div className="row justify-content-center w-100 align-items-center">
                                    Ver Anomalías
                                  </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  {/* Cuando se despliega muestro TODAS las anomalías */}
                                  <div className="row justify-content-center w-100 align-items-center">
                                    {unPedido.anomalias.map((anomalia) => (
                                      <div
                                        key={anomalia.id}
                                        className="row border-bottom py-1 text-center"
                                      >
                                        <div className="col-md-4">
                                          <strong>Nombre: </strong>
                                          {anomalia.tipo_anomalia.nombre_tipo_anomalia}
                                        </div>
                                        <div className="col-md-4">
                                          <strong>Dificultad: </strong>
                                          {anomalia.tipo_anomalia.dificultad_tipo_anomalia}
                                        </div>
                                        <div className="col-md-4 d-flex align-items-center">
                                          <strong className="me-2">Resultado:</strong>
                                          <Badge
                                            bg={
                                              anomalia.resultado_anomalia === 'inconcluso'
                                                ? 'warning'
                                                : 'success'
                                            }
                                            text={
                                              anomalia.resultado_anomalia === 'inconcluso'
                                                ? 'dark'
                                                : 'light'
                                            }
                                          >
                                            {anomalia.resultado_anomalia.toUpperCase()}
                                          </Badge>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            )}
                          </Accordion>
                        </div>

                        <div className="mb-4">
                          <Accordion>
                            {/* Inspecciones) */}

                            {unPedido.inspecciones.length > 0 && (
                              <Accordion.Item eventKey={`${unPedido.id}-top`}>
                                {' '}
                                {/*ver que onda con el pedidoId */}
                                <Accordion.Header>
                                  <div className="row justify-content-center w-100 align-items-center">
                                    <div className="row justify-content-center w-100 align-items-center">
                                      <div className="col-md-12">
                                        <h2>Inspecciones</h2>
                                      </div>
                                    </div>

                                    <div className="row justify-content-between w-100 align-items-left">
                                      <div className="col-md-2">
                                        <strong>Inspeccion Número: </strong>{' '}
                                        {unPedido.inspecciones[0].numero_inspeccion}
                                      </div>
                                      <div className="col-md-2">
                                        <strong>Fecha: </strong>
                                        {new Date(
                                          unPedido.inspecciones[0].fecha_inspeccion
                                        ).toLocaleDateString('es-AR')}
                                      </div>
                                      <div className="col-md-8 text-">
                                        <strong>Comentario de avance: </strong>
                                        {unPedido.inspecciones[0].comentario_inspeccion}
                                      </div>
                                    </div>
                                  </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  {/* Cuando se despliega muestro TODAS las anomalías */}
                                  <div className="row justify-content-center w-100 align-items-left">
                                    {unPedido.inspecciones.map((inspeccion) => (
                                      <div
                                        key={inspeccion.id}
                                        className="row border-bottom py-1 text-left"
                                      >
                                        <div className="col-md-2">
                                          <strong>Inspeccion Número: </strong>{' '}
                                          {inspeccion.numero_inspeccion}
                                        </div>
                                        <div className="col-md-2">
                                          <strong>Fecha: </strong>
                                          {new Date(inspeccion.fecha_inspeccion).toLocaleDateString(
                                            'es-AR'
                                          )}
                                        </div>
                                        <div className="col-md-8">
                                          <strong>Comentario de avance: </strong>{' '}
                                          {inspeccion.comentario_inspeccion}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            )}
                          </Accordion>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          )}

        {pedido_resolucion_loading_historico && <div>Cargando...</div>}
        {pedido_resolucion_error_historico && <div>{pedido_resolucion_error_historico}</div>}
      </div>
    </div>
  )
}
