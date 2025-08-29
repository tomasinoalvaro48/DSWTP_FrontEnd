import { Container, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router'

export function MainNavbar() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid className="align-items-center">
          <NavLink to="/">
            <div className="bg-secondary" id="navbarBrand">
              Resolución de Anomalías
            </div>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <NavLink to="/show-tipo-anomalia" className="nav-link">
              <div className="navbarOptionTipos">Tipos de Anomalías</div>
            </NavLink>
            <NavLink to="/show-localidad" className="nav-link">
              <div className="navbarOptionTipos">Localidad</div>
            </NavLink>
            <NavDropdown title="" id="nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Configuración
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
