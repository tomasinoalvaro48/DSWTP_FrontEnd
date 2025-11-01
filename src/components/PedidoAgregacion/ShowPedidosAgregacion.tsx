import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Accordion, Spinner, Alert, Badge } from 'react-bootstrap'
import { get, getFilter } from '../../api/dataManager.ts'
import { BACKEND_URL } from '../../../endpoints.config.ts'
import type { PedidoAgregacion } from '../../entities/entities.ts'
import DeleteEntityButton from '../DeleteEntityButton.tsx'

export function ShowPedidosAgregacion() {
  const token = localStorage.getItem('token')

  const [estadoFilter, setEstadoFilter] = useState('')
  const [dificultadFilter, setDificultadFilter] = useState(0)
  const [busco, setBusco] = useState(false)
  const [query, setQuery] = useState(`pedido_agregacion`)

  const { data, loading, error } = get<PedidoAgregacion>('pedido_agregacion', {
    headers: { Authorization: `Bearer ${token}` },
  })

  const {
    data: dataFiltrada,
    loading: loadingFiltrado,
    error: errorFiltrado,
  } = getFilter<PedidoAgregacion>(query, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusco(true)

    const params = new URLSearchParams()

    // Estado
    if (estadoFilter) {
      params.append("estado_pedido_agregacion", estadoFilter)
    }

    // Dificultad
    if (dificultadFilter > 0) {
      params.append("dificultad_pedido_agregacion", dificultadFilter.toString())
    }

    const nuevaUrl = `pedido_agregacion?${params.toString()}`
    setQuery(nuevaUrl)
  }

  const pedidos = busco ? dataFiltrada : data

  return (
    <div className="mb-4 border-bottom border-2 ShowPedidosAgregacion">
      <div className="bg-body-tertiary d-flex align-items-center justify-content-between px-4 py-0 flex-wrap">
        <h2 className="m-0 flex-shrink-0">Pedidos de Agregación de Anomalías</h2>

        <Link to="/generar-pedido-agregacion-1" className="btn btn-lg btn-outline-primary m-4 mt-3">
          + Nuevo Pedido de Agregación
        </Link>
      </div>

      <div className="bg-body-tertiary d-flex align-items-center px-4 py-0 flex-wrap gap-2">
        <h6 className="m-0">Filtrar:</h6>
        <form onSubmit={handleSearch} className="d-flex gap-3 align-items-center p-3 px-4">
          <select
            className="form-select w-auto"
            value={estadoFilter}
            onChange={(e) => setEstadoFilter(e.target.value)}
          >
            <option value="">Estado: Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="aceptado">Aceptado</option>
            <option value="rechazado">Rechazado</option>
          </select>

          <select
            className="form-select w-auto"
            value={dificultadFilter}
            onChange={(e) => setDificultadFilter(Number(e.target.value))}
          >
            <option value={0}>Dificultad: Todas</option>
            <option value={1}>Nivel 1</option>
            <option value={2}>Nivel 2</option>
            <option value={3}>Nivel 3</option>
          </select>

          <button className="btn btn-success px-4" type="submit">
            Buscar
          </button>
        </form>
      </div>

      {(loading || loadingFiltrado) && (
        <div className="d-flex align-items-center">
          <Spinner animation="border" role="status" size="sm" className="me-2" />
          <span>Cargando pedidos...</span>
        </div>
      )}

      {(error || errorFiltrado) && <Alert variant="danger">Error al cargar pedidos</Alert>}

      {!loading && !error && pedidos?.length === 0 && (
        <Alert variant="info" className="m-3">
          No hay pedidos que coincidan con el filtro seleccionado.
        </Alert>
      )}

      {!loading && !error && pedidos?.length > 0 && (
        <div className="accordion my-0 mx-4">
          <Accordion>
            {pedidos.map((unPedido) => (
              <Accordion.Item eventKey={unPedido.id.toString()} key={unPedido.id}>
                <Accordion.Header>
                  <div className="d-flex w-100 align-items-center">
                    <div style={{ flexBasis: '30%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
                          unPedido.estado_pedido_agregacion === 'pendiente'
                            ? 'warning'
                            : unPedido.estado_pedido_agregacion === 'aceptado'
                              ? 'success'
                              : 'danger'
                        }
                        text={unPedido.estado_pedido_agregacion === 'pendiente' ? 'dark' : 'light'}
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
                                        <small className="text-muted d-block mb-2">Archivo:</small>
                                        <div className="bg-light border rounded p-3">
                                          <div className="mb-2 d-flex align-items-center">
                                            <i className="bi bi-file-earmark me-2 text-primary"></i>
                                            <strong className="small">
                                              {e.archivo_evidencia.split('/').pop()}
                                            </strong>
                                          </div>

                                          {/* Preview según tipo de archivo */}
                                          <div className="mt-2">
                                            {e.archivo_evidencia.toLowerCase().endsWith('.pdf') ? (
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
                                                style={{ maxHeight: '350px', objectFit: 'contain' }}
                                              />
                                            ) : e.archivo_evidencia.match(/\.(mp4|webm|ogg)$/i) ? (
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

                    {/* Botón de eliminar */}
                    <div className="text-center mt-4">
                      <DeleteEntityButton
                        idToDelete={unPedido.id}
                        nameToDelete={unPedido.descripcion_pedido_agregacion}
                        route={'pedido_agregacion'}
                      />
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