import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Accordion, Spinner, Alert, Button, Modal, Badge } from 'react-bootstrap'
import { get } from '../../api/dataManager.ts'
import type { PedidoResolucion } from '../../entities/entities.ts'

export function ShowMisPedidosDenunciante() {
  const token = localStorage.getItem('token')

  const [showModal, setShowModal] = useState(false)
  const [pedidoAEliminar, setPedidoAEliminar] = useState<any>(null)
  const [mensaje, setMensaje] = useState<string | null>(null)

  const handleShowModal = (pedido: any) => {
    setPedidoAEliminar(pedido)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setPedidoAEliminar(null)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  async function handleEliminarPedido() {
    if (!pedidoAEliminar) return
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/pedido_resolucion/denunciante/${pedidoAEliminar.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { user: { id: pedidoAEliminar.denunciante?.id } },
        }
      )
      setMensaje('Pedido eliminado correctamente.')
      setShowModal(false)

      pedido_resolucion_historico = pedido_resolucion_historico.filter(
        (p) => p.id !== pedidoAEliminar.id
      )

      location.reload()
    } catch (error: any) {
      console.error('Error al eliminar pedido:', error)
      setMensaje(error.response?.data?.message || 'Error al eliminar el pedido.')
    }
  }

  let {
    data: pedido_resolucion_actual,
    loading: pedido_resolucion_loading_actual,
    error: pedido_resolucion_error_actual,
  } = get<PedidoResolucion>(`pedido_resolucion?estado_pedido_resolucion=${'aceptado'}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  let {
    data: pedido_resolucion_historico,
    loading: pedido_resolucion_loading_historico,
    error: pedido_resolucion_error_historico,
  } = get<PedidoResolucion>(`pedido_resolucion?estado_pedido_resolucion=${'solicitado'}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return (
    <div className="ShowPosiblesPedidos">
      {/* Header con título y botones */}
      <div className="bg-body-tertiary border-bottom shadow-sm">
        <div className="container-fluid px-3 py-4">
          <div className="row align-items-center g-3">
            {/* Título */}
            <div className="col-12 col-lg-4">
              <h1 className="m-0 fw-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
                Mis Pedidos
              </h1>
            </div>

            {/* Botones */}
            <div className="col-12 col-lg-8">
              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-lg-end">
                <Link
                  to="/generar-pedido-paso-1"
                  className="btn px-4 py-2 shadow-sm text-nowrap"
                  style={{
                    borderRadius: '50px',
                    backgroundColor: '#cd202fff',
                    color: 'white',
                    border: '1.5px solid #000',
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  }}
                >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  Realizar una denuncia
                </Link>
                <Link
                  to="/show-mis-pedidos-resueltos-denunciante"
                  className="btn btn-outline-secondary px-4 py-2 rounded-pill shadow-sm text-nowrap"
                  style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
                >
                  <i className="bi bi-clock-history me-2"></i>
                  Ver historial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de pedidos tomados */}
      <div className="mb-4">
        <div className="bg-light border-bottom px-3 py-3">
          <h2 className="m-0 fw-semibold" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
            <i className="bi bi-hourglass-split text-warning me-2"></i>
            En curso
          </h2>
        </div>
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
            <>
              {pedido_resolucion_actual.length === 0 ? (
                <Alert variant="info" className="m-3">
                  No tenés pedidos tomados por un cazador.
                </Alert>
              ) : (
                <div className="accordion my-3 mx-2 mx-md-4">
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
                                <span className="badge bg-primary">
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
                                <i className="bi bi-person-badge me-2"></i>
                                Datos del Cazador
                              </h5>
                              <div className="row g-3">
                                <div className="col-12 col-md-4">
                                  <strong className="d-block small text-muted">Nombre</strong>
                                  {unPedido.cazador?.nombre_usuario}
                                </div>
                                <div className="col-12 col-md-4">
                                  <strong className="d-block small text-muted">Email</strong>
                                  <span className="text-break">
                                    {unPedido.cazador?.email_usuario}
                                  </span>
                                </div>
                                <div className="col-12 col-md-4">
                                  <strong className="d-block small text-muted">Nivel</strong>
                                  <span className="badge bg-success">
                                    Nivel {unPedido.cazador?.nivel_cazador}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Descripción */}
                            <div className="mb-3">
                              <strong className="d-block mb-2">
                                <i className="bi bi-text-paragraph me-2"></i>
                                Descripción
                              </strong>
                              <p className="text-muted mb-0">
                                {unPedido.descripcion_pedido_resolucion ||
                                  'No hay descripción cargada'}
                              </p>
                            </div>

                            {/* Anomalías */}
                            {unPedido.anomalias.length > 0 && (
                              <div className="mb-3">
                                <Accordion>
                                  <Accordion.Item eventKey={`${unPedido.id}-anomalias`}>
                                    <Accordion.Header>
                                      <div className="w-100">
                                        <i className="bi bi-exclamation-triangle me-2"></i>
                                        <strong>Ver Anomalías ({unPedido.anomalias.length})</strong>
                                      </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <div className="row g-2">
                                        {unPedido.anomalias.map((anomalia) => (
                                          <div key={anomalia.id} className="col-12">
                                            <div className="border rounded p-2 bg-light">
                                              <div className="row g-2 align-items-center">
                                                <div className="col-12 col-md-5">
                                                  <strong className="d-block small text-muted">
                                                    Nombre:
                                                  </strong>
                                                  <span>
                                                    {anomalia.tipo_anomalia.nombre_tipo_anomalia}
                                                  </span>
                                                </div>
                                                <div className="col-6 col-md-3">
                                                  <strong className="d-block small text-muted">
                                                    Dificultad
                                                  </strong>
                                                  <span className="badge bg-info">
                                                    {
                                                      anomalia.tipo_anomalia
                                                        .dificultad_tipo_anomalia
                                                    }
                                                  </span>
                                                </div>
                                                <div className="col-6 col-md-4">
                                                  <strong className="d-block small text-muted">
                                                    Resultado
                                                  </strong>
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
                                          </div>
                                        ))}
                                      </div>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Accordion>
                              </div>
                            )}

                            {/* Inspecciones */}
                            {unPedido.inspecciones.length > 0 && (
                              <div className="mb-3">
                                <Accordion>
                                  <Accordion.Item eventKey={`${unPedido.id}-inspecciones`}>
                                    <Accordion.Header>
                                      <div className="w-100">
                                        <i className="bi bi-clipboard-check me-2"></i>
                                        <strong>
                                          Ver Inspecciones ({unPedido.inspecciones.length})
                                        </strong>
                                      </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <div className="row g-2">
                                        {unPedido.inspecciones.map((inspeccion) => (
                                          <div key={inspeccion.id} className="col-12">
                                            <div className="border rounded p-3 bg-light">
                                              <div className="row g-2">
                                                <div className="col-12 col-md-2">
                                                  <strong className="d-block small text-muted">
                                                    Inspección N°
                                                  </strong>
                                                  <span className="badge bg-secondary">
                                                    #{inspeccion.numero_inspeccion}
                                                  </span>
                                                </div>
                                                <div className="col-12 col-md-3">
                                                  <strong className="d-block small text-muted">
                                                    Fecha
                                                  </strong>
                                                  <small>
                                                    <i className="bi bi-calendar3 me-1"></i>
                                                    {new Date(
                                                      inspeccion.fecha_inspeccion
                                                    ).toLocaleDateString('es-AR')}
                                                  </small>
                                                </div>
                                                <div className="col-12 col-md-7">
                                                  <strong className="d-block small text-muted">
                                                    Comentario
                                                  </strong>
                                                  <span className="text-break">
                                                    {inspeccion.comentario_inspeccion}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Accordion>
                              </div>
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

        {pedido_resolucion_loading_actual && <div>Cargando...</div>}
        {pedido_resolucion_error_actual && <div>{pedido_resolucion_error_actual}</div>}
      </div>

      <div className="bg-light border-bottom px-3 py-3">
        <h2 className="m-0 fw-semibold" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
          <i className="bi bi-hourglass me-2"></i>
          Pendientes
        </h2>
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
            <>
              {pedido_resolucion_historico.length === 0 ? (
                <Alert variant="info" className="m-3">
                  No tenés pedidos pendientes de ser tomados.
                </Alert>
              ) : (
                <div className="accordion my-3 mx-2 mx-md-4">
                  <Accordion>
                    {pedido_resolucion_historico?.map((unPedido) => (
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
                                <span className="badge bg-warning text-dark">
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

                            {/* Descripción */}
                            <div className="mb-3">
                              <strong className="d-block mb-2">
                                <i className="bi bi-text-paragraph me-2"></i>
                                Descripción
                              </strong>
                              <p className="text-muted mb-0">
                                {unPedido.descripcion_pedido_resolucion ||
                                  'No hay descripción cargada'}
                              </p>
                            </div>

                            {/* Anomalías */}
                            {unPedido.anomalias.length > 0 && (
                              <div className="mb-3">
                                <Accordion>
                                  <Accordion.Item eventKey={`${unPedido.id}-anomalias-pendiente`}>
                                    <Accordion.Header>
                                      <div className="w-100">
                                        <i className="bi bi-exclamation-triangle me-2"></i>
                                        <strong>Ver Anomalías ({unPedido.anomalias.length})</strong>
                                      </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <div className="row g-2">
                                        {unPedido.anomalias.map((anomalia) => (
                                          <div key={anomalia.id} className="col-12">
                                            <div className="border rounded p-2 bg-light">
                                              <div className="row g-2 align-items-center">
                                                <div className="col-12 col-md-5">
                                                  <strong className="d-block small text-muted">
                                                    Tipo
                                                  </strong>
                                                  <span>
                                                    {anomalia.tipo_anomalia.nombre_tipo_anomalia}
                                                  </span>
                                                </div>
                                                <div className="col-6 col-md-3">
                                                  <strong className="d-block small text-muted">
                                                    Dificultad
                                                  </strong>
                                                  <span className="badge bg-info">
                                                    {
                                                      anomalia.tipo_anomalia
                                                        .dificultad_tipo_anomalia
                                                    }
                                                  </span>
                                                </div>
                                                <div className="col-6 col-md-4">
                                                  <strong className="d-block small text-muted">
                                                    Resultado
                                                  </strong>
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
                                          </div>
                                        ))}
                                      </div>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Accordion>
                              </div>
                            )}

                            <div className="text-center mt-3">
                              <Button
                                variant="danger"
                                onClick={() => handleShowModal(unPedido)}
                                className="w-100 w-md-auto"
                              >
                                <i className="bi bi-trash me-2"></i>
                                Eliminar pedido
                              </Button>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>

                  <Modal show={showModal} onHide={handleCloseModal} backdrop="static" centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirmar eliminación</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {pedidoAEliminar ? (
                        <>
                          <p>
                            ¿Seguro que desea eliminar el pedido en la dirección{' '}
                            <strong>{pedidoAEliminar.direccion_pedido_resolucion}</strong>?
                          </p>
                          <p className="text-danger">Esta acción no se puede deshacer.</p>
                        </>
                      ) : (
                        'Cargando...'
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                      </Button>
                      <Button variant="danger" onClick={handleEliminarPedido}>
                        Sí, eliminar
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {/* Mensaje de resultado */}
                  {mensaje && (
                    <div className="alert alert-info text-center mt-3 w-75 mx-auto" role="alert">
                      {mensaje}
                    </div>
                  )}
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
