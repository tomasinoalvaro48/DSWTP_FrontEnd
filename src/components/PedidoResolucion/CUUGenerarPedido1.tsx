import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import type { Zona } from '../../entities/entities.ts'
import ZonaByLocalidadSelection from '../ZonaByLocalidadSelection.tsx'

export function GenerarPedidoPaso1() {
  const navigate = useNavigate()
  const [direccion, setDireccion] = useState('')
  const [zona, setZona] = useState<Zona>({} as Zona)

  // Objeto modelo
  const pedidoRes = {
    direccion_pedido_resolucion: direccion,
    zona: zona,
  }

  // Manejo de SUBMIT
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(pedidoRes)
    navigate('/generar-pedido-paso-2', { state: pedidoRes })
  }

  return (
    <div className="d-flex flex-column bg-light">
      <h1>Generar Pedido</h1>
      <form className="d-flex flex-column p-4 border rounded bg-light" onSubmit={handleSubmit}>
        <ZonaByLocalidadSelection setZona={setZona} />

        <label htmlFor="direccion" className="form-label">
          Dirección aproximada donde ocurrió la anomalía:
        </label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          className="form-control"
          placeholder="Ingrese una direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary">
          Siguiente
        </button>

        <Link className="btn btn-secondary" to="/show-pedido">
          Cancelar
        </Link>
      </form>
    </div>
  )
}
