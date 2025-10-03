import { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import type { TipoAnomalia, PedidoResolucion, Anomalia } from '../../entities/entities.ts'
import { get, post } from '../../api/dataManager.ts'

export function GenerarPedidoPaso2() {
  const navigate = useNavigate()

  const [anoms, setAnoms] = useState<Anomalia[]>([])
  const [descripcion, setDescripcion] = useState('')
  const { data: tipos, loading, error } = get<TipoAnomalia>('tipo_anomalia')

  // Datos del paso 1
  const location = useLocation()

  // Objeto modelo
  const pedidoRes = {
    ...location.state,
    anomalias: anoms,
    descripcion_pedido_resolucion: descripcion,
  }

  const handleAddAnomalia = (t: TipoAnomalia) => {
    if (anoms.map((a) => a.tipo_anomalia.id).includes(t.id)) {
      return alert('Anomalía ya agregada')
    }
    const nuevaAnomalia: Anomalia = {
      id: '',
      tipo_anomalia: t,
      resultado_anomalia: 'inconcluso',
    }
    setAnoms([...anoms, nuevaAnomalia])
  }

  const handleDeleteAnomalia = (ida: string) => {
    setAnoms(anoms.filter((a) => a.tipo_anomalia.id !== ida))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(pedidoRes)
    const token = localStorage.getItem('token')

    post<PedidoResolucion>('pedido_resolucion', pedidoRes, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    navigate('/show-pedido')
  }

  return (
    <div className="d-flex flex-column bg-light p-4 border rounded">
      <h1>Generar Pedido - Paso 2</h1>
      <form className="d-flex flex-column p-4 border rounded bg-light" onSubmit={handleSubmit}>
        {loading && <p>Cargando tipos de anomalía...</p>}
        {!loading && error && <p>Error al cargar tipos de anomalías.</p>}
        {!loading && !error && tipos.length > 0 && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Anomalia</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tipos.length === 0 ? (
                <p>No hay entidades cargadas</p>
              ) : (
                tipos.map((t) => (
                  <tr key={t.id}>
                    <th>{t.nombre_tipo_anomalia}</th>
                    <th>
                      <div className="btn btn-primary" onClick={() => handleAddAnomalia(t)}>
                        Agregar anomalía
                      </div>
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Anomalías cargadas:</th>
            </tr>
          </thead>
          <tbody>
            {anoms.map((a) => (
              <tr key={a.tipo_anomalia.id}>
                <th>{a.tipo_anomalia.nombre_tipo_anomalia}</th>
                <th>
                  <div
                    className="btn btn-danger"
                    onClick={() => handleDeleteAnomalia(a.tipo_anomalia.id)}
                  >
                    Eliminar
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

        {anoms.length === 0 && (
          <label htmlFor="descripcion" className="form-label">
            Descripcion (obligatorio si no agregó anomalías):
          </label>
        )}
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          className="form-control"
          placeholder="Ingrese una descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required={anoms.length === 0}
        />

        <button className="btn btn-primary">Realizar Pedido</button>
        <Link className="btn btn-secondary" to="/show-pedido">
          Cancelar Pedido
        </Link>
      </form>
    </div>
  )
}
