import { useState } from 'react'
import { useNavigate } from 'react-router'
import { post } from '../../api/dataManager.ts'
import { Link } from 'react-router'

export function AddDenunciantes() {
  const [denuncianteNuevo, setDenuncianteNuevo] = useState({
    nombre_apellido_denunciante: '',
    telefono_denunciante: '',
    email_denunciante: '',
  })

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      await post('denunciantes', denuncianteNuevo)
      navigate('/show-denunciante')
    }
  }

  return (
    <div className="d-flex flex-column bg-light">
      <form
        className="d-flex flex-column p-4 border rounded bg-light"
        onSubmit={handleSubmit}
      >
        <h1>Agregar Denunciante</h1>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre y apellido
          </label>
          <input required type="text" id="nombre" className="form-control" placeholder="Nombre" onChange={(e) =>
              setDenuncianteNuevo({
                ...denuncianteNuevo,
                nombre_apellido_denunciante: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Telefono
          </label>
          <input required type="text" id="telefono" className="form-control" placeholder="Telefono" onChange={(e) =>
              setDenuncianteNuevo({
                ...denuncianteNuevo,
                telefono_denunciante: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input required type="email" id="email" className="form-control" placeholder="Email" onChange={(e) =>
              setDenuncianteNuevo({
                ...denuncianteNuevo,
                email_denunciante: e.target.value,
              })
            }
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>

        <Link className="btn btn-secondary" to="/show-denunciante">
          Cancelar
        </Link>

      </form>
    </div>
  )
}