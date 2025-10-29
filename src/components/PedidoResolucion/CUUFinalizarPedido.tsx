import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { patch } from '../../api/dataManager.ts'

export function FinalizarPedido() {
  const navigate = useNavigate()

  const { id } = useParams()

  const [pedido_resolucion, setPedido] = useState({
    comentario_pedido_resolucion: '',
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      patch(`pedido_resolucion/finalizar-pedido-rsolucion/${id}`, pedido_resolucion)
      navigate('/show-mis-pedidos')
      // recargamos la página entera para actualizar el nivel del cazador en el navbar
      window.location.reload()
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100">
        <div className="col-md-6 offset-md-3">
          <form
            className="d-flex flex-column p-4 border rounded bg-light shadow"
            onSubmit={handleSubmit}
          >
            <h1 className="mb-4 text-center">Finalizar pedido</h1>

            <div className="mb-3">
              <label htmlFor="comentario" className="form-label">
                Comentario final pedido (Opcional)
              </label>
              <input
                type="text"
                id="comentario"
                className="form-control"
                placeholder="Comentario de pedido"
                onChange={(e) =>
                  setPedido({
                    ...pedido_resolucion,
                    comentario_pedido_resolucion: e.target.value,
                  })
                }
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Finalizar Pedido
            </button>
            <Link className="btn btn-secondary mt-2" to="/show-mis-pedidos">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}