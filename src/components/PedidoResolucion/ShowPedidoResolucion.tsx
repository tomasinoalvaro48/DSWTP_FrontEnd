import { get } from '../../api/dataManager.ts'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import type { PedidoResolucion } from '../../entities/entities.ts'
import DeleteEntityButton from '../DeleteEntityButton.tsx'

export function ShowPedidosResolucion() {
  const { data, loading, error } = get<PedidoResolucion>('pedido_resolucion')

  return (
    <div className="ShowPedidoResolucion">
      <h1>Pedidos Resolucion</h1>
      {!loading && !error && data?.length === 0 && (
        <div className="alert alert-info">No hay pedidos de resolución cargados.</div>
      )}

      {!loading && !error && data?.length > 0 && (
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Comentario</th>
              <th>Zona</th>
              <th>Nombre de Denunciante</th>
              <th>Email de Denunciante</th>
              <th>Dirección</th>
              <th>Dificultad</th>
              <th>Anomalías</th>
              <th>Fecha</th>
              <th>Cazador</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((unPedido) => (
              <tr key={unPedido.id}>
                <th>{unPedido.descripcion_pedido_resolucion}</th>
                <th>{unPedido.estado_pedido_resolucion}</th>
                {unPedido.estado_pedido_resolucion !== 'libre' && (
                  <th>{unPedido.comentario_pedido_resolucion}</th>
                )}
                {unPedido.estado_pedido_resolucion === 'libre' && <th>No se aceptó el pedido</th>}
                <th>{unPedido.zona.nombre_zona}</th>
                <th>{unPedido.denunciante.nombre_apellido_denunciante}</th>
                <th>{unPedido.denunciante.email_denunciante}</th>
                <th>{unPedido.direccion_pedido_resolucion}</th>
                <th>{unPedido.dificultad_pedido_resolucion}</th>
                <th>
                  {unPedido.anomalias.map((unaAnomalia) => (
                    <tr key={unaAnomalia.id}>
                      <th>{unaAnomalia.tipo_anomalia.nombre_tipo_anomalia}</th>
                      <th>{unaAnomalia.tipo_anomalia.dificultad_tipo_anomalia}</th>
                    </tr>
                  ))}
                </th>
                <th>{unPedido.fecha_pedido_resolucion}</th>
                {unPedido.estado_pedido_resolucion !== 'libre' && (
                  <th>{unPedido.cazador?.nombre_usuario}</th>
                )}
                {unPedido.estado_pedido_resolucion === 'libre' && <th>No se aceptó el pedido</th>}
                <th>
                  <DeleteEntityButton
                    nameToDelete={unPedido.direccion_pedido_resolucion}
                    idToDelete={unPedido.id}
                    route="pedido_resolucion"
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {loading && <div>Cargando...</div>}
      {error && <div>{error}</div>}
      <Link to="/generar-pedido-paso-1" className="btn btn-lg btn-success m-3 mt-0">
        + Generar Pedido
      </Link>
    </div>
  )
}
