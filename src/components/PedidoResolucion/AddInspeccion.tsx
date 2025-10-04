import { useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { post } from '../../api/dataManager.ts'
import { Link } from 'react-router-dom'


export function AddInspeccion(){

    const navigate = useNavigate()

    const { id } = useParams()

    const [nuevaInspeccion, setNuevaInspeccion] = useState({
      comentario_inspeccion: '',
      pedido_resolucion: id
        
    })


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            post('inspeccion', nuevaInspeccion)
        navigate('/show-mis-pedidos')
        }
    }




    return(
      <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
        <div className="row w-100">
          <div className="col-md-6 offset-md-3">
            <form
              className="d-flex flex-column p-4 border rounded bg-light shadow"
              onSubmit={handleSubmit}
            >
              <h1 className="mb-4 text-center">Agregar Inspección</h1>

              <div className="mb-3">
                <label htmlFor="comentario" className="form-label">
                  Comentario de inspección
                </label>
                <input
                  required
                  type="text"
                  id="comentario"
                  className="form-control"
                  placeholder="Comentario de inspección"
                  onChange={(e) =>
                    setNuevaInspeccion({
                      ...nuevaInspeccion,
                      comentario_inspeccion: e.target.value,
                    })
                  }
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Agregar
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