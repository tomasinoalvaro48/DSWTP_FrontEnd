import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import type { Denunciante, PedidoResolucion, Usuario, Zona } from '../../entities/entities.ts'
import ZonaByLocalidadSelection from '../ZonaByLocalidadSelection.tsx'

export function GenerarPedidoPaso1() {
  const navigate = useNavigate()

  // Objeto modelo
  const [pedidoRes, _] = useState<PedidoResolucion>({
    id: '',
    resultado_pedido_resolucion: '',
    dificultad_pedido_resolucion: 0,
    estado_pedido_resolucion: '',
    fecha_pedido_resolucion: '',
    direccion_pedido_resolucion: '',
    descripcion_pedido_resolucion: '',
    comentario_pedido_resolucion: '',
    zona: {} as Zona,
    cazador: {} as Usuario,
    anomalias: [],
    denunciante: {} as Denunciante,
  })

  // Manejo de SUBMIT
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/generar-pedido-paso-2', { state: pedidoRes })
  }

  return (
    <div className="d-flex flex-column bg-light">
      <h1>Generar Pedido</h1>
      <form className="d-flex flex-column p-4 border rounded bg-light" onSubmit={handleSubmit}>
        <ZonaByLocalidadSelection objToUpdate={pedidoRes} />

        <label htmlFor="direccion" className="form-label">
          Dirección aproximada donde ocurrió la anomalía:
        </label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          className="form-control"
          placeholder="Ingrese una direccion"
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
