import { useAuth } from '../auth/AuthContext.tsx'
import { NavLink } from 'react-router-dom'
import { NavMap } from './NavMap.tsx'
import type { Rol } from './NavMap.tsx'

export function NavMapPage() {
  const { userRol } = useAuth()
  const rol: Rol = (userRol as Rol) ?? 'publico'
  const links = NavMap[rol]

  return (
    <div className="p-4">
      <h3>Mapa de Navegación ({userRol})</h3>
      <ul>
        {links.map((item: { path: string; label: string }) => (
          <li key={item.path}>
            <NavLink to={item.path}>{item.label}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}