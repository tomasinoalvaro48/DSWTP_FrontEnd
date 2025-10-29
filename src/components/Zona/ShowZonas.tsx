import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { get } from '../../api/dataManager.ts'
import type { Zona } from '../../entities/entities.ts'
import DeleteEntityButton from '../DeleteEntityButton.tsx'

export function ShowZonas() {
  const { data, loading, error } = get<Zona>('zona')

  return (
    <div className="ShowZonas container mt-4 mb-5">
      <h1
        className="mb-4"
        style={{
          color: '#333',
          fontWeight: 600,
        }}
      >
        Zonas
      </h1>

      {!loading && !error && data?.length === 0 && (
        <div className="alert alert-info">No hay zonas cargadas.</div>
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
                <th>Nombre</th>
                <th>Código Localidad</th>
                <th>Nombre Localidad</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((unaZona) => (
                <tr key={unaZona.id}>
                  <td>{unaZona.nombre_zona}</td>
                  <td>{unaZona.localidad.codigo_localidad}</td>
                  <td>{unaZona.localidad.nombre_localidad}</td>
                  <td className="text-center">
                    <Link
                      to={`/update-zona/${unaZona.id}`}
                      className="btn btn-sm btn-outline-secondary me-2"
                    >
                      Editar
                    </Link>
                    <DeleteEntityButton
                      idToDelete={unaZona.id}
                      nameToDelete={unaZona.nombre_zona}
                      route={'zona'}
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
          <Link to="/add-zona" className="btn btn-lg btn-outline-primary w-100">
            + Agregar Zona
          </Link>
        </div>
      </div>
    </div>
  )
}