import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOne, patch } from '../../api/dataManager.ts'
import type { Zona } from '../../entities/entities.ts'


export function UpdateZona(){
    const { id } = useParams()
    const { data } = getOne<Zona>('zona/' + id)

    const [zonaToUpdate, setZonaToUpdate] = useState<Partial<Zona>>({
        nombre_zona: '',
        localidad: undefined
    })

    const navigate = useNavigate()

    useEffect(() => {
        if(data){
            setZonaToUpdate({
                id: data.id ?? '',
                nombre_zona: data.nombre_zona ?? '',
                localidad: data.localidad ?? undefined
            })
        }
    }, [data])


    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!zonaToUpdate.nombre_zona || !zonaToUpdate.localidad) {
            return
        }
        patch('zona/' + id, {
            nombre_zona: zonaToUpdate.nombre_zona,
            localidad: zonaToUpdate.localidad.id
        })
        navigate('/show-zona')
    }

    if (!zonaToUpdate) return <div>Cargando...</div>


    return(
        <div className="d-flex flex-column align-items-center justify-content-center bg-light">
            <h1>Zona a Editar</h1>
            <div className="container mb-3 border rounded bg-light p-2">
                <div>Id: {data?.id ?? 'error'}</div>
                <div>Nombre: {data?.nombre_zona ?? 'error'}</div>
                <div>Localidad: {data?.localidad.nombre_localidad ?? 'error'}</div>
            </div>
            
            <form 
                className="d-flex flex-column align-items-center justify-content-center p-4 border rounded bg-light"
                onSubmit={handleUpdate}
            >
                <div className='mb-3'>
                    <label htmlFor="nombre" className="form-label">
                        Nombre
                    </label>
                    <input 
                        required
                        type="text" 
                        id="nombre"
                        className="form-control"
                        placeholder="Nombre"
                        value={zonaToUpdate.nombre_zona}
                        onChange={(e)=>
                            setZonaToUpdate({
                                ...zonaToUpdate,
                                nombre_zona: e.target.value,
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

/*
                <div>Id: {zonaToUpdate.id}</div>
                <div>Nombre: {zonaToUpdate.nombre_zona}</div>
                <div>Localidad: {zonaToUpdate.localidad.nombre_localidad}</div>
                
                    <label htmlFor="Localidad" className="form-label">
                        Id Localidad
                    </label>
                    <input 
                        required
                        type="text" 
                        id="localidad"
                        className="form-control"
                        placeholder="Localidad"
                        defaultValue={data?.localidad.id}
                        onChange={(e)=>
                            setZonaToUpdate({
                                ...zonaToUpdate,
                                localidad.id: e.target.value,
                            })
                        }
                    />*/