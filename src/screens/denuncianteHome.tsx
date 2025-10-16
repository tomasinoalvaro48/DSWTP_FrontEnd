import TheMysteryMachine from '../imagenes/The_Mystery_Machine.jpg'
import Cazafantasmas from '../imagenes/cazafantasmas.jpg'
import CasosWarren from '../imagenes/casos-warren.jpg'
import { Link } from 'react-router-dom'

export function DenuncianteHome() {
  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4 fw-normal">¡Bienvenido! - Cazadores de Anomalias</h2>
      <h3 className="mb-4 fw-normal">No solo Cazamos Fantasmas</h3>

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

      {/* Botón de acción */}
      <Link
        to="/generar-pedido-paso-1"
        className="btn btn-outline-dark px-4 py-2 fs-5 rounded-pill shadow-sm"
      >
        Realizar una denuncia
      </Link>
    </div>
  )
}
