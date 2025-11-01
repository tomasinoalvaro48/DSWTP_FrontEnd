import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { get } from '../../api/dataManager.ts'
import type { Localidad } from '../../entities/entities.ts'
import DeleteEntityButton from '../DeleteEntityButton.tsx'

export function ShowLocalidad() {
  const { data, loading, error } = get<Localidad>('localidad')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="ShowLocalidades container mt-4 mb-5">
      <h1
        className="mb-4"
        style={{
          color: '#333',
          fontWeight: 600,
        }}
      >
        Localidades
      </h1>

      {!loading && !error && data?.length === 0 && (
        <div className="alert alert-info">No hay localidades cargadas.</div>
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
                <th>Código</th>
                <th>Nombre</th>
                <th>Zonas</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((unaLocalidad) => (
                <tr key={unaLocalidad.id}>
                  <td>{unaLocalidad.codigo_localidad}</td>
                  <td>{unaLocalidad.nombre_localidad}</td>
                  <td>
                    {unaLocalidad.zonas.map((unaZona) => (
                      <div key={unaZona.id}>{`Zona ${unaZona.nombre_zona}`}</div>
                    ))}
                  </td>
                  <td className="text-center">
                    <Link
                      to={`/update-localidad/${unaLocalidad.id}`}
                      className="btn btn-sm btn-outline-secondary me-2"
                    >
                      Editar
                    </Link>
                    <DeleteEntityButton
                      idToDelete={unaLocalidad.id}
                      nameToDelete={unaLocalidad.nombre_localidad}
                      route={'localidad'}
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
          <Link to="/add-localidad" className="btn btn-lg btn-outline-primary w-100">
            + Agregar Localidad
          </Link>
        </div>
      </div>
    </div>
  )
}