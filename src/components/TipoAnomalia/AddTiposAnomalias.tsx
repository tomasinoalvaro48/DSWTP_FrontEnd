import { useState } from 'react'
import { Row, Form, Col, Button, Tab } from 'react-bootstrap'
import { post } from '../../api/postManager.ts'
//import { useNavigate } from 'react-router'

export function AddTiposAnomalias() {
  const [validated, setValidated] = useState(false)
  const [tipoNuevo, setTipoNuevo] = useState({
    nombre_tipo_anomalia: '',
    dificultad_tipo_anomalia: 0,
  })

  //const navigate = useNavigate()

  const handleSubmit = (event: any) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      setValidated(true)
      post('tipoanomalia', tipoNuevo, 'show-tipo-anomalia')
    }
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nombre"
            onChange={(e) => {
              setTipoNuevo({
                ...tipoNuevo,
                nombre_tipo_anomalia: e.target.value,
              })
            }}
          />
          <Form.Control.Feedback>Sin Error</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Dificultad</Form.Label>
          <Tab.Container id="list-group-tabs">
            <Row>
              <Col sm={4}>
                <Form.Check
                  label="Fácil"
                  name="inline-radio"
                  type="radio"
                  id="inline-radio-facil"
                  value={1}
                />
                <Form.Check
                  label="Media"
                  name="inline-radio"
                  type="radio"
                  id="inline-radio-media"
                  value={2}
                />
                <Form.Check
                  label="Difícil"
                  name="inline-radio"
                  type="radio"
                  id="inline-radio-dificil"
                  value={3}
                />
              </Col>
            </Row>
          </Tab.Container>
          <Form.Control.Feedback>Sin Error</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit">
        Cargar Tipo
      </Button>
    </Form>
  )
}
