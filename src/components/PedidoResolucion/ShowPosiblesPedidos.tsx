import { get, patch } from "../../api/dataManager.ts";
import type { PedidoResolucion } from "../../entities/entities.ts";
import { Accordion, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export function ShowPosiblesPedidos(){
  const { data, loading, error } = get<PedidoResolucion>(
    'pedido_resolucion?estado_pedido_resolucion=solicitado'
  )
  const navigate = useNavigate()
/*
  const haddleTakePedido = () => {

    
    patch("pedido_resolucion/tomar-pedido", "") //No se bien si esto iria con patch
    navigate("/mostrar-posibles-pedidos")
  }
*/
  const haddleTakePedido = async (id: string) => {
    try {

      const token = localStorage.getItem("token")
      await patch(`pedido_resolucion/tomar-pedido-resolucion/${id}`,{} ,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      navigate("/mostrar-posibles-pedidos")
    } catch (err) {
      console.error("Error al tomar el pedido:", err)
    }
  }


  return(
    <div className="ShowPosiblesPedidos">
      <h1>Posibles Pedidos Resolucion</h1>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>


      {loading && (
        <div className="d-flex align-items-center">
          <Spinner animation="border" role="status" size="sm" className="me-2" />
          <span>Cargando pedidos...</span>
        </div>
      )}
      {error && <Alert variant="danger">Error al cargar pedidos: {error}</Alert>}

      {!loading && !error && data && (
        <div className="accordion my-3 mx-4">
        <Accordion>
          {data?.map((unPedido)=>(
            <Accordion.Item eventKey={unPedido.id.toString()} key={unPedido.id}>
             <Accordion.Header>
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <div>
                    <strong>Localidad: </strong> {unPedido.zona.localidad.nombre_localidad} <br />
                    <strong>Zona: </strong> {unPedido.zona.nombre_zona}
                  </div>

                  <div>
                    <strong>Dificultad: </strong> {unPedido.dificultad_pedido_resolucion}
                  </div>

                  <div>
                    <strong>Fecha Realiz: </strong>{" "}
                    {new Date(unPedido.fecha_pedido_resolucion).toLocaleDateString("es-AR")}
                  </div>

                  <div>
                    Detalle
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className="container">
                  <div className="row text-start">
                    <div className="col-md-6">
                      <ul><strong>Direccion: </strong>{unPedido.direccion_pedido_resolucion}</ul>
                      <ul><strong>Denunciante: </strong>{unPedido.denunciante.nombre_apellido_denunciante}</ul>
                      <ul><strong>Denunciante Email: </strong>{unPedido.denunciante.email_denunciante}</ul>
                      <ul><strong>Denunciante Telefono: </strong>{unPedido.denunciante.telefono_denunciante}</ul>
                      <ul><strong>Denunciante Telefono: </strong>{unPedido.denunciante.telefono_denunciante}</ul>
                    </div>

                
                    <div className="col-md-6">
                      <ul><strong>Anomalías:</strong>

                        {unPedido.anomalias.map((unaAnomalia)=>(
                          <ul key={unaAnomalia.id}>
                            <strong>Nombre Anomalia: </strong>{unaAnomalia.tipo_anomalia.nombre_tipo_anomalia}
                            <strong> Dificultad Anomalia: </strong>{unaAnomalia.tipo_anomalia.dificultad_tipo_anomalia}
                          
                          </ul>
                        ))}                  
                        
                      </ul>
                    </div>
                  </div>
                  <div className="row text-start align-items-center">
                    <button className="btn btn-primary" type="button" onClick={() => haddleTakePedido(unPedido.id.toString())}>
                        Tomar Pedido
                    </button>
                    
                    
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        </div>
      )}

      {loading && <div>Cargando...</div>}
      {error && <div>{error}</div>}

    </div>
  )
}
