import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Accordion, Spinner, Alert, Badge } from 'react-bootstrap'
import { get, patch } from '../../api/dataManager.ts'
import type { PedidoAgregacion } from '../../entities/entities.ts'

export function TomarPedidosAgregacion() {
  const token = localStorage.getItem('token')
  const { data, loading, error } = get<PedidoAgregacion>('pedido_agregacion', {
    headers: { Authorization: `Bearer ${token}` },
  })
  const [procesando, setProcesando] = useState<string | null>(null)

  const handleTomarPedido = async (id: string, accion: 'aceptar' | 'rechazar') => {
    try {
      setProcesando(id)

      await patch(`pedido_agregacion/tomar-pedidos-agregacion/${id}`, { accion })

      window.location.reload()
    } catch (err) {
      console.error(err)
      alert('Error al procesar el pedido.')
    } finally {
      setProcesando(null)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="mb-4 border-bottom border-2 TomarPedidosAgregacion">
      {/* Header con título y botón */}
      <div className="bg-body-tertiary border-bottom shadow-sm">
        <div className="container-fluid px-3 py-4">
          <div className="row align-items-center g-3">
            {/* Título */}
            <div className="col-12 col-lg-7">
              <h1 className="m-0 fw-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
                <i className="bi bi-clipboard-check me-2"></i>
                Pedidos de Agregación Pendientes
              </h1>
            </div>

            {/* Botón */}
            <div className="col-12 col-lg-5">
              <div className="d-flex justify-content-lg-end">
                <Link
                  to="/show-pedidos-agregacion-operador"
                  className="btn btn-outline-secondary px-4 py-2 rounded-pill shadow-sm text-nowrap"
                  style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
                >
                  <i className="bi bi-clock-history me-2"></i>
                  Ver histórico
                </Link>
              </div>
            </div>
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

      {!loading &&
        !error &&
        data?.filter((p) => p.estado_pedido_agregacion === 'pendiente').length === 0 && (
          <Alert variant="info" className="m-3">
            No hay pedidos de agregación pendientes.
          </Alert>
        )}

      {!loading && !error && data?.length > 0 && (
        <div className="accordion my-3 mx-2 mx-md-4">
          <Accordion>
            {data
              .filter((p) => p.estado_pedido_agregacion === 'pendiente')
              .map((p) => (
                <Accordion.Item eventKey={p.id.toString()} key={p.id}>
                  <Accordion.Header>
                    <div className="w-100">
                      <div className="row g-2 align-items-center">
                        {/* Descripción */}
                        <div className="col-12 col-md-5">
                          <div className="small">
                            <strong className="d-block">Descripción:</strong>
                            <span className="text-muted text-truncate d-block">
                              {p.descripcion_pedido_agregacion}
                            </span>
                          </div>
                        </div>

                        {/* Dificultad */}
                        <div className="col-6 col-md-3">
                          <Badge bg="info">
                            Dificultad: Nivel {p.dificultad_pedido_agregacion}
                          </Badge>
                        </div>

                        {/* Estado */}
                        <div className="col-6 col-md-4">
                          <Badge bg="warning" text="dark">
                            {p.estado_pedido_agregacion.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    <div className="container-fluid px-2 px-md-3">
                      <div className="row g-4">
                        {/* Información del pedido */}
                        <div className="col-lg-5">
                          <div className="border rounded-3 p-3 bg-light h-100">
                            <h5 className="mb-3">
                              <i className="bi bi-info-circle me-2"></i>
                              Información del Pedido
                            </h5>

                            <div className="mb-3">
                              <strong className="d-block small text-muted">Solicitado por</strong>
                              <span className="fs-5">{p.cazador?.nombre_usuario}</span>
                            </div>

                            <div className="mb-3">
                              <strong className="d-block small text-muted">Descripción</strong>
                              <p className="mb-0">{p.descripcion_pedido_agregacion}</p>
                            </div>

                            <div className="mb-3">
                              <strong className="d-block small text-muted">Dificultad</strong>
                              <Badge bg="info" className="fs-6">
                                Nivel {p.dificultad_pedido_agregacion}
                              </Badge>
                            </div>

                            <div>
                              <strong className="d-block small text-muted">Estado</strong>
                              <Badge bg="warning" text="dark" className="fs-6">
                                {p.estado_pedido_agregacion.toUpperCase()}
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
                                Evidencias ({p.evidencias.length})
                              </h5>
                            </div>
                            <div className="p-3" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                              {p.evidencias.length === 0 ? (
                                <p className="text-muted text-center my-4">
                                  No hay evidencias cargadas
                                </p>
                              ) : (
                                p.evidencias.map((e, index) => (
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

                      {/* Botones de acción */}
                      <div className="row g-2 mt-3">
                        <div className="col-12 col-md-6">
                          <button
                            className="btn btn-success w-100"
                            disabled={procesando === p.id}
                            onClick={() => handleTomarPedido(p.id!, 'aceptar')}
                          >
                            {procesando === p.id ? (
                              <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Procesando...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-check-circle me-2"></i>
                                Aceptar
                              </>
                            )}
                          </button>
                        </div>

                        <div className="col-12 col-md-6">
                          <button
                            className="btn btn-danger w-100"
                            disabled={procesando === p.id}
                            onClick={() => handleTomarPedido(p.id!, 'rechazar')}
                          >
                            {procesando === p.id ? (
                              <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Procesando...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-x-circle me-2"></i>
                                Rechazar
                              </>
                            )}
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
    </div>
  )
}
