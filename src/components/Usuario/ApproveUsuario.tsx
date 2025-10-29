import { useState, useEffect } from 'react'
import { Table, Badge } from 'react-bootstrap'
import { get, patch } from '../../api/dataManager.ts'
import type { Usuario } from '../../entities/entities.ts'

export function ApproveUsuario() {
  const { data, loading, error } = get<Usuario>('usuario/pending-cazadores')
  const [actionLoading, setActionLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  useEffect(() => {
    if (data) {
      setUsuarios(data)
    }
  }, [data])

  const handleApprove = async (usuario: Usuario) => {
    setActionLoading(true)
    setMessage(null)
    patch<Usuario>(`usuario/approve/${usuario.id}`)
    setMessage({ type: 'success', text: 'Cuenta de cazador aprobada exitosamente' })
    setActionLoading(false)
    location.reload()
  }

  const handleReject = async (usuario: Usuario) => {
    setActionLoading(true)
    setMessage(null)
    patch<Usuario>(`usuario/reject/${usuario.id}`)
    setMessage({ type: 'success', text: 'Cuenta de cazador rechazada' })
    setActionLoading(false)
    location.reload()
  }

  return (
    <div className="ApproveUsuario container mt-4 mb-5">
      <h1>Aprobar Cuentas de Cazadores</h1>

      {/* Mensajes de feedback */}
      {message && (
        <div
          className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}
          role="alert"
        >
          {message.text}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
      )}

      {error && <div className="alert alert-danger">Error al cargar solicitudes: {error}</div>}

      {!loading && !error && usuarios.length === 0 && (
        <div className="alert alert-info">No hay solicitudes de cazadores pendientes.</div>
      )}

      {!loading && !error && usuarios.length > 0 && (
        <div
          style={{
            borderRadius: '0.5rem',
            overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          <Table
            striped
            hover
            bordered
            responsive
            className="align-middle mb-0"
            style={{
              backgroundColor: '#f8f9fa',
            }}
          >
            <thead
              className="text-center"
              style={{
                backgroundColor: '#dee2e6',
              }}
            >
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Zona</th>
                <th>Localidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombre_usuario}</td>
                  <td>{usuario.email_usuario}</td>
                  <td>{usuario.zona?.nombre_zona ?? '—'}</td>
                  <td>{usuario.zona?.localidad?.nombre_localidad ?? '—'}</td>
                  <td className="text-center">
                    <Badge
                      bg={
                        usuario.estado_aprobacion === 'pendiente'
                          ? 'warning'
                          : usuario.estado_aprobacion === 'aprobado'
                            ? 'success'
                            : 'danger'
                      }
                      text={usuario.estado_aprobacion === 'pendiente' ? 'dark' : 'light'}
                    >
                      {usuario.estado_aprobacion.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-success me-2"
                      onClick={() => handleApprove(usuario)}
                      disabled={actionLoading}
                    >
                      {actionLoading ? 'Procesando...' : 'Aprobar'}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleReject(usuario)}
                      disabled={actionLoading}
                    >
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  )
}