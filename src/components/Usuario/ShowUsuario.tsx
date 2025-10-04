import { get } from '../../api/dataManager.ts'
import { Table } from 'react-bootstrap'
import type { Usuario } from '../../entities/entities.ts'
import { Link } from 'react-router-dom'
import DeleteEntityButton from '../DeleteEntityButton.tsx'

export function ShowUsuario() {
  const { data, loading, error } = get<Usuario>('usuario')

  return (
    <div className="ShowUsuario">
      <h1>Usuarios</h1>

      {!loading && !error && data?.length === 0 && (
        <div className="alert alert-info">No hay usuarios cargados.</div>
      )}

      {!loading && !error && data?.length > 0 && (
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Password</th>
              <th>Tipo</th>
              <th>Zona</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((unUsuario) => (
              <tr key={unUsuario.id}>
                <th>{unUsuario.id}</th>
                <th>{unUsuario.nombre_usuario}</th>
                <th>{unUsuario.email_usuario}</th>
                <th>{unUsuario.password_usuario}</th>
                <th>{unUsuario.tipo_usuario}</th>
                <th>{unUsuario.zona.nombre_zona}</th>
                <th>
                  <Link
                    to={`/update-usuario/${unUsuario.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Editar
                  </Link>
                  <DeleteEntityButton
                    idToDelete={unUsuario.id}
                    nameToDelete={unUsuario.nombre_usuario}
                    route={'usuario'}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {loading && <div>Cargando...</div>}
      {error && <div>{error}</div>}
      <Link to="/add-usuario" className="btn btn-lg btn-success m-3 mt-0">
        + Agregar Usuario
      </Link>
    </div>
  )
}
