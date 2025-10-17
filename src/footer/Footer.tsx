import { Link } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'

export function Footer() {
  return (
    <footer className="bg-light border-top mt-5">
      <div className="container py-4">
        <div className="row gy-4">
          {/* Mapa */}
          <div className="col-12 col-lg-4">
            <h5 className="mb-3">Ubicación Headquarters</h5>
            <p>Al lado del Caldero Chorreante - Minas Tirith - Gondor</p>
            <div className="ratio ratio-16x9 rounded shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29334.557!2d-60.6393!3d-32.9468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab2f7c2b1b5d%3A0x0!2sRosario%2C%20Santa%20Fe%2C%20Argentina!5e0!3m2!1ses!2sar!4v1618360948292!5m2!1ses!2sar"
                title="Mapa de ubicación"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="col-12 col-lg-4">
            <h5 className="mb-3">Contáctanos</h5>
            <p className="mb-1">📧 admin@admin.com</p>
            <p className="mb-1">
              <Link to="/politicas" className="text-decoration-none text-dark">
                Políticas de uso
              </Link>
            </p>
            <p className="mb-1">
              <Link to="/sobre-nosotros" className="text-decoration-none text-dark">
                Sobre nosotros
              </Link>
            </p>
          </div>

          {/* Redes sociales */}
          <div className="col-12 col-lg-4">
            <h5 className="mb-3">Seguinos</h5>
            <div className="d-flex flex-column gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark text-decoration-none d-flex align-items-center gap-2"
              >
                <i className="bi bi-instagram fs-4"></i>
                <span>@CazaAnomalias</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark text-decoration-none d-flex align-items-center gap-2"
              >
                <i className="bi bi-facebook fs-4"></i>
                <span>/CazaAnomalias</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark text-decoration-none d-flex align-items-center gap-2"
              >
                <i className="bi bi-twitter fs-4"></i>
                <span>@CazaAnomalias</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="bg-white border-top text-center py-3 mt-3">
        <small className="text-muted">
          © 2025 Cazadores de Anomalías — No solo cazamos fantasmas — Todos los derechos
          reservados.
        </small>
      </div>
    </footer>
  )
}

export default Footer
