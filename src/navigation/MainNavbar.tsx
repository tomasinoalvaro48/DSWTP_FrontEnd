import { Container, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router'

export function MainNavbar() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-secondary border">
        <Container fluid className="align-items-center">
          <NavLink to="/">
            <h4 className="" id="navbarBrand">
              Resolución de Anomalías
            </h4>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <NavLink to="/show-tipo-anomalia" className="nav-link m-3 p-0">
              <div className="navbarOptionTipos">Tipos de Anomalías</div>
            </NavLink>
            <NavLink to="/show-denunciante" className="nav-link m-3 p-0">
              <div className="navbarOptionTipos">Denunciantes</div>
            </NavLink>
            <NavLink to="/show-localidad" className="nav-link m-3 p-0">
              <div className="navbarOptionTipos">Localidades</div>
            </NavLink>
            <NavLink to="/show-zona" className="nav-link m-3 p-0">
              <div className="navbarOptionTipos">Zonas</div>
            </NavLink>
            <NavLink to="/show-usuario" className="nav-link m-3 p-0">
              <div className="navbarOptionTipos">Usuarios</div>
            </NavLink>
            <NavDropdown
              title="Más Opciones"
              id="nav-dropdown"
              className="ms-auto m-3"
            >
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
