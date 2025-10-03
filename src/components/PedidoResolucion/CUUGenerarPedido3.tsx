import React ,{useState}from "react"
import { useNavigate,useLocation } from "react-router-dom"
import { post } from "../../api/dataManager"
import { Link } from "react-router-dom"

export function GenerarPedidoPaso3() {
  const navigate = useNavigate()
   const location = useLocation()


  //datos guardados en el paso 1 y 2
  const pedidoPaso2 = location.state as {
    descripcion_pedido_resolucion: string
    zona: string
    direccion_pedido_resolucion: string
    anomalias: { tipo_anomalia: string }[]
  }

  const handleConfirmar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const pedidoPaso3 = { 
      descripcion_pedido_resolucion: formData.get("descripcion") as string
    }

    const pedidoCompleto = { ...pedidoPaso2, ...pedidoPaso3 }



  

  return (
    <div className="d-flex flex-column bg-light">
      <h1>Generar Pedido - Paso 3</h1>

      <form 
        className="mb-3"
        onSubmit={handleConfirmar}>
        
        <button className="btn btn-primary" type="submit">
            Confirmar Pedido
        </button>
        <Link className="btn btn-secondary" to="/show-pedido">
          Cancelar
        </Link>
      </form>


    </div>
  )
}


