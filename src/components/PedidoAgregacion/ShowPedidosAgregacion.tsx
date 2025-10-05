import { get } from "../../api/dataManager.ts";
import { Table } from "react-bootstrap";
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

      {!loading && !error && data?.length === 0 && (
        <div className="alert alert-info">No hay pedidos de agregación cargados.</div>
      )}

      {!loading && !error && data?.length > 0 && (
        <Table striped bordered hover>
          <thead className="table-dark"> 
            <tr>
              <th>Id</th>
              <th>Descripción</th>
              <th>Dificultad</th>
              <th>Estado</th>
              <th>Evidencias</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((unPedido)=>(
              <tr key= {unPedido.id}>
                <th>{unPedido.id}</th>
                <th>{unPedido.descripcion_pedido_agregacion}</th>
                <th>
                  {Number(unPedido.dificultad_pedido_agregacion) === 1? "Nivel 1"
                    : Number(unPedido.dificultad_pedido_agregacion) === 2? "Nivel 2"
                    : Number(unPedido.dificultad_pedido_agregacion) === 3? "Nivel 3"
                    : unPedido.dificultad_pedido_agregacion
                  }
                </th>
                <th>{unPedido.estado_pedido_agregacion}</th>

                <th>
                  <ul className="list-group">
                    {unPedido.evidencias.map((unaEvidencia) => (
                      <li key={unaEvidencia.id} className="list-group-item">
                        {unaEvidencia.url_evidencia && (
                          <a href={unaEvidencia.url_evidencia} target="_blank" rel="noreferrer">
                            {unaEvidencia.url_evidencia}
                          </a>
                        )}
                        {unaEvidencia.archivo_evidencia && (
                          <span className="ms-2 badge bg-secondary">
                            {unaEvidencia.archivo_evidencia}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </th>
                
                <th>
                  <DeleteEntityButton
                    idToDelete={unPedido.id}
                    nameToDelete={unPedido.descripcion_pedido_agregacion}
                    route={'pedido_agregacion'}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {loading && <div>Cargando...</div>}
      {error && <div>{error}</div>}
      
      <Link to="/generar-pedido-agregacion-1" className="btn btn-lg btn-success m-3 mt-0">
          + Generar Pedido de Agregación
      </Link>
    </div>
  )
}