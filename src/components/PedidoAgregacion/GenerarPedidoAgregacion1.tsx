import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export function GenerarPedidoAgregacion1() {
  const navigate = useNavigate()
  const [descripcion, setDescripcion] = useState('')
  const [dificultad, setDificultad] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const pedidoPaso1 = {
      descripcion_pedido_agregacion: descripcion,
      dificultad_pedido_agregacion: dificultad,
    }

    navigate('/generar-pedido-agregacion-2', { state: pedidoPaso1 })
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex flex-column bg-light p-4 border rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-center flex-grow-1 mb-0">
                Generar Pedido de Agregación - Paso 1
              </h2>
            </div>

            <form className="d-flex flex-column" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label fw-bold">
                  Descripción de la anomalía
                </label>
                <input
                  required
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  className="form-control"
                  placeholder="Ingrese descripción de la anomalía detectada"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="dificultad" className="form-label fw-bold">
                  Nivel de dificultad
                </label>
                <select
                  required
                  id="dificultad"
                  name="dificultad"
                  className="form-select"
                  value={dificultad}
                  onChange={(e) => setDificultad(e.target.value)}
                >
                  <option value="">Seleccione dificultad</option>
                  <option value="1">Nivel 1</option>
                  <option value="2">Nivel 2</option>
                  <option value="3">Nivel 3</option>
                </select>
              </div>

              <div className="row gy-2 justify-content-between mt-3">
                <div className="col-12 col-md-5">
                  <Link to="/show-pedidos-agregacion" className="btn btn-outline-danger w-100">
                    Cancelar
                  </Link>
                </div>
                <div className="col-12 col-md-5">
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