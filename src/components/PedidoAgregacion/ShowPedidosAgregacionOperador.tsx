import { Accordion, Spinner, Alert, Badge } from 'react-bootstrap'
import { get } from '../../api/dataManager.ts'
import type { PedidoAgregacion } from '../../entities/entities.ts'
import { BACKEND_URL } from '../../../endpoints.config.ts'

export function ShowPedidosAgregacionOperador() {
  const token = localStorage.getItem('token')
  const { data, loading, error } = get<PedidoAgregacion>('pedido_agregacion', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return (
    <div className="ShowPedidosAgregacionOperador mx-3 my-0 mb-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-3">Histórico de Pedidos de Agregación de Anomalías</h1>
      </div>

      {loading && (
        <div className="d-flex align-items-center">
          <Spinner animation="border" role="status" size="sm" className="me-2" />
          <span>Cargando pedidos...</span>
        </div>
      )}
      {error && <Alert variant="danger">Error al cargar pedidos: {error}</Alert>}

      {!loading && !error && data?.length === 0 && (
        <div className="alert alert-info">No hay agrgaciones historicas aún.</div>
      )}

      {!loading && !error && data?.length > 0 && (
        <div className="accordion my-0 mx-4">
          <Accordion>
            {data
              .filter(
                (unPedido) =>
                  unPedido.estado_pedido_agregacion === 'aceptado' ||
                  unPedido.estado_pedido_agregacion === 'rechazado'
              )
              .map((unPedido) => (
                <Accordion.Item eventKey={unPedido.id.toString()} key={unPedido.id}>
                  <Accordion.Header>
                    <div className="d-flex w-100 align-items-center">
                      <div
                        style={{ flexBasis: '30%', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        <strong>Descripción de la anomalía:</strong>{' '}
                        {unPedido.descripcion_pedido_agregacion}
                      </div>
                      <div style={{ flexBasis: '30%', textAlign: 'center' }}>
                        <strong>Dificultad de la anomalía:</strong>{' '}
                        {Number(unPedido.dificultad_pedido_agregacion) === 1
                          ? 'Nivel 1'
                          : Number(unPedido.dificultad_pedido_agregacion) === 2
                            ? 'Nivel 2'
                            : Number(unPedido.dificultad_pedido_agregacion) === 3
                              ? 'Nivel 3'
                              : unPedido.dificultad_pedido_agregacion}
                      </div>
                      <div style={{ flexBasis: '30%', textAlign: 'center' }}>
                        <Badge
                          bg={
                            unPedido.estado_pedido_agregacion === 'aceptado' ? 'success' : 'danger'
                          }
                          text="light"
                        >
                          {unPedido.estado_pedido_agregacion.toUpperCase()}
                        </Badge>
                      </div>
                      <div style={{ flexBasis: '10%', textAlign: 'end' }}>Detalle</div>
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    <div className="container-fluid">
                      <div className="row g-4">
                        <div className="col-lg-5">
                          <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-primary text-white">
                              <h5 className="mb-0">Información del Pedido</h5>
                            </div>
                            <div className="card-body">
                              <div className="mb-3">
                                <h5 className="d-block">Id del pedido</h5>
                                <strong className="fs-5">{unPedido.id}</strong>
                              </div>

                              <div className="mb-3">
                                <h5 className="d-block">Descripción</h5>
                                <p className="mb-0">{unPedido.descripcion_pedido_agregacion}</p>
                              </div>

                              <div className="mb-3">
                                <h5 className="d-block">Dificultad</h5>
                                <Badge bg="info" className="fs-6">
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
                                <h5 className="d-block">Estado</h5>
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
                        </div>

                        <div className="col-lg-7">
                          <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-secondary text-white">
                              <h5 className="mb-0">Evidencias ({unPedido.evidencias.length})</h5>
                            </div>
                            <div
                              className="card-body"
                              style={{ maxHeight: '500px', overflowY: 'auto' }}
                            >
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
