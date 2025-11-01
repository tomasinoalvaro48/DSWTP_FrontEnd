import { useEffect } from 'react'
import { Accordion, Alert, Spinner, Badge } from 'react-bootstrap'
import { get } from '../../api/dataManager.ts'
import type { PedidoResolucion } from '../../entities/entities.ts'
import DeleteEntityButton from '../DeleteEntityButton.tsx'

export function ShowPedidosResolucion() {
  const { data, loading, error } = get<PedidoResolucion>('pedido_resolucion')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="mb-4 border-bottom border-2 ShowPedidoResolucion">
      <div className="bg-body-tertiary d-flex align-items-center justify-content-between px-4 py-3 flex-wrap">
        <h2 className="m-0 flex-shrink-0">Pedidos de Resolución</h2>
      </div>

      {loading && (
        <div className="d-flex align-items-center m-3">
          <Spinner animation="border" role="status" size="sm" className="me-2" />
          <span>Cargando pedidos...</span>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="m-3">
          Error al cargar pedidos: {error}
        </Alert>
      )}

      {!loading && !error && data?.length === 0 && (
        <Alert variant="info" className="m-3">
          No hay pedidos de resolución cargados.
        </Alert>
      )}

      {!loading && !error && data?.length > 0 && (
        <div className="accordion my-3 mx-4">
          <Accordion>
            {data.map((unPedido) => (
              <Accordion.Item eventKey={unPedido.id.toString()} key={unPedido.id}>
                <Accordion.Header>
                  <div className="row justify-content-between w-100 align-items-center">
                    {/* Fecha */}
                    <div className="col-md-2">
                      <strong>Fecha:</strong>{' '}
                      {new Date(unPedido.fecha_pedido_resolucion).toLocaleDateString('es-AR')}
                    </div>

                    <div className="col-md-2 d-flex align-items-center">
                      <strong className="me-2">Estado:</strong>
                      <Badge
                        bg={
                          unPedido.estado_pedido_resolucion === 'solicitado'
                            ? 'warning'
                            : unPedido.estado_pedido_resolucion === 'aceptado'
                              ? 'primary'
                              : unPedido.estado_pedido_resolucion === 'resuelto'
                                ? 'success'
                                : 'secondary'
                        }
                        text={unPedido.estado_pedido_resolucion === 'solicitado' ? 'dark' : 'light'}
                      >
                        {unPedido.estado_pedido_resolucion.toUpperCase()}
                      </Badge>
                    </div>

                    {/* Localidad + Zona */}
                    <div className="col-md-3">
                      <strong>Localidad:</strong> {unPedido.zona.localidad.nombre_localidad}
                      <br />
                      <strong>Zona:</strong> {unPedido.zona.nombre_zona}
                    </div>

                    {/* Dirección */}
                    <div className="col-md-3">
                      <strong>Dirección:</strong> {unPedido.direccion_pedido_resolucion}
                    </div>

                    {/* Dificultad */}
                    <div className="col-md-1">
                      <strong>Dificultad:</strong> {unPedido.dificultad_pedido_resolucion}
                    </div>

                    {/* Ver detalle */}
                    <div className="col-md-1 text-end">Ver detalle</div>
                  </div>
                </Accordion.Header>

                <Accordion.Body>
                  <div className="container">
                    {/* Datos del denunciante */}
                    <div className="container denunciante border rounded-4 mb-4 p-4">
                      <div className="row">
                        <h2>Datos del Denunciante</h2>
                      </div>
                      <div className="row justify-content-between w-100 align-items-center">
                        <div className="col-md-6">
                          <strong>Nombre:</strong>{' '}
                          {unPedido.denunciante.nombre_apellido_denunciante}
                        </div>
                        <div className="col-md-6">
                          <strong>Email:</strong> {unPedido.denunciante.email_denunciante}
                        </div>
                      </div>
                    </div>

                    {/* Descripción */}
                    <div className="mb-4">
                      <strong>Descripción:</strong>{' '}
                      {unPedido.descripcion_pedido_resolucion || 'No hay descripción cargada'}
                    </div>

                    {/* Cazador (solo si existe) */}
                    {unPedido.cazador && (
                      <>
                        <Accordion className="mb-4">
                          <Accordion.Item eventKey={`${unPedido.id}-cazador`}>
                            <Accordion.Header>Datos del Cazador</Accordion.Header>
                            <Accordion.Body>
                              <div className="row justify-content-between w-100 align-items-center">
                                <div className="col-md-4">
                                  <strong>Nombre:</strong> {unPedido.cazador.nombre_usuario}
                                </div>
                                <div className="col-md-4">
                                  <strong>Email:</strong> {unPedido.cazador.email_usuario}
                                </div>
                                <div className="col-md-4">
                                  <strong>Nivel:</strong> {unPedido.cazador.nivel_cazador}
                                </div>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>

                        {/* Comentario del cazador */}
                        <div className="mb-4">
                          <strong>Comentario del cazador:</strong>{' '}
                          {unPedido.comentario_pedido_resolucion || 'Sin comentario'}
                        </div>
                      </>
                    )}

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
                                      <strong>{anomalia.tipo_anomalia.nombre_tipo_anomalia}</strong>
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

                    {/* Acción */}
                    <div className="d-flex justify-content-end">
                      <DeleteEntityButton
                        nameToDelete={unPedido.direccion_pedido_resolucion}
                        idToDelete={unPedido.id}
                        route="pedido_resolucion"
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