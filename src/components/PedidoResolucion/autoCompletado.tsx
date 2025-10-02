import { useEffect, useState } from 'react'
import { get } from '../../api/dataManager'

interface TipoAnomalia {
  id: string
  nombre_tipo_anomalia: string
  dificultad_tipo_anomalia: number
}

export function AutocompleteAnomalia({ onSelect }: { onSelect: (anomalia: TipoAnomalia) => void }) {
  const [anomalias, setAnomalias] = useState<TipoAnomalia[]>([])
  const [filtro, setFiltro] = useState('')
  const [sugerencias, setSugerencias] = useState<TipoAnomalia[]>([])

  useEffect(() => {
    const fetchAnomalias = async () => {
      try {
        const { data } = await get<TipoAnomalia>('tipo_anomalia')
        setAnomalias(data)
      } catch (error) {
        console.error('Error cargando anomalías:', error)
      }
    }
    fetchAnomalias()
  }, [])

  useEffect(() => {
    if (filtro.trim() === '') {
      setSugerencias([])
    } else {
      setSugerencias(
        anomalias.filter((a) => a.nombre_tipo_anomalia.toLowerCase().includes(filtro.toLowerCase()))
      )
    }
  }, [filtro, anomalias])

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar anomalía..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      {sugerencias.length > 0 && (
        <ul className="list-group position-absolute w-100 mt-1" style={{ zIndex: 1000 }}>
          {sugerencias.map((a) => (
            <li
              key={a.id}
              className="list-group-item list-group-item-action"
              onClick={() => {
                onSelect(a)
                setFiltro('') // limpio input
                setSugerencias([]) // cierro sugerencias
              }}
              style={{ cursor: 'pointer' }}
            >
              {a.nombre_tipo_anomalia} (dif: {a.dificultad_tipo_anomalia})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
