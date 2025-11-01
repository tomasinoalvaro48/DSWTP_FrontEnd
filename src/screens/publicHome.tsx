import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function PublicHome() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  
  return (
    <div className="container text-center mt-5 mb-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold mb-2" style={{ fontSize: '2rem' }}>
          ¡Bienvenido a Cazadores de Anomalías!
        </h1>
        <h4 className="text-muted mb-3">No solo cazamos fantasmas</h4>
      </div>

      <img src="/logo.png" alt="Logo" width="250" height="250" className="mb-4" />

      <p className="mb-4">Iniciá sesión para empezar a denunciar o resolver anomalías.</p>

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
          className="btn btn-outline-secondary w-100 py-3 fs-6 rounded shadow-sm"
        >
          Quiero registrarme y hacer una denuncia
        </Link>
        <div className="text-end w-100 mt-2">
          <Link to="/register-usuario" className="text-success text-decoration-none fw-semibold">
            Quiero ser cazador
          </Link>
        </div>
      </div>
    </div>
  )
}