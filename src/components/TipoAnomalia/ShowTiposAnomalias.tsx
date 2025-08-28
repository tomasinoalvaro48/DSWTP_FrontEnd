import { get } from '../../api/dataManager.ts'
import { Table } from 'react-bootstrap'
import type { TipoAnomalia } from '../../entities/entities.ts'
import { Link } from 'react-router'
import DeleteEntityButton from '../DeleteEntityButton.tsx'

// Componente para mostrar la tabla de Tipos de Anomalías
export function ShowTiposAnomalias() {
  const { data, loading, error } = get<TipoAnomalia>('tipo_anomalia')

  return (
    <div className="ShowTiposAnomalias">
      <h1>Tipos de Anomalias</h1>
      <Table className="table table-bordered ">
        <thead className="table-secondary text-center">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Nivel de Dificultad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody className="">
          {data.length === 0 ? (
            <tr>
              <th>No hay entidades cargadas</th>
            </tr>
          ) : (
            data?.map((unTipo) => (
              <tr key={unTipo.id}>
                <th>{unTipo.id}</th>
                <th>{unTipo.nombre_tipo_anomalia}</th>
                <th>{'Nivel ' + unTipo.dificultad_tipo_anomalia}</th>
                <th className="fit-content text-center">
                  <Link
                    to={`/update-tipo-anomalia/${unTipo.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Editar
                  </Link>
                  <DeleteEntityButton
                    idToDelete={unTipo.id}
                    nameToDelete={unTipo.nombre_tipo_anomalia}
                    route={'tipo_anomalia'}
                  />
                </th>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {loading && <div>Cargando...</div>}
      {error && <div>{error}</div>}
      <Link to="/add-tipo-anomalia" className="btn btn-lg btn-success m-3 mt-0">
        + Agregar Tipo de Anomalía
      </Link>
    </div>
  )
}
