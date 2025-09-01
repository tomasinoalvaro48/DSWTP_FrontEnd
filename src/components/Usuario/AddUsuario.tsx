import { useState } from 'react'
import { useNavigate } from 'react-router'
import { post } from '../../api/dataManager.ts'
import { Link } from 'react-router'

export function AddUsuario(){
  const [newUsuario, setnNewUsuario] = useState({
    nombre_usuario: '',
    email_usuario: '',
    password_usuario: '',
    tipo_usuario: '',
    zona: ''
  })


  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      post('usuario', newUsuario)
    navigate('/show-usuario')
      }
    }
 return(
    <div className="d-flex flex-column bg-light">
      <form 
        className="d-flex flex-column p-4 border rounded bg-light"
        onSubmit={handleSubmit}
      >
        <h1>Agregar Nuevo Usuario</h1>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input 
          required
          type="text" 
          id="nombre"
          className="form-control"
          placeholder="Nombre"
          onChange={(e)=>
            setnNewUsuario({
              ...newUsuario,
              nombre_usuario: e.target.value,
            })
          }
          />

          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input 
          required
          type="email"
          id="email"
          className="form-control"
          placeholder="Email"
          onChange={(e)=>
            setnNewUsuario({
              ...newUsuario,
              email_usuario: e.target.value,
            })
          }

          />
          <label htmlFor="psw" className="form-label">
            Password
          </label>
          <input 
          required
          type="text" 
          id="psw"
          className="form-control"
          placeholder="Password"
          onChange={(e)=>
            setnNewUsuario({
              ...newUsuario,
              password_usuario: e.target.value,
            })
          }
          />

          <label htmlFor="tipo" className="form-label">
            Tipo
          </label>
          <input 
          required
          type="text" 
          id="tipo"
          className="form-control"
          placeholder="Tipo"
          onChange={(e)=>
            setnNewUsuario({
              ...newUsuario,
              tipo_usuario: e.target.value,
            })
          }
          />


          <label htmlFor="zona" className="form-label">
            ID de Zona
          </label>
          <input 
          required
          type="text" 
          id="zona"
          className="form-control"
          placeholder="Id de zona"
          onChange={(e)=>
            setnNewUsuario({
              ...newUsuario,
              zona: e.target.value,
            })
          }
          />

        </div>
        <button type="submit" className="btn btn-primary">
        Enviar
        </button>
        <Link className="btn btn-secondary" to="/show-usuario">
        Cancelar
        </Link>
      </form>
    </div>
    )




  }