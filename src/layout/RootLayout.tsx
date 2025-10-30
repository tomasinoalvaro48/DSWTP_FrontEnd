import { Outlet, useLocation } from 'react-router-dom'
import { MainNavbar } from '../navigation/MainNavbar.tsx'
import Footer from '../footer/Footer.tsx'

export function RootLayout() {
  const location = useLocation()
  const mostrarFooter =
    location.pathname === '/' ||
    location.pathname === '/nav-map' ||
    location.pathname === '/modificar-perfil' ||
    location.pathname === '/politicas' ||
    location.pathname === '/mostrar-posibles-pedidos' ||
    location.pathname === '/show-pedidos-agregacion' ||
    location.pathname === '/show-mis-pedidos' ||
    location.pathname === '/show-mis-pedidos-denunciante' ||
    location.pathname === '/show-mis-pedidos-resueltos-denunciante' ||
    location.pathname === '/show-tipo-anomalia' ||
    location.pathname === '/show-denunciante' ||
    location.pathname === '/show-localidad' ||
    location.pathname === '/show-zona' ||
    location.pathname === '/show-usuario' ||
    location.pathname === '/show-pedido' ||
    location.pathname === '/tomar-pedidos-agregacion' ||
    location.pathname === '/approve-usuario'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <MainNavbar />
      <main style={{ minHeight: '100vh', flex: '1' }}>
        <Outlet />
      </main>
      {mostrarFooter && <Footer />}
    </div>
  )
}