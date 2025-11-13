import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../imagenes/logo.png'

export function PublicHome() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="container text-center mt-5 mb-5">
      <div className="text-center">
        <h1 className="fw-bold" style={{ fontSize: '2rem' }}>
          ¡Resolución de Anomalías!
        </h1>
        <h4 className="text-muted mb-3">No solo cazamos fantasmas</h4>
      </div>

      <img src={logoImg} alt="Logo" width="150" height="150" className="d-none d-lg-inline-block" />

      <p className="mt-3 d-none d-lg-block">
        Iniciá sesión para empezar a denunciar o resolver anomalías.
      </p>

      {/* Botones y link */}
      <div
        className="d-flex flex-column align-items-center gap-3 w-100"
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <Link to="/login" className="btn btn-outline-primary w-100 py-3 fs-6 rounded shadow-sm">
          Iniciar sesión
        </Link>

        <Link
          to="/register-denunciante"
          className="btn btn-outline-danger w-100 py-3 fs-6 rounded shadow-sm"
        >
          Hacer una denuncia
        </Link>
        <div className="text-end w-100">
          <Link
            to="/register-usuario"
            className="text-secondary text-decoration-none fw-semibold small"
          >
            Quiero ser cazador
          </Link>
        </div>
      </div>
    </div>
  )
}
