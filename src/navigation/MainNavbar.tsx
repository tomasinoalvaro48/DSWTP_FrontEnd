import { Container, NavLink, Nav, Navbar, NavDropdown } from 'react-bootstrap'

export function MainNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Resolución de Anomalías</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink href="/show-tipo-anomalia">Tipos de Anomalías</NavLink>
            <NavDropdown title="Dropdown" id="nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Configuración
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
