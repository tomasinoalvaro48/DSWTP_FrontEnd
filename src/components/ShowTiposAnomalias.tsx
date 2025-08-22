import { postManager } from '../api/postManager.ts'
import { Table } from 'react-bootstrap'
import type { TipoAnomalia } from '../entities/entities.ts'

export function ShowTiposAnomalias() {
  const { post, loading, error } = postManager<TipoAnomalia>('tipo_anomalia')

  return (
    <div className="CRUD">
      <h1>Tipos de Anomalias</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Dificultad</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <th>Cargando...</th>
            </tr>
          )}
          {error && (
            <tr>
              <th>{error}</th>
            </tr>
          )}
          {post?.map((unDato) => (
            <tr key={unDato.id}>
              <th>{unDato.id}</th>
              <th>{unDato.nombre_tipo_anomalia}</th>
              <th>{unDato.dificultad_tipo_anomalia}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
