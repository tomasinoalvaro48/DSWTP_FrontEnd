import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Accordion, Spinner, Alert, Badge } from 'react-bootstrap'
import { get, getFilter } from '../../api/dataManager.ts'
import type { PedidoResolucion, Localidad } from '../../entities/entities.ts'

export function ShowMisPedidosResueltosDenunciante() {
  const token = localStorage.getItem('token')

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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDificultadMostrada(dificultadFilter)
    }, 200) // 200 ms de delay

    return () => clearTimeout(timer)
  }, [dificultadFilter])

  const [query, setQuery] = useState(`pedido_resolucion?estado_pedido_resolucion=${'resuelto'}`)
  let {
    data: pedido_resolucion_actual,
    loading: pedido_resolucion_loading_actual,
    error: pedido_resolucion_error_actual,
  } = getFilter<PedidoResolucion>(query, {
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
      setQuery(nuevaUrl)
    } catch (err: any) {
      console.error(err)
      alert(err?.response?.data?.message ?? 'Error al realizar la busqueda.')
    }
  }

  return (
    <div className="container-fluid">
      {/* Header con botón volver */}
      <div className="bg-body-tertiary border-bottom shadow-sm">
        <div className="container-fluid px-3 py-3">
          <div className="row align-items-center">
            <div className="col-auto">
              <Link to="/show-mis-pedidos-denunciante" className="btn btn-outline-secondary">
                <i className="bi bi-arrow-left me-2"></i>
                Volver
              </Link>
            </div>
            <div className="col">
              <h1 className="m-0 fw-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
                Historial de Pedidos Resueltos
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Panel de filtros lateral */}
        <div className="col-lg-3 col-md-4 bg-body-tertiary p-3 border">
          <h4 className="mb-3">
            <i className="bi bi-funnel me-2"></i>Filtros
          </h4>

          {loadingLoc && (
            <div className="d-flex align-items-center">
              <Spinner animation="border" role="status" size="sm" className="me-2" />
              <span>Cargando...</span>
            </div>
          )}

          {errorLoc && <Alert variant="danger">Error: {errorLoc}</Alert>}

          {!loadingLoc && !errorLoc && (localidades?.length ?? 0) > 0 && (
            <form onSubmit={haddleSearch}>
              {/* Dificultad */}
              <div className="mb-4">
                <label htmlFor="dificultad" className="form-label">
                  <strong>Dificultad mínima:</strong>
                </label>
                <div className="d-flex align-items-center gap-2 mb-2">
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
                    style={{
                      height: '6px',
                      accentColor: '#0d6efd',
                    }}
                  />
                </div>
              </div>

              {/* Localidad */}
              <div className="mb-4">
                <label htmlFor="localidad" className="form-label">
                  <strong>Localidad:</strong>
                </label>
                <select
                  className="form-select"
                  id="localidad"
                  name="localidad"
                  value={localidadSeleccionada?.id}
                  onChange={handleCambioLocalidad}
                >
                  <option value="">Todas las localidades</option>
                  {localidades?.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.nombre_localidad}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botón */}
              <button className="btn btn-success w-100" type="submit">
                <i className="bi bi-search me-2"></i>Buscar
              </button>
            </form>
          )}
        </div>

        {/* Contenido principal */}
        <div className="col-lg-9 col-md-8 p-0">
          <div className="bg-body-tertiary border-bottom shadow-sm px-3 py-3">
            <h2 className="m-0 fw-semibold" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
              <i className="bi bi-check-circle text-success me-2"></i>
              <span className="d-none d-md-inline">Pedidos </span>Resueltos
            </h2>
          </div>

          {pedido_resolucion_loading_actual && (
            <div className="d-flex align-items-center">
              <Spinner animation="border" role="status" size="sm" className="me-2" />
              <span>Cargando pedidos...</span>
            </div>
          )}

          {pedido_resolucion_error_actual && (
            <Alert variant="danger">
              Error al cargar pedidos: {pedido_resolucion_error_actual}
            </Alert>
          )}

          {!pedido_resolucion_loading_actual &&
            !pedido_resolucion_error_actual &&
            pedido_resolucion_actual?.length === 0 && (
              <Alert variant="info" className="m-3">
                No tenés pedidos resueltos.
              </Alert>
            )}

          {!pedido_resolucion_loading_actual &&
            !pedido_resolucion_error_actual &&
            pedido_resolucion_actual && (
              <div className="accordion my-3 mx-4">
                <Accordion>
                  {pedido_resolucion_actual?.map((unPedido) => (
                    <Accordion.Item eventKey={unPedido.id.toString()} key={unPedido.id}>
                      <Accordion.Header>
                        <div className="w-100">
                          <div className="row g-2 align-items-center">
                            {/* Localidad y Zona */}
                            <div className="col-12 col-md-3">
                              <div className="small">
                                <strong className="d-block text-truncate">
                                  {unPedido.zona.localidad.nombre_localidad}
                                </strong>
                                <span className="text-muted text-truncate d-block">
                                  {unPedido.zona.nombre_zona}
                                </span>
                              </div>
                            </div>

                            {/* Dirección */}
                            <div className="col-12 col-md-3 d-none d-md-block">
                              <div className="small text-truncate">
                                <i className="bi bi-geo-alt me-1"></i>
                                {unPedido.direccion_pedido_resolucion}
                              </div>
                            </div>

                            {/* Dificultad */}
                            <div className="col-6 col-md-2">
                              <span className="badge bg-success">
                                Dificultad: {unPedido.dificultad_pedido_resolucion}
                              </span>
                            </div>

                            {/* Fecha */}
                            <div className="col-6 col-md-4">
                              <small className="text-muted">
                                <i className="bi bi-calendar3 me-1"></i>
                                {new Date(unPedido.fecha_pedido_resolucion).toLocaleDateString(
                                  'es-AR'
                                )}
                              </small>
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

                          {/* Datos Cazador */}
                          <div className="border rounded-3 mb-3 p-3 bg-light">
                            <h5 className="mb-3">
                              <i className="bi bi-person-badge me-2"></i>Datos del Cazador
                            </h5>
                            <div className="row g-3">
                              <div className="col-12 col-md-4">
                                <strong>Nombre: </strong>
                                <span className="d-block d-md-inline">
                                  {unPedido.cazador?.nombre_usuario}
                                </span>
                              </div>
                              <div className="col-12 col-md-4">
                                <strong>Email: </strong>
                                <span className="d-block d-md-inline text-break">
                                  {unPedido.cazador?.email_usuario}
                                </span>
                              </div>
                              <div className="col-12 col-md-4">
                                <strong>Nivel: </strong>
                                <span className="badge bg-success">
                                  Nivel {unPedido.cazador?.nivel_cazador}
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
                              {unPedido.descripcion_pedido_resolucion
                                ? unPedido.descripcion_pedido_resolucion
                                : 'No hay descripción cargada'}
                            </p>
                          </div>

                          {/* Anomalías */}
                          <div className="border rounded-3 mb-3 bg-light">
                            <Accordion>
                              {unPedido.anomalias.length > 0 && (
                                <Accordion.Item eventKey={`${unPedido.id}-anomalias`}>
                                  <Accordion.Header>
                                    <div className="w-100">
                                      <h5 className="mb-0">
                                        <i className="bi bi-exclamation-triangle me-2"></i>
                                        Ver Anomalías ({unPedido.anomalias.length})
                                      </h5>
                                    </div>
                                  </Accordion.Header>
                                  <Accordion.Body>
                                    <div className="row g-3">
                                      {unPedido.anomalias.map((anomalia) => (
                                        <div
                                          key={anomalia.id}
                                          className="col-12 border-bottom pb-3"
                                        >
                                          <div className="row g-3 align-items-center">
                                            <div className="col-12 col-md-4">
                                              <strong>Nombre: </strong>
                                              <span className="d-block d-md-inline">
                                                {anomalia.tipo_anomalia.nombre_tipo_anomalia}
                                              </span>
                                            </div>
                                            <div className="col-6 col-md-4">
                                              <strong>Dificultad: </strong>
                                              <span className="badge bg-success">
                                                {anomalia.tipo_anomalia.dificultad_tipo_anomalia}
                                              </span>
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
                              )}
                            </Accordion>
                          </div>

                          {/* Inspecciones */}
                          <div className="border rounded-3 bg-light">
                            <Accordion>
                              {unPedido.inspecciones.length > 0 && (
                                <Accordion.Item eventKey={`${unPedido.id}-inspecciones`}>
                                  <Accordion.Header>
                                    <div className="w-100">
                                      <div className="row g-2 align-items-center">
                                        <div className="col-12 col-md-6">
                                          <h5 className="mb-0">
                                            <i className="bi bi-clipboard-check me-2"></i>
                                            Inspecciones ({unPedido.inspecciones.length})
                                          </h5>
                                        </div>
                                        <div className="col-12 col-md-6">
                                          <div className="small text-md-end">
                                            <span className="badge bg-secondary me-2">
                                              #{unPedido.inspecciones[0].numero_inspeccion}
                                            </span>
                                            <i className="bi bi-calendar3 me-1"></i>
                                            {new Date(
                                              unPedido.inspecciones[0].fecha_inspeccion
                                            ).toLocaleDateString('es-AR')}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Accordion.Header>
                                  <Accordion.Body>
                                    <div className="row g-3">
                                      {unPedido.inspecciones.map((inspeccion) => (
                                        <div
                                          key={inspeccion.id}
                                          className="col-12 border-bottom pb-3"
                                        >
                                          <div className="row g-2">
                                            <div className="col-6 col-md-2">
                                              <strong>Inspección: </strong>
                                              <span className="badge bg-secondary">
                                                #{inspeccion.numero_inspeccion}
                                              </span>
                                            </div>
                                            <div className="col-6 col-md-3">
                                              <strong>Fecha: </strong>
                                              <span className="d-block d-md-inline">
                                                {new Date(
                                                  inspeccion.fecha_inspeccion
                                                ).toLocaleDateString('es-AR')}
                                              </span>
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

          {pedido_resolucion_loading_actual && <div className="p-3">Cargando...</div>}
          {pedido_resolucion_error_actual && (
            <div className="p-3 text-danger">{pedido_resolucion_error_actual}</div>
          )}
        </div>
      </div>
    </div>
  )
}
