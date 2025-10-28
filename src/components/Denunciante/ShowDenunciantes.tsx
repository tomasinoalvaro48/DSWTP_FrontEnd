import { get } from '../../api/dataManager.ts'
import { Table } from 'react-bootstrap'
import type { Denunciante } from '../../entities/entities.ts'
import { Link } from 'react-router-dom'
import DeleteEntityButton from '../DeleteEntityButton.tsx'

export function ShowDenunciantes() {
  const { data, loading, error } = get<Denunciante>('denunciantes')

  return (
    <div className="ShowDenunciantes container mt-4 mb-5">
      <h1
        className="mb-4"
        style={{
          color: '#333',
          fontWeight: 600,
        }}
      >
        Denunciantes registrados
      </h1>

      {!loading && !error && data?.length === 0 && (
        <div className="alert alert-info">No hay denunciantes cargados.</div>
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
              backgroundColor: '#f8f9fa', // gris claro
            }}
          >
            <thead
              className="text-center"
              style={{
                backgroundColor: '#dee2e6', // gris medio más oscuro
              }}
            >
              <tr>
                <th>Nombre y Apellido</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {data.map((unDenunciante) => (
                <tr key={unDenunciante.id}>
                  <td>{unDenunciante.nombre_apellido_denunciante}</td>
                  <td>{unDenunciante.telefono_denunciante}</td>
                  <td>{unDenunciante.email_denunciante}</td>
                  <td className="text-center">
                    <Link
                      to={`/update-denunciante/${unDenunciante.id}`}
                      className="btn btn-sm btn-outline-secondary me-2"
                    >
                      Editar
                    </Link>
                    <DeleteEntityButton
                      idToDelete={unDenunciante.id}
                      nameToDelete={unDenunciante.nombre_apellido_denunciante}
                      route="denunciantes"
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
          <Link to="/add-denunciante" className="btn btn-lg btn-outline-primary w-100">
            + Agregar Denunciante
          </Link>
        </div>
      </div>
    </div>
  )
}