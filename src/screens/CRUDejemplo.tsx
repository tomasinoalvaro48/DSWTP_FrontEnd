import { useFetch } from '../api/useFetch.ts'
import { Table } from 'react-bootstrap'
import type { TipoAnomalia } from '../DTOs/TipoAnomaliaDTO.ts'

export function CRUDejemplo() {
  const { data, loading } = useFetch<TipoAnomalia[]>('/tipo_anomalia')

  return (
    <div className="CRUDejemplo">
      <h1>CRUD Usuarios Ejemplo</h1>
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
              <th>Loading...</th>
            </tr>
          )}
          {data?.map((unDato) => (
            <tr key={unDato._id}>
              <th>{unDato._id}</th>
              <th>{unDato.nombre_tipo_anomalia}</th>
              <th>{unDato.dificultad_tipo_anomalia}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
