import { useAuth } from '../auth/AuthContext.tsx'
import { NavLink } from 'react-router-dom'
import { NavMap } from './NavMap.tsx'
import type { Rol } from './NavMap.tsx'

export function NavMapPage() {
  const { userRol } = useAuth()
  const rol: Rol = (userRol as Rol) ?? 'publico'
  const links = NavMap[rol]

  return (
    <div className="container my-4">
      <h3 className="mb-4 text-center">Mapa de Navegación ({userRol})</h3>
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {links.map((item) => (
          <div className="col" key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `card h-100 shadow-sm text-decoration-none ${
                  isActive ? 'border-primary' : ''
                }`
              }
            >
              <div className="card-body d-flex align-items-center">
                {/* Puedes agregar ícono aquí si quieres */}
                <span className="card-text">{item.label}</span>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  )
}