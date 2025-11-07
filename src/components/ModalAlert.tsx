import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'

interface Props {
  setShowModalAlert: (op: boolean) => void
  title: string
  body: string
  navigateOnClose?: string
}

const ModalAlert = ({ setShowModalAlert, title, body, navigateOnClose }: Props) => {
  const [show, setShow] = useState(true)
  const navigate = navigateOnClose ? useNavigate() : null

  const handleClose = () => {
    setShowModalAlert(false)
    setShow(false)
    if (navigateOnClose && navigate) {
      if (navigateOnClose === 'reload') {
        location.reload()
      } else {
        navigate(navigateOnClose)
        location.reload()
      }
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalAlert
