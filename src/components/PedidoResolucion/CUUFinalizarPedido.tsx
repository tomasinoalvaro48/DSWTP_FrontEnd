import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { patch } from '../../api/dataManager.ts'
import ModalAlert from '../../components/ModalAlert.tsx'

export function FinalizarPedido() {
  const { id } = useParams()

  const [pedido_resolucion, setPedido] = useState({
    comentario_pedido_resolucion: '',
  })

  const [showModalAlert, setShowModalAlert] = useState(false)
  const [modalBody, setModalBody] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const body =
        pedido_resolucion.comentario_pedido_resolucion.trim() === '' ? {} : pedido_resolucion

      const response = await patch(`pedido_resolucion/finalizar-pedido-resolucion/${id}`, body)

      if (response.status === 200) {
        setModalBody('Pedido finalizado correctamente.')
        setShowModalAlert(true)
      }
    } catch (err: any) {
      console.error('Error al finalizar pedido:', err)
      setModalBody(
        err?.response?.data?.message ?? 'Ocurrió un error al intentar finalizar el pedido.'
      )
      setShowModalAlert(true)
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

      {showModalAlert && (
        <ModalAlert
          setShowModalAlert={setShowModalAlert}
          title="Información"
          body={modalBody}
          navigateOnClose="/show-mis-pedidos"
        />
      )}
    </div>
  )
}
