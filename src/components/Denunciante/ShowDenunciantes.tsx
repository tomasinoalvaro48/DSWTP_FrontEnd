import { get } from '../../api/dataManager.ts'
import { Table } from 'react-bootstrap'
import type { Denunciante } from '../../entities/entities.ts'
import { Link } from 'react-router-dom'
import DeleteEntityButton from '../DeleteEntityButton.tsx'

export function ShowDenunciantes() {
  const { data, loading, error } = get<Denunciante>('denunciantes')

  return (
    <div className="ShowDenunciantes">
      <h1>Denunciantes</h1>

      {!loading && !error && data?.length === 0 && (
        <div className="alert alert-info">No hay denunciantes cargados.</div>
      )}

      {!loading && !error && data?.length > 0 && (
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Nombre y Apellido</th>
              <th>Telefono</th>
              <th>Email</th>
              <th>Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((unDenunciante) => (
              <tr key={unDenunciante.id}>
                <th>{unDenunciante.id}</th>
                <th>{unDenunciante.nombre_apellido_denunciante}</th>
                <th>{unDenunciante.telefono_denunciante}</th>
                <th>{unDenunciante.email_denunciante}</th>
                <th>
                  <Link
                    to={`/update-denunciante/${unDenunciante.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Editar
                  </Link>
                  <DeleteEntityButton
                    idToDelete={unDenunciante.id}
                    nameToDelete={unDenunciante.nombre_apellido_denunciante}
                    route={'denunciantes'}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      
      {loading && <div>Cargando...</div>}
      {error && <div>{error}</div>}
      <Link to="/add-denunciante" className="btn btn-lg btn-success m-3 mt-0">
        + Agregar Denunciante
      </Link>
    </div>
  )
}