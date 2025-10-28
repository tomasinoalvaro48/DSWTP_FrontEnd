import { get } from '../../api/dataManager.ts'
import { Table } from 'react-bootstrap'
import type { Denunciante } from '../../entities/entities.ts'

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
              </tr>
            </thead>
            <tbody>
              {data.map((unDenunciante) => (
                <tr key={unDenunciante.id}>
                  <td>{unDenunciante.nombre_apellido_denunciante}</td>
                  <td>{unDenunciante.telefono_denunciante}</td>
                  <td>{unDenunciante.email_denunciante}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {loading && <div>Cargando...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  )
}