import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export function GenerarPedidoAgregacion1() {
  const navigate = useNavigate()
  const [descripcion, setDescripcion] = useState("")
  const [dificultad, setDificultad] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const pedidoPaso1 = {
      descripcion_pedido_agregacion: descripcion,
      dificultad_pedido_agregacion: dificultad,
    }

    navigate("/generar-pedido-agregacion-2", { state: pedidoPaso1 })
  }

  return (
    <div className="container my-4">
      <div className="bg-white p-4 rounded shadow-sm border">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Generar Pedido de Agregación - Paso 1</h2>
          <Link to="/show-pedidos-agregacion" className="btn btn-outline-secondary">
            Volver
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
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

          <div className="d-flex justify-content-end gap-3">
            <button type="submit" className="btn btn-primary px-4">
              Siguiente ➜
            </button>
            <Link to="/show-pedidos-agregacion" className="btn btn-outline-danger px-4">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}