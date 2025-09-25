import React from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { get } from "../../api/dataManager.ts"
import type { Zona } from "../../entities/entities.ts"

export function GenerarPedidoPaso1() {
  const navigate = useNavigate()

    const { data: zonas, loading, error } = get<Zona>("zona")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const pedidoPaso1 = {
      descripcion_pedido_resolucion: "" as string,
      zona: formData.get("zona") as string,
      direccion_pedido_resolucion: formData.get("direccion") as string,
      denunciante: formData.get("denunciante") as string,
      anomalias: [] as { tipo_anomalia: string }[]
    }

    navigate("/generar-pedido-paso-2", { state: pedidoPaso1 })
  }


  return(
    <div className="d-flex flex-column bg-light">
      <form 
        className="d-flex flex-column p-4 border rounded bg-light"
        onSubmit={handleSubmit}
      >
        <h1>Generar Pedido</h1>
        {loading && <p>Cargando zonas...</p>}
        {error && <p>Error al cargar zonas: {error}</p>}

        <div className="mb-3">


          <label htmlFor="zona" className="form-label">
            Zona 
          </label>

          <select className="form-select" aria-label="Default select example" id="zona" name="zona" required >
            <option selected>Selecciona entre las posibles zonas</option>
            {zonas?.map((zona) => (
             <option key={zona.id} value={zona.id}>
              {zona.nombre_zona} {zona.localidad.nombre_localidad}
            </option>
            ))}
          </select>


          
          <label htmlFor="direccion" className="form-label">
            Direccion 
          </label>
          <input 
            type="text" 
            id= "direccion"
            name="direccion"
            className="form-control"
            placeholder="Ingrese una direccion"
            required
          />
          
          <label htmlFor="denunciante" className="form-label">
            Denunciante
          </label>
          <input 
            type="text" 
            id= "denunciante"
            name="denunciante"
            className="form-control"
            placeholder="Ingrese un denunciante"
            required
          />
        </div>
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