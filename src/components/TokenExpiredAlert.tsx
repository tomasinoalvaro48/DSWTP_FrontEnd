import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

interface Props {
  setShowTokenExpiredAlert: (op: boolean) => void
}

const TokenExpiredAlert = ({ setShowTokenExpiredAlert }: Props) => {
  const [show, setShow] = useState(true)

  const handleClose = () => {
    setShowTokenExpiredAlert(false)
    setShow(false)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sesión expirada</Modal.Title>
        </Modal.Header>
        <Modal.Body>Su sesión ha expirado. Por favor, inicie sesión de nuevo.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TokenExpiredAlert
