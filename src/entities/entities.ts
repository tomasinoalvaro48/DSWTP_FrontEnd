interface BaseDTO {
  id: string | undefined
}

interface TipoAnomalia extends BaseDTO {
  nombre_tipo_anomalia: string
  dificultad_tipo_anomalia: number
}

interface Localidad extends BaseDTO {
  nombre_localidad: string | undefined
  codigo_localidad: string | undefined
}

export type { BaseDTO, TipoAnomalia, Localidad }

