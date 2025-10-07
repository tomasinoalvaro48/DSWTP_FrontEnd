import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { post, get } from '../../api/dataManager.ts'
import type { Localidad, Zona } from '../../entities/entities.ts'

export function AddZona(){
    const [zonaNueva, setZonaNueva] = useState<Partial<Zona>>({
        nombre_zona: '',
        localidad: undefined
    })

    const navigate = useNavigate()
    const { data: localidades } = get<Localidad>('localidad')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            post('zona', {
                nombre_zona: zonaNueva.nombre_zona,
                localidad: zonaNueva.localidad?.id
            })
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
                        pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                        title="El nombre no puede tener números"
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

                    <select required id="localidad" className="form-select"
                    value={zonaNueva.localidad?.id}
                    onChange={(e) => {
                        const selected = localidades.find((loc) => loc.id === e.target.value)
                        setZonaNueva({ ...zonaNueva, localidad: selected })
                    }}>
                        <option value="">Seleccione una localidad</option>
                        {localidades.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                                {loc.nombre_localidad}
                            </option>
                        ))}
                    </select>
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