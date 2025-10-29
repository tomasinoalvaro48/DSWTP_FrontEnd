import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Accordion, Spinner, Alert, Badge } from 'react-bootstrap'
import { get, patch } from '../../api/dataManager.ts'
import { BACKEND_URL } from '../../../endpoints.config.ts'
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

  return (
    <div className="TomarPedidosAgregacion mx-3 my-3 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="m-0">Pedidos de Agregación de Anomalías Pendientes</h1>

        <Link
          to="/show-pedidos-agregacion-operador"
          className="btn btn-outline-secondary px-4 py-2 fs-5 rounded-pill shadow-sm"
        >
          Ver histórico de pedidos de agregación
        </Link>
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
          <Alert variant="info" className="mt-3">
            No hay pedidos de agregación pendientes.
          </Alert>
        )}

      {!loading && !error && data?.length > 0 && (
        <div className="accordion my-0 mx-4">
          <Accordion>
            {data
              .filter((p) => p.estado_pedido_agregacion === 'pendiente')
              .map((p) => (
                <Accordion.Item eventKey={p.id.toString()} key={p.id}>
                  <Accordion.Header>
                    <div className="d-flex w-100 align-items-center">
                      <div
                        style={{ flexBasis: '30%', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        <strong>Descripción de la anomalía:</strong>{' '}
                        {p.descripcion_pedido_agregacion}
                      </div>
                      <div style={{ flexBasis: '30%', textAlign: 'center' }}>
                        <strong>Dificultad de la anomalía:</strong> {p.dificultad_pedido_agregacion}
                      </div>
                      <div style={{ flexBasis: '30%', textAlign: 'center' }}>
                        <Badge bg="warning" text="dark">
                          {p.estado_pedido_agregacion.toUpperCase()}
                        </Badge>
                      </div>
                      <div style={{ flexBasis: '10%', textAlign: 'end' }}>Detalle</div>
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    <div className="container-fluid">
                      <div className="row g-4">
                        {/* Columna izquierda - Información del pedido */}
                        <div className="col-lg-5">
                          <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-primary text-white">
                              <h5 className="mb-0">Información del Pedido</h5>
                            </div>
                            <div className="card-body">
                              <div className="mb-3">
                                <small className="text-muted d-block">Solicitado por</small>
                                <strong className="fs-5">{p.cazador?.nombre_usuario}</strong>
                              </div>

                              <div className="mb-3">
                                <small className="text-muted d-block">Descripción</small>
                                <p className="mb-0">{p.descripcion_pedido_agregacion}</p>
                              </div>

                              <div className="mb-3">
                                <small className="text-muted d-block">Dificultad</small>
                                <Badge bg="info" className="fs-6">
                                  Nivel {p.dificultad_pedido_agregacion}
                                </Badge>
                              </div>

                              <div>
                                <small className="text-muted d-block">Estado</small>
                                <Badge bg="warning" text="dark" className="fs-6">
                                  {p.estado_pedido_agregacion.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Columna derecha - Evidencias */}
                        <div className="col-lg-7">
                          <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-secondary text-white">
                              <h5 className="mb-0">Evidencias ({p.evidencias.length})</h5>
                            </div>
                            <div
                              className="card-body"
                              style={{ maxHeight: '500px', overflowY: 'auto' }}
                            >
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
                                          <div className="bg-light border rounded p-3">
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
                                                  src={`${BACKEND_URL}${e.archivo_evidencia}`}
                                                  width="100%"
                                                  height="350px"
                                                  title="PDF Preview"
                                                  className="border rounded"
                                                />
                                              ) : e.archivo_evidencia.match(
                                                  /\.(jpg|jpeg|png|gif|webp)$/i
                                                ) ? (
                                                <img
                                                  src={`${BACKEND_URL}${e.archivo_evidencia}`}
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
                                                    src={`${BACKEND_URL}${e.archivo_evidencia}`}
                                                    type={`video/${e.archivo_evidencia.split('.').pop()}`}
                                                  />
                                                  Tu navegador no soporta el elemento de video.
                                                </video>
                                              ) : (
                                                <a
                                                  href={`${BACKEND_URL}${e.archivo_evidencia}`}
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
                      <div className="row mt-4">
                        <div className="col text-center">
                          <button
                            className="btn btn-success btn-lg me-3"
                            style={{ minWidth: '160px' }}
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

                          <button
                            className="btn btn-danger btn-lg"
                            style={{ minWidth: '160px' }}
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