interface BaseDTO {
  id: string
}

interface TipoAnomalia extends BaseDTO {
  nombre_tipo_anomalia: string
  dificultad_tipo_anomalia: number
}

interface Denunciante extends BaseDTO {
  nombre_apellido_denunciante: string
  telefono_denunciante: string
  email_denunciante: string
}

interface Localidad extends BaseDTO {
  nombre_localidad: string
  codigo_localidad: string
  zonas: Zona[]
}

interface Zona extends BaseDTO{
  nombre_zona: string
  localidad: Localidad
}

interface Usuario extends BaseDTO{
  nombre_usuario: string
  email_usuario: string
  password_usuario: string
  tipo_usuario: string
  zona: Zona
  //faltan atributos
}

export type { BaseDTO, TipoAnomalia, Denunciante, Localidad, Zona, Usuario }
