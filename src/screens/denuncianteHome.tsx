import TheMysteryMachine from '../imagenes/The_Mystery_Machine.jpg'
import Cazafantasmas from '../imagenes/cazafantasmas.jpg'
import CasosWarren from '../imagenes/casos-warren.jpg'
import { Link } from 'react-router-dom'

export function DenuncianteHome() {
  return (
    <div className="container text-center mt-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold mb-2" style={{ fontSize: '2rem' }}>
          ¡Bienvenido a Cazadores de Anomalías!
        </h1>
        <h4 className="text-muted mb-4">No solo cazamos fantasmas</h4>

        {/* Botón de acción */}
        <Link
          to="/generar-pedido-paso-1"
          className="btn btn-lg px-5 py-3 mb-4 shadow-sm"
          style={{
            borderRadius: '50px',
            background:
              'linear-gradient(135deg, rgba(154, 205, 50, 0.9) 0%, rgba(154, 205, 50, 0.7) 100%)',
            color: 'white',
            border: '1.5px solid #000',
            boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
          }}
        >
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Realizar una Denuncia
        </Link>
      </div>

      {/* Contenedor del carrusel */}
      <div
        id="carouselDenunciante"
        className="carousel slide mx-auto mb-4 shadow rounded overflow-hidden"
        data-bs-ride="carousel"
        style={{ maxWidth: '700px' }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={TheMysteryMachine}
              className="d-block w-100"
              alt="The Mystery Machine"
              style={{ borderRadius: '10px', height: '400px', objectFit: 'cover' }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={Cazafantasmas}
              className="d-block w-100"
              alt="Cazafantasmas"
              style={{ borderRadius: '10px', height: '400px', objectFit: 'cover' }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={CasosWarren}
              className="d-block w-100"
              alt="Los Warren enfrentando a un fantasma"
              style={{ borderRadius: '10px', height: '400px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Controles del carrusel */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselDenunciante"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselDenunciante"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  )
}
