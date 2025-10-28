import { Accordion, Spinner, Alert, Badge } from "react-bootstrap";
import { get } from "../../api/dataManager.ts";
import type { PedidoAgregacion } from "../../entities/entities.ts";

export function ShowPedidosAgregacionOperador(){
  const token = localStorage.getItem('token')
  const { data, loading, error } = get<PedidoAgregacion>('pedido_agregacion', {
    headers: { Authorization: `Bearer ${token}`, },
  })

  return(
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
        <Alert variant="info" className="mt-3">
          No hay pedidos de agregación cargados.
        </Alert>
      )}

      {!loading && !error && data?.length > 0 && (
        <div className="accordion my-0 mx-4">
            <Accordion>
                {data
                .filter((unPedido) => unPedido.estado_pedido_agregacion === "aceptado" || unPedido.estado_pedido_agregacion === "rechazado")
                .map((unPedido) => (
                    <Accordion.Item eventKey={unPedido.id.toString()} key={unPedido.id}>
                        <Accordion.Header>
                            <div className="d-flex w-100 align-items-center">
                                <div style={{ flexBasis: "30%", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    <strong>Descripción de la anomalía:</strong>{" "}
                                    {unPedido.descripcion_pedido_agregacion}
                                </div>
                                <div style={{ flexBasis: "30%", textAlign: "center" }}>
                                    <strong>Dificultad de la anomalía:</strong>{" "}
                                    {Number(unPedido.dificultad_pedido_agregacion) === 1
                                        ? "Nivel 1"
                                        : Number(unPedido.dificultad_pedido_agregacion) === 2
                                        ? "Nivel 2"
                                        : Number(unPedido.dificultad_pedido_agregacion) === 3
                                        ? "Nivel 3"
                                        : unPedido.dificultad_pedido_agregacion}
                                </div>
                                <div style={{ flexBasis: "30%", textAlign: "center" }}>
                                    <Badge
                                        bg={
                                        unPedido.estado_pedido_agregacion === "aceptado"
                                            ? "success"
                                            : "danger"
                                        }
                                        text="light"
                                    >
                                        {unPedido.estado_pedido_agregacion.toUpperCase()}
                                    </Badge>
                                </div>
                                <div style={{ flexBasis: "10%", textAlign: "end" }}>Detalle</div>
                            </div>
                        </Accordion.Header>

                        <Accordion.Body>
                            <div className="container text-start">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-4">
                                            <strong>ID del pedido:</strong> {unPedido.id}
                                        </div>
                                        <div className="mb-2">
                                            <strong>Descripción de la anomalía:</strong> {unPedido.descripcion_pedido_agregacion}
                                        </div>
                                        <div className="mb-4">
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
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
      )}
    </div>
  );
}