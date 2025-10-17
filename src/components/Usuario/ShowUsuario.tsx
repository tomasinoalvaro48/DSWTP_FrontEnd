import { get } from '../../api/dataManager.ts'
import { Table, Badge } from 'react-bootstrap'
import type { Usuario } from '../../entities/entities.ts'
import { Link } from 'react-router-dom'
import DeleteEntityButton from '../DeleteEntityButton.tsx'

export function ShowUsuario() {
  const { data, loading, error } = get<Usuario>('usuario')

  return (
    <div className="ShowUsuario container mt-4 mb-5">
      <h1
        className="mb-4"
        style={{
          color: '#333',
          fontWeight: 600,
        }}
      >
        Usuarios
      </h1>

      {!loading && !error && data?.length === 0 && (
        <div className="alert alert-info">No hay usuarios cargados.</div>
      )}

      {!loading && !error && data?.length > 0 && (
        <div
          style={{
            borderRadius: '0.5rem',
            overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          <Table
            striped
            hover
            bordered
            responsive
            className="align-middle mb-0"
            style={{
              backgroundColor: '#f8f9fa',
            }}
          >
            <thead
              className="text-center"
              style={{
                backgroundColor: '#dee2e6',
              }}
            >
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Localidad</th>
                <th>Zona</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((unUsuario) => (
                <tr key={unUsuario.id}>
                  <td>{unUsuario.id}</td>
                  <td>{unUsuario.nombre_usuario}</td>
                  <td>{unUsuario.email_usuario}</td>
                  <td>{unUsuario.tipo_usuario}</td>
                  <td>{unUsuario.zona.localidad.nombre_localidad}</td>
                  <td>{unUsuario.zona.nombre_zona}</td>
                  <td>
                    <Badge
                      bg={
                        unUsuario.estado_aprobacion === 'pendiente'
                          ? 'warning'
                          : unUsuario.estado_aprobacion === 'aprobado'
                            ? 'success'
                            : 'danger'
                      }
                      text={unUsuario.estado_aprobacion === 'pendiente' ? 'dark' : 'light'}
                    >
                      {unUsuario.estado_aprobacion}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <Link
                      to={`/update-usuario/${unUsuario.id}`}
                      className="btn btn-sm btn-outline-secondary me-2"
                    >
                      Editar
                    </Link>
                    <DeleteEntityButton
                      idToDelete={unUsuario.id}
                      nameToDelete={unUsuario.nombre_usuario}
                      route={'usuario'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {loading && <div>Cargando...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row justify-content-center mt-3">
        <div className="col-12 col-md-4">
          <Link to="/add-usuario" className="btn btn-lg btn-outline-primary w-100">
            + Agregar Usuario
          </Link>
        </div>
      </div>
    </div>
  )
}
