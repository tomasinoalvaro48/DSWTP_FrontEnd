import { useState, useEffect } from 'react'
import { Accordion, Spinner, Alert, Badge } from 'react-bootstrap'
import { get, getFilter } from '../../api/dataManager.ts'
import type { PedidoAgregacion } from '../../entities/entities.ts'

export function ShowPedidosAgregacionOperador() {
  const token = localStorage.getItem('token')

  const [estadoFilter, setEstadoFilter] = useState('')
  const [dificultadFilter, setDificultadFilter] = useState(0)
  const [busco, setBusco] = useState(false)

  const [queryHistorico, setQueryHistorico] = useState(
    `pedido_agregacion?estado_pedido_agregacion=aceptado&estado_pedido_agregacion=rechazado`
  )

  const { data: dataFiltrada } = getFilter<PedidoAgregacion>(queryHistorico, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusco(true)

    const params = new URLSearchParams()

    if (estadoFilter) {
      params.append('estado_pedido_agregacion', estadoFilter)
    } else {
      params.append('estado_pedido_agregacion', 'aceptado')
      params.append('estado_pedido_agregacion', 'rechazado')
    }

    if (dificultadFilter > 0) {
      params.append('dificultad_pedido_agregacion', dificultadFilter.toString())
    }

    const nuevaUrl = `pedido_agregacion?${params.toString()}`
    setQueryHistorico(nuevaUrl)
  }

  const { data, loading, error } = get<PedidoAgregacion>('pedido_agregacion', {
    headers: { Authorization: `Bearer ${token}` },
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="mb-4 border-bottom border-2 ShowPedidosAgregacionOperador">
      {/* Header con título */}
      <div className="bg-body-tertiary border-bottom shadow-sm">
        <div className="container-fluid px-3 py-4">
          <h1 className="m-0 fw-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
            <i className="bi bi-clock-history me-2"></i>
            Histórico de Pedidos de Agregación de Anomalías
          </h1>
        </div>
      </div>

      {/* Sección de filtros */}
      <div className="bg-body-tertiary border-bottom shadow-sm px-3 py-3">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-lg-2">
            <h5 className="m-0 fw-semibold">
              <i className="bi bi-funnel me-2"></i>
              Filtros
            </h5>
          </div>

          <div className="col-12 col-lg-10">
            <form className="row g-3 align-items-center" onSubmit={handleSearch}>
              {/* Estado */}
              <div className="col-12 col-md-5">
                <label htmlFor="estado" className="form-label mb-1">
                  <strong>Estado:</strong>
                </label>
                <select
                  id="estado"
                  className="form-select"
                  value={estadoFilter}
                  onChange={(e) => setEstadoFilter(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="aceptado">Aceptado</option>
                  <option value="rechazado">Rechazado</option>
                </select>
              </div>

              {/* Dificultad */}
              <div className="col-12 col-md-4">
                <label htmlFor="dificultad" className="form-label mb-1">
                  <strong>Dificultad:</strong>
                </label>
                <select
                  id="dificultad"
                  className="form-select"
                  value={dificultadFilter}
                  onChange={(e) => setDificultadFilter(Number(e.target.value))}
                >
                  <option value={0}>Todas</option>
                  <option value={1}>Nivel 1</option>
                  <option value={2}>Nivel 2</option>
                  <option value={3}>Nivel 3</option>
                </select>
              </div>

              {/* Botón Buscar */}
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

      {loading && (
        <div className="d-flex align-items-center">
          <Spinner animation="border" role="status" size="sm" className="me-2" />
          <span>Cargando pedidos...</span>
        </div>
      )}
      {error && <Alert variant="danger">Error al cargar pedidos: {error}</Alert>}

      {!loading && !error && (
        <>
          {!busco &&
            data &&
            data.filter(
              (p) =>
                p.estado_pedido_agregacion === 'aceptado' ||
                p.estado_pedido_agregacion === 'rechazado'
            ).length === 0 && (
              <Alert variant="info" className="m-3">
                No hay pedidos de agregación aceptados o rechazados.
              </Alert>
            )}

          {busco && dataFiltrada?.length === 0 && (
            <Alert variant="info" className="m-3">
              No hay pedidos que coincidan con el filtro seleccionado.
            </Alert>
          )}
        </>
      )}

      {!loading && !error && data?.length > 0 && (
        <div className="accordion my-3 mx-2 mx-md-4">
          <Accordion>
            {(dataFiltrada ?? data)
              .filter(
                (unPedido) =>
                  unPedido.estado_pedido_agregacion === 'aceptado' ||
                  unPedido.estado_pedido_agregacion === 'rechazado'
              )
              .map((unPedido) => (
                <Accordion.Item eventKey={unPedido.id.toString()} key={unPedido.id}>
                  <Accordion.Header>
                    <div className="w-100">
                      <div className="row g-2 align-items-center">
                        {/* Descripción */}
                        <div className="col-12 col-md-4">
                          <div className="small">
                            <strong className="d-block">Descripción:</strong>
                            <span className="text-muted text-truncate d-block">
                              {unPedido.descripcion_pedido_agregacion}
                            </span>
                          </div>
                        </div>

                        {/* Dificultad */}
                        <div className="col-6 col-md-3">
                          <Badge bg="success">
                            Dificultad:{' '}
                            {Number(unPedido.dificultad_pedido_agregacion) === 1
                              ? 'Nivel 1'
                              : Number(unPedido.dificultad_pedido_agregacion) === 2
                                ? 'Nivel 2'
                                : Number(unPedido.dificultad_pedido_agregacion) === 3
                                  ? 'Nivel 3'
                                  : unPedido.dificultad_pedido_agregacion}
                          </Badge>
                        </div>

                        {/* Estado */}
                        <div className="col-6 col-md-3">
                          <Badge
                            bg={
                              unPedido.estado_pedido_agregacion === 'aceptado'
                                ? 'success'
                                : 'danger'
                            }
                            text="light"
                          >
                            {unPedido.estado_pedido_agregacion.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    <div className="container-fluid px-2 px-md-3">
                      <div className="row g-4">
                        {/* Información del Pedido */}
                        <div className="col-lg-5">
                          <div className="border rounded-3 p-3 bg-light h-100">
                            <h5 className="mb-3">
                              <i className="bi bi-info-circle me-2"></i>
                              Información del Pedido
                            </h5>

                            <div className="mb-3">
                              <strong className="d-block small text-muted">Descripción</strong>
                              <p className="mb-0">{unPedido.descripcion_pedido_agregacion}</p>
                            </div>

                            <div className="mb-3">
                              <strong className="d-block small text-muted">Dificultad</strong>
                              <Badge bg="success" className="fs-6">
                                {Number(unPedido.dificultad_pedido_agregacion) === 1
                                  ? 'Nivel 1'
                                  : Number(unPedido.dificultad_pedido_agregacion) === 2
                                    ? 'Nivel 2'
                                    : Number(unPedido.dificultad_pedido_agregacion) === 3
                                      ? 'Nivel 3'
                                      : unPedido.dificultad_pedido_agregacion}
                              </Badge>
                            </div>

                            <div>
                              <strong className="d-block small text-muted">Estado</strong>
                              <Badge
                                bg={
                                  unPedido.estado_pedido_agregacion === 'pendiente'
                                    ? 'warning'
                                    : unPedido.estado_pedido_agregacion === 'aceptado'
                                      ? 'success'
                                      : 'danger'
                                }
                                text={
                                  unPedido.estado_pedido_agregacion === 'pendiente'
                                    ? 'dark'
                                    : 'light'
                                }
                                className="fs-6"
                              >
                                {unPedido.estado_pedido_agregacion.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Evidencias */}
                        <div className="col-lg-7">
                          <div className="border rounded-3 bg-light h-100">
                            <div className="p-3 border-bottom bg-secondary text-white rounded-top">
                              <h5 className="mb-0">
                                <i className="bi bi-paperclip me-2"></i>
                                Evidencias ({unPedido.evidencias.length})
                              </h5>
                            </div>
                            <div className="p-3" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                              {unPedido.evidencias.length === 0 ? (
                                <p className="text-muted text-center my-4">
                                  No hay evidencias cargadas
                                </p>
                              ) : (
                                unPedido.evidencias.map((e, index) => (
                                  <div key={e.id} className="mb-4 pb-3 border-bottom">
                                    <div className="d-flex align-items-center mb-2">
                                      <Badge bg="light" text="dark" className="me-2">
                                        #{index + 1}
                                      </Badge>
                                      <small className="text-muted">Evidencia</small>
                                    </div>

                                    {e.url_evidencia ? (
                                      <div>
                                        <small className="text-muted d-block mb-1">URL:</small>
                                        <a
                                          href={e.url_evidencia}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-decoration-none text-primary fw-semibold"
                                        >
                                          <i className="bi bi-link-45deg me-1"></i>
                                          {e.url_evidencia}
                                        </a>
                                      </div>
                                    ) : (
                                      e.archivo_evidencia && (
                                        <div>
                                          <small className="text-muted d-block mb-2">
                                            Archivo:
                                          </small>
                                          <div className="bg-white border rounded p-3">
                                            <div className="mb-2 d-flex align-items-center">
                                              <i className="bi bi-file-earmark me-2 text-primary"></i>
                                              <strong className="small">
                                                {e.archivo_evidencia.split('/').pop()}
                                              </strong>
                                            </div>

                                            {/* Preview según tipo de archivo */}
                                            <div className="mt-2">
                                              {e.archivo_evidencia
                                                .toLowerCase()
                                                .endsWith('.pdf') ? (
                                                <iframe
                                                  src={`${import.meta.env.VITE_BACKEND_URL}${e.archivo_evidencia}`}
                                                  width="100%"
                                                  height="350px"
                                                  title="PDF Preview"
                                                  className="border rounded"
                                                />
                                              ) : e.archivo_evidencia.match(
                                                  /\.(jpg|jpeg|png|gif|webp)$/i
                                                ) ? (
                                                <img
                                                  src={`${import.meta.env.VITE_BACKEND_URL}${e.archivo_evidencia}`}
                                                  alt="Evidencia"
                                                  className="img-fluid border rounded w-100"
                                                  style={{
                                                    maxHeight: '350px',
                                                    objectFit: 'contain',
                                                  }}
                                                />
                                              ) : e.archivo_evidencia.match(
                                                  /\.(mp4|webm|ogg)$/i
                                                ) ? (
                                                <video
                                                  controls
                                                  className="w-100 border rounded"
                                                  style={{ maxHeight: '350px' }}
                                                >
                                                  <source
                                                    src={`${import.meta.env.VITE_BACKEND_URL}${e.archivo_evidencia}`}
                                                    type={`video/${e.archivo_evidencia.split('.').pop()}`}
                                                  />
                                                  Tu navegador no soporta el elemento de video.
                                                </video>
                                              ) : (
                                                <a
                                                  href={`${import.meta.env.VITE_BACKEND_URL}${e.archivo_evidencia}`}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="btn btn-sm btn-outline-primary"
                                                >
                                                  <i className="bi bi-download me-1"></i>
                                                  Descargar archivo
                                                </a>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
          </Accordion>
        </div>
      )}
    </div>
  )
}
