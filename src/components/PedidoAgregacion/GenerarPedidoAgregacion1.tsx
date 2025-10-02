import React from "react"
import { useNavigate, Link } from "react-router-dom"

export function GenerarPedidoAgregacion1() {
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const pedidoPaso1 = {
      descripcion_pedido_agregacion: formData.get("descripcion") as string,
      dificultad_pedido_agregacion: formData.get("dificultad") as string,
      evidencias: [] as { url?: string; archivo?: string }[],
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

        <input required type="text" id="descripcion" name="descripcion"
        className="form-control" placeholder="Ingrese una descripción"/>

        <label htmlFor="dificultad" className="form-label mt-3">
            Dificultad
        </label>

        <select required id="dificultad" name="dificultad" className="form-select">
          <option value="">Seleccione dificultad</option>
          <option value="1">Fácil</option>
          <option value="2">Medio</option>
          <option value="3">Difícil</option>
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