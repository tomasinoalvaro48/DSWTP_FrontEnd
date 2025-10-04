import { useState } from "react";
import { Accordion, Spinner, Alert } from "react-bootstrap";
import { get, patch } from "../../api/dataManager.ts";
import type { PedidoAgregacion } from "../../entities/entities.ts";

export function TomarPedidosAgregacion() {
  const { data, loading, error } = get<PedidoAgregacion>("pedido_agregacion");
  const [procesando, setProcesando] = useState<string | null>(null);

  const handleTomarPedido = async (id: string, accion: "aceptar" | "rechazar") => {
    try {
      setProcesando(id);
      /*const token = localStorage.getItem("token");
      const cazadorId = localStorage.getItem("userId");

      if (!cazadorId) {
        alert("No se encontró el usuario logueado.");
        return;
      }*/

      await patch(
        `pedido_agregacion/tomar-pedidos-agregacion/${id}`,
        //{ accion, cazadorId },
        { accion }
        //{ headers: { Authorization: `Bearer ${token}` } }
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
      <h1 className="mb-3">Pedidos de Agregación Pendientes</h1>

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

      {!loading && !error && data && (
        <Accordion>
          {data
            .filter((p) => p.estado_pedido_agregacion === "pendiente")
            .map((p) => (
              <Accordion.Item eventKey={p.id.toString()} key={p.id}>
                <Accordion.Header>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <div>
                      <strong>Descripción:</strong> {p.descripcion_pedido_agregacion}
                    </div>
                    <div>
                      <strong>Dificultad:</strong> {p.dificultad_pedido_agregacion}
                    </div>
                    <div>
                      <strong>Estado:</strong> {p.estado_pedido_agregacion}
                    </div>
                  </div>
                </Accordion.Header>

                <Accordion.Body>
                  <div className="container text-start">
                    <div className="row">
                      <div className="col-md-6">
                        <ul>
                          <li>
                            <strong>Descripción:</strong> {p.descripcion_pedido_agregacion}
                          </li>
                          <li>
                            <strong>Dificultad:</strong> {p.dificultad_pedido_agregacion}
                          </li>
                        </ul>
                      </div>

                      <div className="col-md-6">
                        <ul>
                          <strong>Evidencias:</strong>
                            {p.evidencias.map((e) => (
                              <li key={e.id}>
                                {e.url_evidencia && (
                                  <a
                                    href={e.url_evidencia}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {e.url_evidencia}
                                  </a>
                                )}
                                {e.archivo_evidencia && <span>{e.archivo_evidencia}</span>}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    <div className="row mt-3 text-center">
                      <div className="col">
                        <button
                          className="btn btn-success me-2"
                          disabled={procesando === p.id}
                          onClick={() => handleTomarPedido(p.id!, "aceptar")}
                        >
                          {procesando === p.id ? "Procesando..." : "Aceptar"}
                        </button>

                        <button
                          className="btn btn-danger"
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