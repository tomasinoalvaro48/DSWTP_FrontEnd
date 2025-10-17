import { useState, useEffect } from 'react'
import { get, patch } from '../../api/dataManager.ts'
import { Table, Badge, Modal, Button } from 'react-bootstrap'
import type { Usuario } from '../../entities/entities.ts'

export function ApproveUsuario() {
  const { data, loading, error } = get<Usuario>('usuario/pending-cazadores')
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  useEffect(() => {
    if (data) {
      setUsuarios(data)
    }
  }, [data])

  const handleShowDetails = (usuario: Usuario) => {
    setSelectedUser(usuario)
    setShowModal(true)
  }

  const handleApprove = async (usuario: Usuario) => {
    setActionLoading(true)
    setMessage(null)
    patch<Usuario>(`usuario/approve/${usuario.id}`)
    setMessage({ type: 'success', text: 'Cuenta de cazador aprobada exitosamente' })
    setShowModal(false)
    setSelectedUser(null)
    setActionLoading(false)
    location.reload()
  }

  const handleReject = async (usuario: Usuario) => {
    setActionLoading(true)
    setMessage(null)
    patch<Usuario>(`usuario/reject/${usuario.id}`)
    setMessage({ type: 'success', text: 'Cuenta de cazador rechazada' })
    setShowModal(false)
    setSelectedUser(null)
    setActionLoading(false)
    location.reload()
  }

  return (
    <div className="ApproveUsuario">
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
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre_usuario}</td>
                <td>{usuario.email_usuario}</td>
                <td>
                  <Badge bg="warning" text="dark">
                    {usuario.estado_aprobacion.toUpperCase()}
                  </Badge>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => handleShowDetails(usuario)}
                  >
                    Ver Detalles
                  </button>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => handleApprove(usuario)}
                    disabled={actionLoading}
                  >
                    {actionLoading ? 'Procesando...' : 'Aprobar'}
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
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
      )}

      {/* Modal para ver detalles */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Cazador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Nombre:</strong>
                  <p>{selectedUser.nombre_usuario}</p>
                </div>
                <div className="col-md-6">
                  <strong>Email:</strong>
                  <p>{selectedUser.email_usuario}</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Zona Asignada:</strong>
                  <p>{selectedUser.zona.nombre_zona}</p>
                </div>
                <div className="col-md-6">
                  <strong>Localidad:</strong>
                  <p>{selectedUser.zona.localidad.nombre_localidad}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => selectedUser && handleApprove(selectedUser)}
            disabled={actionLoading}
          >
            {actionLoading ? 'Procesando...' : 'Aprobar'}
          </Button>
          <Button
            variant="danger"
            onClick={() => selectedUser && handleReject(selectedUser)}
            disabled={actionLoading}
          >
            Rechazar
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
