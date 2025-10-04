import type { PropsWithChildren } from 'react'
import { useAuth } from './AuthContext.tsx'

type PtotectedRouteProps = PropsWithChildren & {
  allowedRoles?: string[] // Roles permitidos para acceder a la ruta
}

export default function ProtectedRoute({ children, allowedRoles }: PtotectedRouteProps) {
  const { userRol } = useAuth()

  if (userRol === null || !allowedRoles?.includes(userRol)) {
    return <div>Access denied.</div>
  }

  return children
}
