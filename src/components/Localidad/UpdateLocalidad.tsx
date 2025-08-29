import { useNavigate, useParams, Link } from 'react-router'
import { useState } from 'react'
import { getOne, patch } from '../../api/dataManager.ts'
import type { Localidad } from '../../entities/entities.ts'

export function UpdateLocalidad(){
    const {id} = useParams()

    const {data} = getOne<Localidad>('localidad/'+id)
    
    const [localidadToUpdate, setLocalidadToUpdate] = useState<Localidad>({
        id: data?.id,
        codigo_localidad: undefined,
        nombre_localidad: undefined
    }) 

    const navigate = useNavigate()

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        patch('localidad/'+id, localidadToUpdate)
        navigate('/show-localidad')
    }

    return(
        <div className="d-flex flex-column align-items-center justify-content-center bg-light">
            <h1>Localidad a Editar</h1>
            <div className="container mb-3 border rounded bg-light p-2">
                <div>Id: {data?.id ?? 'error'}</div>
                <div>Codigo: {data?.codigo_localidad ?? 'error'}</div>
                <div>Nombre: {data?.nombre_localidad ?? 'error'}</div>
            </div>
            <form 
                className="d-flex flex-column align-items-center justify-content-center p-4 border rounded bg-light"
                onSubmit={handleUpdate}
            >
                <div className='mb-3'>
                    <label htmlFor="codigo" className="form-label">
                        Codigo
                    </label>
                    <input 
                        required
                        type="text" 
                        id="codigo"
                        className="form-control"
                        placeholder="Codigo"
                        defaultValue={data?.nombre_localidad}
                        onChange={(e)=>
                            setLocalidadToUpdate({
                                ...localidadToUpdate,
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
                        defaultValue={data?.codigo_localidad}
                        onChange={(e)=>
                            setLocalidadToUpdate({
                                ...localidadToUpdate,
                                nombre_localidad: e.target.value,
                            })
                        }
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                Enviar
                </button>
                <Link className="btn btn-secondary" to="/show-tipo-anomalia">
                Cancelar
                </Link>
            </form>
        </div>
    )

    
}