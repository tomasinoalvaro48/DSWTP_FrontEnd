import { Outlet } from 'react-router-dom'
import { MainNavbar } from '../navigation/MainNavbar.tsx'
import Footer from '../footer/Footer.tsx'

export function RootLayout() {
  return (
    <div>
      <MainNavbar />
      <Outlet />
      <Footer />
    </div>
  )
}
