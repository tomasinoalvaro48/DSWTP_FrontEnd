import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import type { TipoAnomalia } from '../../entities/entities.ts'
import { get } from '../../api/dataManager.ts'

export function GenerarPedidoPaso2() {
  const navigate = useNavigate()
  const location = useLocation()

  //datos guardados en el paso 1
  const pedidoPaso1 = location.state as {
    descripcion_pedido_resolucion: string
    zona: string
    direccion_pedido_resolucion: string
    anomalias: { tipo_anomalia: string }[]
  }

  /*
  const token = localStorage.getItem('token')

    post("pedido_resolucion", pedidoCompleto, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    navigate("/show-pedido")
  }
*/

  const [anomalias, setAnomalias] = useState<{ tipo_anomalia: TipoAnomalia }[]>([])
  const [anomaliaInput, setAnomaliaInput] = useState('')
  const { data: tipos_anomalia, loading, error } = get<TipoAnomalia>('tipo_anomalia')

  const handleAddAnomalia = (e: React.FormEvent) => {
    e.preventDefault()
    if (anomaliaInput.trim() === '') return
    const tipoSeleccionado = tipos_anomalia?.find((t) => t.id === anomaliaInput)
    if (!tipoSeleccionado) return
    setAnomalias([...anomalias, { tipo_anomalia: tipoSeleccionado }])
    setAnomaliaInput('')
  }

  //A modificar
  const handleSiguiente = () => {
    const pedidoPaso2 = {
      ...pedidoPaso1,
      anomalias: anomalias.map((a) => ({ tipo_anomalia: a.tipo_anomalia.id })),
    }
    navigate('/generar-pedido-paso-3', { state: pedidoPaso2 })
  }

  return (
    <div className="d-flex flex-column bg-light p-4 border rounded">
      <h1>Generar Pedido - Paso 2</h1>
      {loading && <p>Cargando zonas...</p>}
      {error && <p>Error al cargar zonas: {error}</p>}

      <form onSubmit={handleAddAnomalia} className="mb-9">
        <label htmlFor="anomalia">Tipo de Anomalía</label>
        <select
          className="form-select"
          id="anomalia"
          name="anomalia"
          value={anomaliaInput}
          onChange={(e) => setAnomaliaInput(e.target.value)}
          required
        >
          <option value="">Selecciona una anomalía</option>
          {tipos_anomalia?.map((tipos) => (
            <option key={tipos.id} value={tipos.id}>
              {tipos.nombre_tipo_anomalia}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary mt-2">
          Agregar anomalía
        </button>
      </form>
      <h3>Anomalías cargadas:</h3>
      <ul className="list-group mb-3">
        {anomalias.map((a, idx) => (
          <li key={idx} className="list-group-item">
            {a.tipo_anomalia.nombre_tipo_anomalia}
          </li>
        ))}
      </ul>

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

      <button className="btn btn-primary" onClick={handleSiguiente}>
        Siguiente
      </button>
      <Link className="btn btn-secondary" to="/show-pedido">
        Cancelar
      </Link>
    </div>
  )
}
