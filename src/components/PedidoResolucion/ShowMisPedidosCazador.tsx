import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Accordion, Spinner, Alert, Badge } from 'react-bootstrap'
import { get, patch, getFilter } from '../../api/dataManager.ts'
import type { PedidoResolucion, Localidad } from '../../entities/entities.ts'
import ModalAlert from '../ModalAlert.tsx'

export function ShowMisPedidos() {
  const navigate = useNavigate()

  const { data: localidades, loading: loadingLoc, error: errorLoc } = get<Localidad>('localidad')

  const handleCambioLocalidad = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const loc_id = event.target.value
    const loc = localidades.find((l) => l.id === loc_id)
    setLocalidadSeleccionada(loc)
  }

  const [showModalAlert, setShowModalAlert] = useState(false)
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState<Localidad>()
  const [dificultadFilter, setDificultadFilter] = useState(0)
  const [dificultadMostrada, setDificultadMostrada] = useState(dificultadFilter)
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'success' | 'danger' | 'warning' | null>(null)

  const showMessage = (text: string, type: 'success' | 'danger' | 'warning') => {
    setMessage(text)
    setMessageType(type)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDificultadMostrada(dificultadFilter)
    }, 200) // 200 ms de delay

    return () => clearTimeout(timer)
  }, [dificultadFilter])

  const token = localStorage.getItem('token')

  const queryActual = `pedido_resolucion?estado_pedido_resolucion=${'aceptado'}`

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
    `pedido_resolucion?estado_pedido_resolucion=${'resuelto'}`
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
      const nuevaUrl = `pedido_resolucion?${params.toString()}`

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
      setShowModalAlert(true)
    } catch (err: any) {
      console.error('Error al resolver anomalía:', err)
      alert(err?.response?.data?.message ?? 'No se pudo resolver la anomalía.')
    }
  }

  const haddleAgregarInspeccion = (idPedidoResolcion: string) => {
    navigate(`/add-inspeccion/${idPedidoResolcion}`)
  }

  const haddleFinalizarPedido = async (idPedidoResolucion: string) => {
    try {
      const pedido = pedido_resolucion_actual.find((p) => p.id === idPedidoResolucion)

      if (!pedido) return

      const tieneInconclusas = pedido.anomalias.some((a) => a.resultado_anomalia === 'inconcluso')

      if (tieneInconclusas) {
        showMessage(
          'Hay anomalías no resueltas. No es posible finalizar pedido hasta que todas sus anomalías estén resueltas',
          'danger'
        )
        return
      }

      navigate(`/finalizar-pedido/${idPedidoResolucion}`)
    } catch (err) {
      console.error(err)
      showMessage('Error al validar anomalías. Intente nuevamente.', 'danger')
    }
  }

  return (
    <div className="ShowPosiblesPedidos">
      <div className="navbar bg-body-tertiary border-bottom shadow-sm px-3 py-3">
        <h2
          className="m-0 flex-shrink-0 fw-semibold"
          style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)' }}
        >
          <i className="bi bi-clipboard-check me-2"></i>
          Mi Pedido en curso
        </h2>
      </div>

      {showModalAlert && (
        <ModalAlert
          setShowModalAlert={setShowModalAlert}
          title="Anomalía resuelta correctamente."
          body="La anomalía ha sido resuelta exitosamente."
          navigateOnClose="reload"
        />
      )}

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

        {message && (
          <div
            className={`alert alert-${messageType} alert-dismissible fade show text-center fw-semibold`}
            role="alert"
          >
            {message}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMessage(null)}
              aria-label="Cerrar"
            ></button>
          </div>
        )}

        {!pedido_resolucion_loading_actual && !pedido_resolucion_error_actual && (
          <>
            {pedido_resolucion_actual?.length === 0 ? (
              <Alert variant="info" className="m-3">
                No tenés ningún pedido tomado.
              </Alert>
            ) : (
              <div className="accordion my-3 mx-4">
                <Accordion
                  alwaysOpen
                  defaultActiveKey={pedido_resolucion_actual?.map((p) => p.id.toString())}
                >
                  {pedido_resolucion_actual?.map((unPedido) => (
                    <Accordion.Item eventKey={unPedido.id.toString()} key={unPedido.id}>
                      <Accordion.Header>
                        <div className="w-100">
                          <div className="row g-2 align-items-center">
                            <div className="col-12 col-md-4">
                              <strong>Localidad: </strong>
                              <span className="d-block d-md-inline">
                                {unPedido.zona.localidad.nombre_localidad}
                              </span>
                              <strong className="d-block d-md-inline d-md-none">Zona: </strong>
                              <span className="d-block d-md-inline">
                                {unPedido.zona.nombre_zona}
                              </span>
                            </div>

                            <div className="col-12 col-md-2">
                              <strong>Dirección: </strong>
                              {unPedido.direccion_pedido_resolucion}
                            </div>

                            <div className="col-6 col-md-2">
                              <strong>Dificultad: </strong>
                              <Badge bg="danger">{unPedido.dificultad_pedido_resolucion}</Badge>
                            </div>

                            <div className="col-6 col-md-4">
                              <i className="bi bi-calendar3 me-1"></i>
                              <strong>Fecha: </strong>
                              {new Date(unPedido.fecha_pedido_resolucion).toLocaleDateString(
                                'es-AR'
                              )}
                            </div>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="container-fluid px-2 px-md-3">
                          {/* Dirección completa en móviles */}
                          <div className="d-md-none mb-3 p-2 bg-light rounded">
                            <small className="text-muted">Dirección</small>
                            <div>{unPedido.direccion_pedido_resolucion}</div>
                          </div>

                          {/* Datos del denunciante */}
                          <div className="border rounded-3 mb-3 p-3 bg-light">
                            <h5 className="mb-3">
                              <i className="bi bi-person me-2"></i>Datos del Denunciante
                            </h5>
                            <div className="row g-3">
                              <div className="col-12 col-md-4">
                                <strong>Nombre: </strong>
                                <span className="d-block d-md-inline">
                                  {unPedido.denunciante.nombre_apellido_denunciante}
                                </span>
                              </div>
                              <div className="col-12 col-md-4">
                                <strong>Teléfono: </strong>
                                <span className="d-block d-md-inline">
                                  {unPedido.denunciante.telefono_denunciante}
                                </span>
                              </div>
                              <div className="col-12 col-md-4">
                                <strong>Email: </strong>
                                <span className="d-block d-md-inline text-break">
                                  {unPedido.denunciante.email_denunciante}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Descripción */}
                          <div className="border rounded-3 mb-3 p-3 bg-light">
                            <h5 className="mb-2">
                              <i className="bi bi-text-left me-2"></i>Descripción
                            </h5>
                            <p className="mb-0">
                              {unPedido.descripcion_pedido_resolucion ||
                                'No hay descripción cargada'}
                            </p>
                          </div>

                          {/* Anomalías */}
                          {unPedido.anomalias.length > 0 && (
                            <Accordion className="mb-3">
                              <Accordion.Item eventKey={`${unPedido.id}-anomalias`}>
                                <Accordion.Header>
                                  <div className="w-100">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    Ver Anomalías ({unPedido.anomalias.length})
                                  </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div className="container-fluid px-0">
                                    {unPedido.anomalias.map((anomalia, index) => (
                                      <div
                                        key={anomalia.id}
                                        className={`p-3 ${index < unPedido.anomalias.length - 1 ? 'border-bottom' : ''}`}
                                      >
                                        <div className="row g-2 align-items-center">
                                          <div className="col-12 col-md-3">
                                            <strong>Nombre: </strong>
                                            {anomalia.tipo_anomalia.nombre_tipo_anomalia}
                                          </div>
                                          <div className="col-12 col-md-2">
                                            <strong>Dificultad: </strong>
                                            <Badge bg="danger">
                                              {anomalia.tipo_anomalia.dificultad_tipo_anomalia}
                                            </Badge>
                                          </div>
                                          <div className="col-12 col-md-4">
                                            <strong>Resultado: </strong>
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
                                          <div className="col mt-2">
                                            {anomalia.resultado_anomalia === 'inconcluso' && (
                                              <button
                                                className="btn btn-success btn-sm"
                                                onClick={() =>
                                                  haddleResolucionAnomalia(anomalia.id)
                                                }
                                              >
                                                Resolver
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          )}

                          {/* Inspecciones */}
                          {unPedido.inspecciones.length > 0 && (
                            <Accordion className="mb-3">
                              <Accordion.Item eventKey={`${unPedido.id}-inspecciones`}>
                                <Accordion.Header>
                                  <div className="w-100">
                                    <i className="bi bi-clipboard-check me-2"></i>
                                    Inspecciones ({unPedido.inspecciones.length})
                                  </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div className="container-fluid px-0">
                                    {unPedido.inspecciones.map((inspeccion, index) => (
                                      <div
                                        key={inspeccion.id}
                                        className={`p-3 ${index < unPedido.inspecciones.length - 1 ? 'border-bottom' : ''}`}
                                      >
                                        <div className="row g-2">
                                          <div className="col-6 col-md-2">
                                            <strong>Inspección #: </strong>
                                            <Badge bg="secondary">
                                              {inspeccion.numero_inspeccion}
                                            </Badge>
                                          </div>
                                          <div className="col-6 col-md-3">
                                            <strong>
                                              <i className="bi bi-calendar3 me-1"></i>Fecha:{' '}
                                            </strong>
                                            {new Date(
                                              inspeccion.fecha_inspeccion
                                            ).toLocaleDateString('es-AR')}
                                          </div>
                                          <div className="col-12 col-md-7">
                                            <strong>Comentario: </strong>
                                            <span className="d-block d-md-inline">
                                              {inspeccion.comentario_inspeccion}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          )}

                          {/* Botones de acción */}
                          <div className="row g-2 mt-3">
                            <div className="col-12 col-md-6">
                              <button
                                className="btn btn-secondary w-100"
                                onClick={() => haddleAgregarInspeccion(unPedido.id)}
                              >
                                <i className="bi bi-plus-circle me-2"></i>
                                Agregar Inspección
                              </button>
                            </div>
                            <div className="col-12 col-md-6">
                              <button
                                className="btn btn-success w-100"
                                onClick={() => haddleFinalizarPedido(unPedido.id)}
                              >
                                <i className="bi bi-check-circle me-2"></i>
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
          </>
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
          <div className="bg-body-tertiary border-bottom shadow-sm px-3 py-3">
            {/* Título y filtros responsivos */}
            <div className="row g-3 align-items-center">
              <div className="col-12 col-lg-3">
                <h2
                  className="m-0 fw-semibold"
                  style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)' }}
                >
                  <i className="bi bi-clock-history me-2"></i>
                  Pedidos Históricos
                </h2>
              </div>

              {/* Filtros */}
              <div className="col-12 col-lg-9">
                <form className="row g-3 align-items-center" onSubmit={haddleSearch}>
                  {/* Dificultad */}
                  <div className="col-12 col-md-5">
                    <label htmlFor="dificultad" className="form-label mb-1">
                      <strong>Dificultad (≥):</strong>
                    </label>
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: 'bold' }}>
                        {dificultadMostrada}
                      </span>
                      <input
                        id="dificultad"
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={dificultadFilter}
                        onChange={(e) => setDificultadFilter(parseInt(e.target.value))}
                        className="form-range flex-grow-1"
                      />
                    </div>
                  </div>

                  {/* Localidad */}
                  <div className="col-12 col-md-4">
                    <label htmlFor="localidad" className="form-label mb-1">
                      <strong>Localidad:</strong>
                    </label>
                    <select
                      className="form-select"
                      id="localidad"
                      name="localidad"
                      value={localidadSeleccionada?.id}
                      onChange={handleCambioLocalidad}
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
                  <div className="col-12 col-md-3 d-flex align-items-end">
                    <button className="btn btn-success w-100" type="submit">
                      <i className="bi bi-search me-2"></i>
                      Buscar
                    </button>
                  </div>
                </form>
              </div>
            </div>
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

        {!pedido_resolucion_loading_historico && !pedido_resolucion_error_historico && (
          <>
            {pedido_resolucion_historico?.length === 0 ? (
              <Alert variant="info" className="m-3">
                No tenés pedidos resueltos.
              </Alert>
            ) : (
              <div className="accordion my-3 mx-4">
                <Accordion>
                  {pedido_resolucion_historico?.map((unPedido) => (
                    <Accordion.Item eventKey={unPedido.id.toString()} key={unPedido.id}>
                      <Accordion.Header>
                        <div className="w-100">
                          <div className="row g-2 align-items-center">
                            <div className="col-12 col-md-3">
                              <strong>Localidad: </strong>
                              <span className="d-block d-md-inline">
                                {unPedido.zona.localidad.nombre_localidad}
                              </span>
                              <strong className="d-block d-md-inline d-md-none">Zona: </strong>
                              <span className="d-block d-md-inline">
                                {unPedido.zona.nombre_zona}
                              </span>
                            </div>

                            <div className="col-12 col-md-3 text-truncate">
                              <strong>Dirección: </strong>
                              {unPedido.direccion_pedido_resolucion}
                            </div>

                            <div className="col-12 col-md-2">
                              <strong>Dificultad: </strong>
                              <Badge bg="success">{unPedido.dificultad_pedido_resolucion}</Badge>
                            </div>

                            <div className="col-6 col-md-4">
                              <i className="bi bi-calendar3 me-1"></i>
                              <strong>Fecha: </strong>
                              {new Date(unPedido.fecha_pedido_resolucion).toLocaleDateString(
                                'es-AR'
                              )}
                            </div>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="container-fluid px-2 px-md-3">
                          {/* Dirección completa en móviles */}
                          <div className="d-md-none mb-3 p-2 bg-light rounded">
                            <small className="text-muted">Dirección</small>
                            <div>{unPedido.direccion_pedido_resolucion}</div>
                          </div>

                          {/* Datos del denunciante */}
                          <div className="border rounded-3 mb-3 p-3 bg-light">
                            <h5 className="mb-3">
                              <i className="bi bi-person me-2"></i>Datos del Denunciante
                            </h5>
                            <div className="row g-3">
                              <div className="col-12 col-md-4">
                                <strong>Nombre: </strong>
                                <span className="d-block d-md-inline">
                                  {unPedido.denunciante.nombre_apellido_denunciante}
                                </span>
                              </div>
                              <div className="col-12 col-md-4">
                                <strong>Teléfono: </strong>
                                <span className="d-block d-md-inline">
                                  {unPedido.denunciante.telefono_denunciante}
                                </span>
                              </div>
                              <div className="col-12 col-md-4">
                                <strong>Email: </strong>
                                <span className="d-block d-md-inline text-break">
                                  {unPedido.denunciante.email_denunciante}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Descripción */}
                          <div className="border rounded-3 mb-3 p-3 bg-light">
                            <h5 className="mb-2">
                              <i className="bi bi-text-left me-2"></i>Descripción
                            </h5>
                            <p className="mb-0">
                              {unPedido.descripcion_pedido_resolucion ||
                                'No hay descripción cargada'}
                            </p>
                          </div>

                          {/* Anomalías */}
                          {unPedido.anomalias.length > 0 && (
                            <Accordion className="mb-3">
                              <Accordion.Item eventKey={`${unPedido.id}-anomalias-hist`}>
                                <Accordion.Header>
                                  <div className="w-100">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    Ver Anomalías ({unPedido.anomalias.length})
                                  </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div className="container-fluid px-0">
                                    {unPedido.anomalias.map((anomalia, index) => (
                                      <div
                                        key={anomalia.id}
                                        className={`p-3 ${index < unPedido.anomalias.length - 1 ? 'border-bottom' : ''}`}
                                      >
                                        <div className="row g-2">
                                          <div className="col-12 col-md-4">
                                            <strong>Nombre: </strong>
                                            {anomalia.tipo_anomalia.nombre_tipo_anomalia}
                                          </div>
                                          <div className="col-6 col-md-4">
                                            <strong>Dificultad: </strong>
                                            <Badge bg="success">
                                              {anomalia.tipo_anomalia.dificultad_tipo_anomalia}
                                            </Badge>
                                          </div>
                                          <div className="col-6 col-md-4">
                                            <strong>Resultado: </strong>
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
                                      </div>
                                    ))}
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          )}

                          {/* Inspecciones */}
                          {unPedido.inspecciones.length > 0 && (
                            <Accordion className="mb-3">
                              <Accordion.Item eventKey={`${unPedido.id}-inspecciones-hist`}>
                                <Accordion.Header>
                                  <div className="w-100">
                                    <i className="bi bi-clipboard-check me-2"></i>
                                    Inspecciones ({unPedido.inspecciones.length})
                                  </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div className="container-fluid px-0">
                                    {unPedido.inspecciones.map((inspeccion, index) => (
                                      <div
                                        key={inspeccion.id}
                                        className={`p-3 ${index < unPedido.inspecciones.length - 1 ? 'border-bottom' : ''}`}
                                      >
                                        <div className="row g-2">
                                          <div className="col-6 col-md-2">
                                            <strong>Inspección #: </strong>
                                            <Badge bg="secondary">
                                              {inspeccion.numero_inspeccion}
                                            </Badge>
                                          </div>
                                          <div className="col-6 col-md-3">
                                            <strong>
                                              <i className="bi bi-calendar3 me-1"></i>Fecha:{' '}
                                            </strong>
                                            {new Date(
                                              inspeccion.fecha_inspeccion
                                            ).toLocaleDateString('es-AR')}
                                          </div>
                                          <div className="col-12 col-md-7">
                                            <strong>Comentario: </strong>
                                            <span className="d-block d-md-inline">
                                              {inspeccion.comentario_inspeccion}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          )}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            )}
          </>
        )}

        {pedido_resolucion_loading_historico && <div>Cargando...</div>}
        {pedido_resolucion_error_historico && <div>{pedido_resolucion_error_historico}</div>}
      </div>
    </div>
  )
}
