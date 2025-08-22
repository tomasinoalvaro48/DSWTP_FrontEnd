interface BaseDTO {
  id: string
}

interface TipoAnomalia extends BaseDTO {
  nombre_tipo_anomalia: string
  dificultad_tipo_anomalia: number
}

export type { BaseDTO, TipoAnomalia }
