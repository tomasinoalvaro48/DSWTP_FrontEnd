import { get } from '../../api/postManager.ts'
import { Table } from 'react-bootstrap'
import type { TipoAnomalia } from '../../entities/entities.ts'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router'

export function ShowTiposAnomalias() {
  const { post, loading, error } = get<TipoAnomalia>('tipo_anomalia')

  return (
    <div className="CRUD">
      <h1>Tipos de Anomalias</h1>
      <Table striped bordered hover>
        <thead>
          <tr className="table-primary sm text-center">
            <th>Id</th>
            <th>Nombre</th>
            <th>Dificultad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {post?.map((unDato) => (
            <tr key={unDato.id}>
              <th>{unDato.id}</th>
              <th>{unDato.nombre_tipo_anomalia}</th>
              <th>{unDato.dificultad_tipo_anomalia}</th>
              <th>
                <Link to={`/edit-tipo-anomalia/${unDato.id}`}>
                  <Button variant="primary">Editar</Button>
                </Link>
                <Link to={`/delete-tipo-anomalia/${unDato.id}`}>
                  <Button variant="danger" size="sm">
                    Eliminar
                  </Button>
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
      {loading && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Cargando...
        </div>
      )}
      {error && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {error}
        </div>
      )}
      <Link to="/add-tipo-anomalia">
        <Button variant="success">+ Agregar Tipo de Anomalía</Button>
      </Link>
    </div>
  )
}
