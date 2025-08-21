import { postManager } from '../api/postManager.ts'
import { Table } from 'react-bootstrap'

export function CRUD() {
  const { post, loading, error } = postManager(
    'http://localhost:3000/api/tipo_anomalia'
  )
  console.log(`Largo del arreglo post: ${post.length}`)
  console.log(`Tipo de dato del post: ${typeof post}`)

  return (
    <div className="CRUD">
      <h1>CRUD Tipo de Anomalia Ejemplo</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Dificultad</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <th>Loading...</th>
            </tr>
          )}
          {error && (
            <tr>
              <th>{error}</th>
            </tr>
          )}
          {post?.map((unDato) => (
            <tr key={unDato.id}>
              <th>{unDato.id}</th>
              <th>{unDato.nombre_tipo_anomalia}</th>
              <th>{unDato.dificultad_tipo_anomalia}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
