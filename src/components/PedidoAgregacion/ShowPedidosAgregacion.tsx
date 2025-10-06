import { Accordion, Spinner, Alert, Badge, Card } from "react-bootstrap";
import { get } from "../../api/dataManager.ts";
import { Link } from "react-router-dom";
import type { PedidoAgregacion } from "../../entities/entities.ts";
import DeleteEntityButton from '../DeleteEntityButton.tsx'

export function ShowPedidosAgregacion(){
  const token = localStorage.getItem('token')
  const { data, loading, error } = get<PedidoAgregacion>('pedido_agregacion', {
    headers: { Authorization: `Bearer ${token}`, },
  })

  return(
    <div className="ShowPedidosAgregacion">
      <h1>Pedidos de Agregación de Anomalías</h1>

      {loading && (
        <div className="d-flex align-items-center">
          <Spinner animation="border" role="status" size="sm" className="me-2" />
          <span>Cargando pedidos...</span>
        </div>
      )}
      {error && <Alert variant="danger">Error al cargar pedidos: {error}</Alert>}

      {!loading && !error && data?.length === 0 && (
        <Alert variant="info" className="mt-3">
          No hay pedidos de agregación cargados.
        </Alert>
      )}

      {!loading && !error && data?.length > 0 && (
        <Accordion>
          {data.map((unPedido) => (
            <Accordion.Item eventKey={unPedido.id.toString()} key={unPedido.id}>
              <Accordion.Header>
                <div className="d-flex w-100 align-items-center" style={{ gap: "1rem" }}>
                  <div
                    style={{
                      flexBasis: "30%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <strong>Descripción de la anomalía:</strong> {unPedido.descripcion_pedido_agregacion}
                  </div>
                  <div style={{ flexBasis: "30%", textAlign: "center" }}>
                    <strong>Dificultad de la anomalía:</strong>{" "}
                    {Number(unPedido.dificultad_pedido_agregacion) === 1? "Nivel 1"
                      : Number(unPedido.dificultad_pedido_agregacion) === 2? "Nivel 2"
                      : Number(unPedido.dificultad_pedido_agregacion) === 3? "Nivel 3"
                      : unPedido.dificultad_pedido_agregacion}
                  </div>
                  <div style={{ flexBasis: "30%", textAlign: "center" }}>
                    <Badge
                      bg={unPedido.estado_pedido_agregacion === "pendiente"? "warning"
                        : unPedido.estado_pedido_agregacion === "aceptado"? "success"
                        : "danger"
                      }
                      text={unPedido.estado_pedido_agregacion === "pendiente" ? "dark" : "light"}
                    >
                      {unPedido.estado_pedido_agregacion.toUpperCase()}
                    </Badge>
                  </div>
                  <div style={{ flexBasis: "10%", textAlign: "end" }}>
                    Detalle
                  </div>
                </div>
              </Accordion.Header>

              <Accordion.Body>
                <Card className="shadow-sm border-0">
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div>
                          <strong>ID del pedido:</strong> {unPedido.id}
                        </div>
                        <div>
                          <strong>Descripción de la anomalía:</strong> {unPedido.descripcion_pedido_agregacion}
                        </div>
                        <div>
                          <strong>Dificultad de la anomalía:</strong>{" "}
                          {Number(unPedido.dificultad_pedido_agregacion) === 1? "Nivel 1"
                            : Number(unPedido.dificultad_pedido_agregacion) === 2? "Nivel 2"
                            : Number(unPedido.dificultad_pedido_agregacion) === 3? "Nivel 3"
                            : unPedido.dificultad_pedido_agregacion
                          }
                        </div>
                        <div className="mt-2">
                          <strong>Estado:</strong>{" "}
                          <Badge
                            bg={unPedido.estado_pedido_agregacion === "pendiente"? "warning"
                              : unPedido.estado_pedido_agregacion === "aceptado"? "success"
                              : "danger"
                            }
                            text={unPedido.estado_pedido_agregacion === "pendiente" ? "dark" : "light"}
                          >
                            {unPedido.estado_pedido_agregacion.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <strong>Evidencias:</strong>
                        <div className="mt-2 d-flex flex-wrap gap-2">
                          {unPedido.evidencias.map((e) => (
                            <div key={e.id}>
                              {e.url_evidencia ? (
                                <a
                                  href={e.url_evidencia}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-decoration-underline text-primary"
                                >
                                  {e.url_evidencia}
                                </a>
                              ) : (
                                e.archivo_evidencia && (
                                  <div className="bg-light border rounded px-3 py-2 small text-muted">
                                    {e.archivo_evidencia}
                                  </div>
                                )
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-4">
                      <DeleteEntityButton
                        idToDelete={unPedido.id}
                        nameToDelete={unPedido.descripcion_pedido_agregacion}
                        route={"pedido_agregacion"}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
      
      <div className="text-center mt-4"></div>
        <Link to="/generar-pedido-agregacion-1" className="btn btn-lg btn-success m-3 mt-0">
            + Generar Pedido de Agregación
        </Link>
      </div>
  );
}