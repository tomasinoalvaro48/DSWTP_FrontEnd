import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { remove } from '../api/dataManager.ts'
import ModalAlert from './ModalAlert.tsx'

interface Props {
  idToDelete: string
  nameToDelete: string
  route: string
}

const DeleteEntityButton = ({ idToDelete, nameToDelete, route }: Props) => {
  const [show, setShow] = useState(false)
  const [showModalAlert, setShowModalAlert] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Función para manejar la eliminación
  async function handleDelete() {
    const message = await remove(`${route}/${idToDelete}`)
    handleClose()
    setTitle(message)
    setBody(message)
    setShowModalAlert(true)
  }

  return (
    <>
      {showModalAlert && (
        <ModalAlert
          title={title}
          body={body}
          setShowModalAlert={setShowModalAlert}
          navigateOnClose="reload"
        />
      )}
      <button className="btn btn-sm btn-outline-danger" onClick={handleShow}>
        Eliminar
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que desea eliminar <strong>{nameToDelete}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Sí, eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteEntityButton
