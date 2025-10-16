import { Container, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.tsx'

export function MainNavbar() {
  const { token, logout, userRol } = useAuth()
  const navigate = useNavigate()

  const MoreOptions = () => {
    return (
      <NavDropdown title="Más Opciones" id="nav-dropdown" className="ms-auto m-3">
        <NavDropdown.Item onClick={() => navigate('/nav-map')}>Mapa de Navegación</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.1">Configuración</NavDropdown.Item>
        <NavDropdown.Item onClick={() => navigate('/change-password')}>
          Cambiar Contraseña
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => navigate('/update-profile')}>
          Editar perfil
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => navigate('/delete-account')}>
          Eliminar cuenta   {/*ver para que no le aparezca al operador*/}
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
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-secondary border">
        <Container fluid className="align-items-center">
          <NavLink to="/" className="d-flex align-items-center text-decoration-none">
            <img src="/logo.png" alt="Logo" width="70" height="70" className="me-3" />
            <h4 className="" id="navbarBrand">
              Resolución de Anomalías
            </h4>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {token && userRol == 'operador' && (
              <>
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
                <NavLink to="/show-pedido" className="nav-link m-3 p-0">
                  <div className="navbarOptionTipos">Pedidos</div>
                </NavLink>
                <NavLink to="/mostrar-posibles-pedidos" className="nav-link m-3 p-0">
                  <div className="navbarOptionTipos">Pedidos para Cazador</div>
                </NavLink>
                <NavLink to="/show-pedidos-agregacion" className="nav-link m-3 p-0">
                  <div className="navbarOptionTipos">Pedidos de Agregacion</div>
                </NavLink>
                <NavLink to="/tomar-pedidos-agregacion" className="nav-link m-3 p-0">
                  <div className="navbarOptionTipos">Aceptar/Rechazar Pedidos de Agregacion</div>
                </NavLink>
                <MoreOptions />
              </>
            )}
            {!token && (
              <>
                <NavLink to="/login" className="nav-link ms-auto m-3 p-0">
                  <div className="navbarOptionTipos">Iniciar Sesión</div>
                </NavLink>
                <NavLink to="/register-denunciante" className="nav-link m-3 p-0">
                  <div className="navbarOptionTipos">Registrarse como Denunciante</div>
                </NavLink>
                <NavLink to="/register-usuario" className="nav-link m-3 p-0">
                  <div className="navbarOptionTipos">Registrarse como Cazador</div>
                </NavLink>
              </>
            )}
            {token && userRol == 'denunciante' && (
              <>
                {/*

                <NavLink to="/show-pedido" className="nav-link m-3 p-0">
                  <div className="navbarOptionTipos">Pedidos</div>
                </NavLink>
                */}

                <NavLink to="/show-mis-pedidos-denunciante" className="nav-link m-3 p-0">
                  <div className="navbarOptionTipos">Mis Pedidos</div>
                </NavLink>
                <MoreOptions />
              </>
            )}
            {token && userRol == 'cazador' && (
              <>
                <NavLink to="/mostrar-posibles-pedidos" className="nav-link m-3 p-0">
                  <div className="navbarOptionTipos">Posibles Pedidos</div>
                </NavLink>
                <NavLink to="/show-pedidos-agregacion" className="nav-link m-3 p-0">
                  <div className="navbarOptionTipos">Pedidos de Agregacion</div>
                </NavLink>
                <NavLink to="/show-mis-pedidos" className="nav-link m-3 p-0">
                  <div className="navbarOptionTipos">Mis Pedidos</div>
                </NavLink>
                <MoreOptions />
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
