import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import type { TipoAnomalia, PedidoResolucion, Anomalia } from '../../entities/entities.ts'
import { get } from '../../api/dataManager.ts'

export function GenerarPedidoPaso2() {
  const [anoms, setAnoms] = useState<Anomalia[]>([])
  const { data: tipos, loading, error } = get<TipoAnomalia>('tipo_anomalia')

  // Datos del paso 1
  const location = useLocation()
  const state = location.state as PedidoResolucion

  const handleAddAnomalia = (t: TipoAnomalia) => {
    const nuevaAnomalia: Anomalia = {
      id: '',
      tipo_anomalia: t,
      resultado_anomalia: 'inconcluso',
      pedido_resolucion: state,
    }
    if (anoms.map((a) => a.tipo_anomalia.id).includes(t.id)) return alert('Anomalía ya agregada')
    setAnoms([...anoms, nuevaAnomalia])
  }

  const handleDeleteAnomalia = (id: string) => {
    setAnoms(anoms.filter((a) => a.id !== id))
  }

  const handleFinish = () => {
    if (anoms.length === 0) return alert('Debe agregar al menos una anomalía')
  }

  return (
    <div className="d-flex flex-column bg-light p-4 border rounded">
      <h1>Generar Pedido - Paso 2</h1>

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
                    <button
                      type="submit"
                      className="btn btn-primary mt-2"
                      onClick={() => handleAddAnomalia(t)}
                    >
                      Agregar anomalía
                    </button>
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
      <table className="table table-bordered">
        <thead>
          <h3>Anomalías cargadas:</h3>
        </thead>
        <tbody>
          {anoms.map((a) => (
            <tr>
              <th key={a.id}>{a.tipo_anomalia.nombre_tipo_anomalia}</th>
              <th>
                <button className="btn btn-danger" onClick={() => handleDeleteAnomalia(a.id)}>
                  {' '}
                  Eliminar
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <label htmlFor="descripcion" className="form-label">
        Descripcion (Opcional)
      </label>
      <input
        type="text"
        id="descripcion"
        name="descripcion"
        className="form-control"
        placeholder="Ingrese una decripcion (Opcional)"
      />

      <button className="btn btn-primary" onClick={handleFinish}>
        Realizar Pedido
      </button>
      <Link className="btn btn-secondary" to="/show-pedido">
        Cancelar Pedido
      </Link>
    </div>
  )
}
