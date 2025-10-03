import React from 'react'
import { useState } from 'react'
import { get } from '../api/dataManager.ts'
import type { Localidad, Zona } from '../entities/entities.ts'

interface Props {
  setZona: (zona: Zona) => void
}

const ZonaByLocalidadSelection = ({ setZona }: Props) => {
  const { data: localidades, loading: loadingLoc, error: errorLoc } = get<Localidad>('localidad')
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState<Localidad>()

  const handleCambioLocalidad = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const loc_id = event.target.value
    const loc = localidades.find((l) => l.id === loc_id)
    setLocalidadSeleccionada(loc)
    setZona({} as Zona) // reseteamos la zona asignada al obj cuando cambia la localidad
  }

  const handleCambioZona = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const zonaId = event.target.value
    const zon = localidadSeleccionada?.zonas?.find((z) => z.id === zonaId) || ({} as Zona)
    setZona(zon)
  }

  return (
    <div className="mb-3">
      <label htmlFor="localidad" className="form-label">
        Localidad donde ocurrió la anomalía:
      </label>

      {loadingLoc && <p>Cargando localidades...</p>}
      {errorLoc && <p>Error al cargar localidades: {errorLoc}</p>}
      {!loadingLoc && !errorLoc && localidades.length === 0 && <p>No hay localidades cargadas </p>}
      {!loadingLoc && !errorLoc && localidades.length > 0 && (
        <div>
          <select
            className="form-select"
            id="localidad"
            name="localidad"
            value={localidadSeleccionada?.id ?? ''}
            onChange={handleCambioLocalidad}
            required
          >
            <option value="">Seleccionar localidad...</option>
            {localidades?.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.nombre_localidad}
              </option>
            ))}
          </select>

          {localidadSeleccionada === undefined && (
            <p>Seleccione una localidad para ver sus zonas</p>
          )}
          <label htmlFor="zona" className="form-label">
            Zona donde ocurrió la anomalía:
          </label>
          <select
            className="form-select"
            id="zona"
            name="zona"
            disabled={!localidadSeleccionada}
            onChange={handleCambioZona}
            required
          >
            <option value="">Seleccionar zona...</option>
            {localidadSeleccionada?.zonas.map((zon) => (
              <option key={zon.id} value={zon.id}>
                {zon.nombre_zona}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
export default ZonaByLocalidadSelection
