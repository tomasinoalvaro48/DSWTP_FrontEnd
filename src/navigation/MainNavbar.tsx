import { NavLink, useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useAuth } from '../auth/AuthContext.tsx'
import { NivelCazadorProgress } from '../components/NivelCazadorProgress.tsx'

export function MainNavbar() {
  const { token, logout, userRol } = useAuth()
  const navigate = useNavigate()

  const MoreOptions = () => (
    <NavDropdown title="Más Opciones" id="nav-dropdown" align="end">
      <NavDropdown.Item onClick={() => navigate('/nav-map')}>
        Mapa de Navegación
      </NavDropdown.Item>
      <NavDropdown.Item onClick={() => navigate('/modificar-perfil')}>
        Modificar Perfil
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        onClick={() => {
          logout()
          navigate('/')
        }}
      >
        Cerrar Sesión
      </NavDropdown.Item>
    </NavDropdown>
  )

  const renderNavLinks = () => {
    if (!token) {
      return (
        <>
          <Nav.Link as={NavLink} to="/login">
            Iniciar Sesión
          </Nav.Link>
          <Nav.Link as={NavLink} to="/register-denunciante">
            Registrarse como Denunciante
          </Nav.Link>
          <Nav.Link as={NavLink} to="/register-usuario">
            Registrarse como Cazador
          </Nav.Link>
        </>
      )
    }

    if (userRol === 'operador') {
      return (
        <>
          <Nav.Link as={NavLink} to="/show-tipo-anomalia">
            Tipos de Anomalías
          </Nav.Link>
          <Nav.Link as={NavLink} to="/show-localidad">
            Localidades
          </Nav.Link>
          <Nav.Link as={NavLink} to="/show-zona">
            Zonas
          </Nav.Link>
          <Nav.Link as={NavLink} to="/show-usuario">
            Usuarios
          </Nav.Link>
          <Nav.Link as={NavLink} to="/show-denunciante">
            Denunciantes
          </Nav.Link>
          <Nav.Link as={NavLink} to="/show-pedido">
            Pedidos de Resolución
          </Nav.Link>
          <Nav.Link as={NavLink} to="/tomar-pedidos-agregacion">
            Aprobar Tipos de Anomalías
          </Nav.Link>
          <Nav.Link as={NavLink} to="/approve-usuario">
            Aprobar Cazadores
          </Nav.Link>
          <MoreOptions />
        </>
      )
    }

    if (userRol === 'denunciante') {
      return (
        <>
          <Nav.Link as={NavLink} to="/show-mis-pedidos-denunciante">
            Mis Pedidos
          </Nav.Link>
          <MoreOptions />
        </>
      )
    }

    if (userRol === 'cazador') {
      return (
        <>
          <Nav.Link as={NavLink} to="/show-mis-pedidos">
            Mis Pedidos
          </Nav.Link>
          <Nav.Link as={NavLink} to="/mostrar-posibles-pedidos">
            Posibles Pedidos para tomar
          </Nav.Link>
          <Nav.Link as={NavLink} to="/show-pedidos-agregacion">
            Pedidos de Agregación
          </Nav.Link>
          
          <NivelCazadorProgress />
          
          <MoreOptions />
        </>
      )
    }
  }

  return (
    <Navbar expand="lg" className="bg-light shadow-sm sticky-top">
      <Container fluid className="align-items-center">
        <NavLink to="/" className="d-flex align-items-center text-decoration-none me-3">
          <img src="/logo.png" alt="Logo" width="60" height="60" className="me-2" />
          <span className="fw-bold fs-5 text-dark">Resolución de Anomalías</span>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">{renderNavLinks()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}