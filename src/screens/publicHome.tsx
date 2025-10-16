import { Link } from 'react-router-dom'

export function PublicHome() {
  return (
    <div className="container text-center mt-5 mb-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold mb-2" style={{ fontSize: '2rem' }}>
          ¡Bienvenido a Cazadores de Anomalías!
        </h2>
        <h4 className="text-muted mb-3">No solo cazamos fantasmas</h4>
      </div>

      <img src="/logo.png" alt="Logo" width="300" height="300" className="me-5 mb-4" />
      <p className="mb-4">
        Registrate o iniciá sesión para empezar a denunciar o resolver anomalías.
      </p>
      
      <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
        <Link
          to="/login"
          className="btn btn-outline-primary px-4 py-3 fs-6 rounded shadow-sm flex-fill"
        >
          Iniciar sesión
        </Link>
        <Link
          to="/register-denunciante"
          className="btn btn-outline-success px-4 py-3 fs-6 rounded shadow-sm flex-fill"
        >
          Quiero hacer una denuncia
        </Link>
        <Link
          to="/register-usuario"
          className="btn btn-outline-dark px-4 py-3 fs-6 rounded shadow-sm flex-fill"
        >
          Quiero ser cazador
        </Link>
      </div>
    </div>
  )
}