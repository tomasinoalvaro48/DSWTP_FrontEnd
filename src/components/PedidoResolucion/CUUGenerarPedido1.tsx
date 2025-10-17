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
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex flex-column bg-light p-4 border rounded shadow-sm">
            <h1 className="text-center mb-4">Generar Pedido - Paso 1</h1>

            <form className="d-flex flex-column" onSubmit={handleSubmit}>
              <ZonaByLocalidadSelection setZona={setZona} />

              <label htmlFor="direccion" className="form-label mt-3">
                Dirección aproximada donde ocurrió la anomalía:
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                className="form-control mb-3"
                placeholder="Ingrese una dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />

              <div className="row gy-2 justify-content-between mt-3">
                <div className="col-12 col-md-4">
                  <Link className="btn btn-secondary w-100" to="/show-pedido">
                    Cancelar
                  </Link>
                </div>
                <div className="col-12 col-md-4">
                  <button type="submit" className="btn btn-primary w-100">
                    Siguiente ➜
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
