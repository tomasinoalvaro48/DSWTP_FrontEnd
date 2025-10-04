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
  password_denunciante: string
  tipo_documento_denunciante: string
  numero_documento_denunciante: string
}

interface Localidad extends BaseDTO {
  nombre_localidad: string
  codigo_localidad: string
  zonas: Zona[]
}

interface Zona extends BaseDTO {
  nombre_zona: string
  localidad: Localidad
}

interface Usuario extends BaseDTO {
  nombre_usuario: string
  email_usuario: string
  password_usuario: string
  tipo_usuario: string
  zona: Zona
  //faltan atributos
}

interface PedidoResolucion extends BaseDTO {
  resultado_pedido_resolucion: string
  dificultad_pedido_resolucion: number
  estado_pedido_resolucion: string
  fecha_pedido_resolucion: string
  direccion_pedido_resolucion: string
  descripcion_pedido_resolucion: string | null
  comentario_pedido_resolucion: string | null
  zona: Zona
  cazador?: Usuario
  anomalias: Anomalia[]
  denunciante: Denunciante
  inspecciones: Inspecciones []
}

interface Anomalia extends BaseDTO {
  resultado_anomalia: string
  tipo_anomalia: TipoAnomalia
}

interface PedidoAgregacion extends BaseDTO {
  descripcion_pedido_agregacion: string
  dificultad_pedido_agregacion: number
  estado_pedido_agregacion: string
  cazador?: Usuario
  evidencias: Evidencia[]
  tipo_anomalia?: TipoAnomalia
}

interface Inspecciones extends BaseDTO{
  numero_inspeccion: number
  comentario_inspeccion: string
  fecha_inspeccion: string
  pedido_resolucion: PedidoAgregacion


}

interface Evidencia extends BaseDTO {
  url_evidencia?: string
  archivo_evidencia?: string
  pedido_agregacion: PedidoAgregacion
}

export type {
  BaseDTO,
  TipoAnomalia,
  Denunciante,
  Localidad,
  Zona,
  Usuario,
  PedidoResolucion,
  Anomalia,
  PedidoAgregacion,
  Evidencia,
  Inspecciones
}
