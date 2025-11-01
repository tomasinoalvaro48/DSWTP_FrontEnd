import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { get } from '../../api/dataManager.ts'
import type { TipoAnomalia } from '../../entities/entities.ts'
import DeleteEntityButton from '../DeleteEntityButton.tsx'

// Componente para mostrar la tabla de Tipos de Anomalías
export function ShowTiposAnomalias() {
  const { data, loading, error } = get<TipoAnomalia>('tipo_anomalia')
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="ShowTiposAnomalias container mt-4 mb-5">
      <h1
        className="mb-4"
        style={{
          color: '#333',
          fontWeight: 600,
        }}
      >
        Tipos de Anomalías
      </h1>

      {!loading && !error && data?.length === 0 && (
        <div className="alert alert-info">No hay tipos de anomalía cargados.</div>
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
                backgroundColor: '#dee2e6', // gris medio
              }}
            >
              <tr>
                <th>Nombre</th>
                <th>Nivel de Dificultad</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {data.map((unTipo) => (
                <tr key={unTipo.id}>
                  <td>{unTipo.nombre_tipo_anomalia}</td>
                  <td>{`Nivel ${unTipo.dificultad_tipo_anomalia}`}</td>
                  <td className="text-center">
                    <Link
                      to={`/update-tipo-anomalia/${unTipo.id}`}
                      className="btn btn-sm btn-outline-secondary me-2"
                    >
                      Editar
                    </Link>
                    <DeleteEntityButton
                      idToDelete={unTipo.id}
                      nameToDelete={unTipo.nombre_tipo_anomalia}
                      route="tipo_anomalia"
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
          <Link to="/add-tipo-anomalia" className="btn btn-lg btn-outline-primary w-100">
            + Agregar Tipo de Anomalía
          </Link>
        </div>
      </div>
    </div>
  )
}