type Rol = 'operador' | 'denunciante' | 'cazador' | 'publico'

export const NavMap = {
  operador: [
    { path: '/show-tipo-anomalia', label: 'Tipos de Anomalías' },
    { path: '/show-denunciante', label: 'Denunciantes' },
    { path: '/show-localidad', label: 'Localidades' },
    { path: '/show-zona', label: 'Zonas' },
    { path: '/show-usuario', label: 'Usuarios' },
    { path: '/show-pedido', label: 'Pedidos' },
    { path: '/mostrar-posibles-pedidos', label: 'Pedidos para Cazador' },
    { path: '/show-mis-pedidos', label: 'Mis Pedidos' },
    { path: '/show-pedidos-agregacion', label: 'Pedidos de Agregación' },
    { path: '/tomar-pedidos-agregacion', label: 'Aceptar/Rechazar Pedidos de Agregación' },
  ],
  denunciante: [
    { path: '/show-pedido', label: 'Pedidos' },
  ],
  cazador: [
    { path: '/mostrar-posibles-pedidos', label: 'Pedidos' },
    { path: '/show-pedidos-agregacion', label: 'Pedidos de Agregación' },
  ],
  publico: [
    { path: '/login', label: 'Iniciar Sesión' },
    { path: '/register-denunciante', label: 'Registrarse Denunciante' },
    { path: '/register-usuario', label: 'Registrarse Usuario' },
  ],
}

export type { Rol }