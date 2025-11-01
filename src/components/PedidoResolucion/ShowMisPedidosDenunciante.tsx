import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Accordion, Spinner, Alert, Button, Modal, Badge } from 'react-bootstrap'
import { get } from '../../api/dataManager.ts'
import { BACKEND_URL } from '../../../endpoints.config.ts'
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
      await axios.delete(`${BACKEND_URL}/api/pedido_resolucion/denunciante/${pedidoAEliminar.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { user: { id: pedidoAEliminar.denunciante?.id } },
      })
      setMensaje('Pedido eliminado correctamente.')
      setShowModal(false)

      pedido_resolucion_historico = pedido_resolucion_historico.filter(
        (p) => p.id !== pedidoAEliminar.id
      )
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
      <nav>
        <div className="navbar bg-body-tertiary px-3">
          <h1 className="me-auto">Mis Pedidos</h1>
          <div className="d-flex flex-column flex-md-row gap-3">
            <Link
              to="/generar-pedido-paso-1"
              className="btn btn-outline-dark px-4 py-2 fs-5 rounded-pill shadow-sm"
            >
              Realizar una denuncia
            </Link>
            <Link
              to="/show-mis-pedidos-resueltos-denunciante"
              className="btn btn-outline-secondary px-4 py-2 fs-5 rounded-pill shadow-sm"
            >
              Ver mis pedidos resueltos
            </Link>
          </div>
        </div>
      </nav>
      <div className="mb-4 border-bottom border-2">
        <div className="bg-body-tertiary d-flex align-items-center justify-content-between px-4 py-3 flex-wrap">
          {/* Título */}
          <h2 className="m-0 flex-shrink-0">Pedidos tomados por un cazador</h2>
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

        {!pedido_resolucion_loading_actual && !pedido_resolucion_error_actual && pedido_resolucion_actual && (
          <>
            {pedido_resolucion_actual.length === 0 ? (
              <Alert variant="info" className="m-3">
                No tenés pedidos tomados por un cazador.
              </Alert>
            ) : (
              <div className="accordion my-3 mx-4">
                <Accordion>
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
                              <h2>Datos Cazador</h2>
                            </div>
                            <div className="row justify-content-between w-100 align-items-center ">
                              <div className="col-3 md">
                                <strong>Nombre: </strong>
                                {unPedido.cazador?.nombre_usuario}
                              </div>

                              <div className="col-md-3">
                                <strong>Email: </strong>
                                {unPedido.cazador?.email_usuario}
                              </div>
                              <div className="col-md-3">
                                <strong>Nivel: </strong>
                                {unPedido.cazador?.nivel_cazador}
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
                                            <strong>
                                              {anomalia.tipo_anomalia.nombre_tipo_anomalia}
                                            </strong>
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
          </>
        )}

        {pedido_resolucion_loading_actual && <div>Cargando...</div>}
        {pedido_resolucion_error_actual && <div>{pedido_resolucion_error_actual}</div>}
      </div>

      <div className="bg-body-tertiary d-flex align-items-center justify-content-between px-4 py-3 flex-wrap">
        {/* Título */}
        <h2 className="m-0 flex-shrink-0">Pedidos pendientes de ser tomados</h2>
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

        {!pedido_resolucion_loading_historico && !pedido_resolucion_error_historico && pedido_resolucion_historico && (
          <>
            {pedido_resolucion_historico.length === 0 ? (
              <Alert variant="info" className="m-3">
                No tenés pedidos pendientes de ser tomados.
              </Alert>
            ) : (
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

                          <div className="text-center mt-3">
                            <Button variant="danger" onClick={() => handleShowModal(unPedido)}>
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