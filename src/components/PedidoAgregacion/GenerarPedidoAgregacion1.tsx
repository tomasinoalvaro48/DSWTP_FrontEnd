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
    <div className="d-flex flex-column bg-light p-4 border rounded">
      <h1>Generar Pedido de Agregación - Paso 1</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="descripcion" className="form-label">
            Descripción
        </label>

        <input
          required
          type="text"
          id="descripcion"
          name="descripcion"
          className="form-control"
          placeholder="Ingrese una descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <label htmlFor="dificultad" className="form-label mt-3">
            Dificultad
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

        <button type="submit" className="btn btn-primary mt-3">
          Siguiente
        </button>

        <Link to="/show-pedidos-agregacion" className="btn btn-secondary mt-3 ms-2">
          Cancelar
        </Link>
      </form>
    </div>
  )
}