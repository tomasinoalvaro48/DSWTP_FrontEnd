import { useState } from 'react'
import { useNavigate } from 'react-router'
import { post } from '../../api/dataManager.ts'
import { Link } from 'react-router'


export function AddLocalidad(){
    const [localidadNueva, setLocalidadNueva] = useState({
        nombre_localidad: '',
        codigo_localidad: ''
    })

    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            post('localidad', localidadNueva)
        navigate('/show-localidad')
        }
    }

    return(
        <div className="d-flex flex-column bg-light">
            <form 
                className="d-flex flex-column p-4 border rounded bg-light"
                onSubmit={handleSubmit}
            >
                <h1>Agregar Localidad</h1>
                <div className="mb-3">
                    <label htmlFor="codigo" className="form-label">
                        Codigo
                    </label>
                    <input 
                        required
                        type="text" 
                        id="codigo"
                        className="form-control"
                        placeholder="Codigo"
                        onChange={(e)=>
                            setLocalidadNueva({
                                ...localidadNueva,
                                codigo_localidad: e.target.value,
                            })
                        }
                    />
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
                            setLocalidadNueva({
                                ...localidadNueva,
                                nombre_localidad: e.target.value,
                            })
                        }
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                Enviar
                </button>
                <Link className="btn btn-secondary" to="/show-localidad">
                Cancelar
                </Link>
            </form>
        </div>
    )

}