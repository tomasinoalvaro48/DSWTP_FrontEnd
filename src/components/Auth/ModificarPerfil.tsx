import { useNavigate } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { useAuth } from '../../auth/AuthContext.tsx'

export function ModificarPerfil() {
  const navigate = useNavigate()
  const { userRol } = useAuth()

  return (
    <div className="container mt-5">
      <Card className="shadow-lg border-0 p-4 rounded-4 bg-light">
        <h3 className="text-center fw-bold mb-4 text-primary">
          Modificar Perfil
        </h3>

        <p className="text-center text-muted mb-4">
          Para administrar la configuración de tu cuenta, elegí una opción:
        </p>

        <div className="d-flex flex-column align-items-center gap-3">
          <Button
            variant="outline-primary"
            className="w-75 py-2 fw-semibold"
            onClick={() => navigate('/change-password')}
          >
            Cambiar Contraseña
          </Button>

          <Button
            variant="outline-success"
            className="w-75 py-2 fw-semibold"
            onClick={() => navigate('/update-profile')}
          >
            Actualizar mis datos personales
          </Button>

          {(userRol === 'cazador' || userRol === 'denunciante') && (
            <Button
              variant="outline-danger"
              className="w-75 py-2 fw-semibold"
              onClick={() => navigate('/delete-account')}
            >
              Eliminar Cuenta
            </Button>
          )}
        </div>

        <div className="text-center mt-4">
          <Button
            variant="secondary"
            className="px-4"
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>
        </div>
      </Card>
    </div>
  )
}