import { useState } from "react";
import { Accordion, Spinner, Alert, Badge } from "react-bootstrap";
import { get, patch } from "../../api/dataManager.ts";
import type { PedidoAgregacion } from "../../entities/entities.ts";

export function TomarPedidosAgregacion() {
  const token = localStorage.getItem('token')
  const { data, loading, error } = get<PedidoAgregacion>("pedido_agregacion", {
    headers: { Authorization: `Bearer ${token}` }
  })
  const [procesando, setProcesando] = useState<string | null>(null);

  const handleTomarPedido = async (id: string, accion: "aceptar" | "rechazar") => {
    try {
      setProcesando(id);

      await patch(
        `pedido_agregacion/tomar-pedidos-agregacion/${id}`,
        { accion }
      );

      alert(accion === "aceptar"
        ? "Pedido de agregación aceptado. Se creó un nuevo tipo de anomalía."
        : "Pedido de agregación rechazado."
      );

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error al procesar el pedido.");
    } finally {
      setProcesando(null);
    }
  };

  return (
    <div className="TomarPedidosAgregacion mx-4 my-3">
      <h1 className="mb-3">Pedidos de Agregación de Anomalías Pendientes</h1>

      {loading && (
        <div className="d-flex align-items-center">
          <Spinner animation="border" role="status" size="sm" className="me-2" />
          <span>Cargando pedidos...</span>
        </div>
      )}
      {error && <Alert variant="danger">Error al cargar pedidos: {error}</Alert>}

      {!loading && !error && data?.filter(p => p.estado_pedido_agregacion === "pendiente").length === 0 && (
        <Alert variant="info" className="mt-3">
          No hay pedidos de agregación pendientes.
        </Alert>
      )}

      {!loading && !error && data?.length > 0 && (
        <Accordion>
          {data
            .filter((p) => p.estado_pedido_agregacion === "pendiente")
            .map((p) => (
              <Accordion.Item eventKey={p.id.toString()} key={p.id}>
                <Accordion.Header>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <div style={{ flexBasis: "30%", overflow: "hidden", textOverflow: "ellipsis" }}>
                      <strong>Descripción de la anomalía:</strong> {p.descripcion_pedido_agregacion}
                    </div>
                    <div style={{ flexBasis: "30%", textAlign: "center" }}>
                      <strong>Dificultad de la anomalía:</strong> {p.dificultad_pedido_agregacion}
                    </div>
                    <div style={{ flexBasis: "30%", textAlign: "center" }}>
                      <Badge bg="warning" text="dark">
                        {p.estado_pedido_agregacion.toUpperCase()}
                      </Badge>
                    </div>
                    <div style={{ flexBasis: "5%", textAlign: "end" }}>
                      Detalle
                    </div>
                  </div>
                </Accordion.Header>

                <Accordion.Body>
                  <div className="container text-start">
                    <div className="row">
                      <div className="col-md-6">
                          <div className="mb-4">
                            <strong>Cazador que solicitó el pedido:</strong> {p.cazador?.nombre_usuario}
                          </div>
                          <div className="mb-2">
                            <strong>Descripción de la anomalía:</strong> {p.descripcion_pedido_agregacion}
                          </div>
                          <div>
                            <strong>Dificultad de la anomalía:</strong> {p.dificultad_pedido_agregacion}
                          </div>
                      </div>

                      <div className="col-md-6">
                        <strong>Evidencias:</strong>
                          {p.evidencias.map((e) => (
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

                    <div className="row mt-3 text-center">
                      <div className="col">
                        <button
                          className="btn btn-success me-2"
                          style={{ minWidth: "140px" }}
                          disabled={procesando === p.id}
                          onClick={() => handleTomarPedido(p.id!, "aceptar")}
                        >
                          {procesando === p.id ? "Procesando..." : "Aceptar"}
                        </button>

                        <button
                          className="btn btn-danger"
                          style={{ minWidth: "140px" }}
                          disabled={procesando === p.id}
                          onClick={() => handleTomarPedido(p.id!, "rechazar")}
                        >
                          {procesando === p.id ? "Procesando..." : "Rechazar"}
                        </button>
                      </div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
        </Accordion>
      )}
    </div>
  );
}