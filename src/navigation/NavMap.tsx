type Rol = 'operador' | 'denunciante' | 'cazador' | 'publico'

export const NavMap = {
  operador: [
    { path: '/show-tipo-anomalia', label: 'Ver Tipos de Anomalías cargadas' },
    { path: '/show-localidad', label: 'Ver Localidades cargadas' },
    { path: '/show-zona', label: 'Ver Zonas cargadas' },
    { path: '/show-denunciante', label: 'Ver Denunciantes registrados' },
    { path: '/show-usuario', label: 'Ver Usuarios registrados (cazadores y operador)' },
    { path: '/show-pedido', label: 'Ver Pedidos de Resolución de Anomalías' },
    { path: '/tomar-pedidos-agregacion', label: 'Aprobar Pedidos de Agregación de Anomalías pendientes' },
    { path: '/show-pedidos-agregacion-operador', label: 'Ver histórico de Pedidos de Agregación' },
    { path: '/approve-usuario', label: 'Aprobar Cuentas de Cazadores' },
  ],
  denunciante: [
    { path: '/show-mis-pedidos-denunciante', label: 'Ver mis Pedidos Pendientes' },
    { path: '/show-mis-pedidos-resueltos-denunciante', label: 'Ver mis Pedidos Resueltos' },
    { path: '/generar-pedido-paso-1', label: 'Realizar una denuncia' },
  ],
  cazador: [
    { path: '/show-mis-pedidos', label: 'Ver mis Pedidos de Resolución tomados' },
    { path: '/mostrar-posibles-pedidos', label: 'Ver Pedidos de Resolución para tomar' },
    { path: '/show-pedidos-agregacion', label: 'Ver mis Pedidos de Agregación de Anomalías' },
    { path: '/generar-pedido-agregacion-1', label: 'Solicitar agregar una nueva Anomalía' },
  ],
  publico: [
    { path: '/login', label: 'Iniciar Sesión' },
    { path: '/register-denunciante', label: 'Registrarse Denunciante' },
    { path: '/register-usuario', label: 'Registrarse Usuario' },
  ],
}

export type { Rol }