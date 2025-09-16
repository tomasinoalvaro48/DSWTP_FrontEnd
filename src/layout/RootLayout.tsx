import { Outlet } from 'react-router-dom'
import { MainNavbar } from '../navigation/MainNavbar.tsx'

export function RootLayout() {
  return (
    <div>
      <MainNavbar />
      <Outlet />
    </div>
  )
}