import { useState } from 'react'
import { useNavigate } from 'react-router'
import { post } from '../../api/dataManager.ts'
import { Link } from 'react-router'


export function AddZona(){
    const [zonaNueva, setZonaNueva] = useState({
        nombre_zona: '',
        localidad: ''
    })

    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            post('zona', zonaNueva)
        navigate('/show-zona')
        }
    }

    return(
        <div className="d-flex flex-column bg-light">
            <form 
                className="d-flex flex-column p-4 border rounded bg-light"
                onSubmit={handleSubmit}
            >
                <h1>Agregar Zona</h1>
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
                            setZonaNueva({
                                ...zonaNueva,
                                nombre_zona: e.target.value,
                            })
                        }
                    />
                    <label htmlFor="localidad" className="form-label">
                        Localidad
                    </label>
                    <input 
                        required
                        type="text" 
                        id="nombre"
                        className="form-control"
                        placeholder="Localidad"
                        onChange={(e)=>
                            setZonaNueva({
                                ...zonaNueva,
                                localidad: e.target.value,
                            })
                        }
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                Enviar
                </button>
                <Link className="btn btn-secondary" to="/show-zona">
                Cancelar
                </Link>
            </form>
        </div>
    )

}