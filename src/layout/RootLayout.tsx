import { Outlet, useLocation } from 'react-router-dom'
import { MainNavbar } from '../navigation/MainNavbar.tsx'
import Footer from '../footer/Footer.tsx'

export function RootLayout() {
  const location = useLocation()
  const mostrarFooter = location.pathname === '/' || location.pathname === '/nav-map' || location.pathname === '/politicas'

  return (
    <div>
      <MainNavbar />
      <Outlet />
      {mostrarFooter && <Footer />}
    </div>
  )
}