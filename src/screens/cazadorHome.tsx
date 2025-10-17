import { Link } from 'react-router-dom'
import TheMysteryMachine from '../imagenes/The_Mystery_Machine.jpg'
import Cazafantasmas from '../imagenes/cazafantasmas.jpg'
import CasosWarren from '../imagenes/casos-warren.jpg'

export function CazadorHome() {
  return (
    <div className="container mt-5 mb-5">
      <div className="position-relative mb-4" style={{ height: '50px' }}>
        <h3
          className="fw-bold position-absolute top-50 start-50 translate-middle mb-0"
          style={{ fontSize: '1.8rem' }}
        >
          ¡Bienvenido, Cazador!
        </h3>
      </div>

      <div
        id="carouselCazador"
        className="carousel slide mx-auto mb-5 shadow rounded overflow-hidden"
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

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselCazador"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselCazador"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
        <Link
          to="/generar-pedido-agregacion-1"
          className="btn btn-outline-secondary px-3 py-3 fs-6 rounded shadow-sm flex-fill"
        >
          Solicitar agregar una nueva anomalía
        </Link>
        <Link
          to="/show-mis-pedidos"
          className="btn btn-outline-primary px-3 py-3 fs-6 rounded shadow-sm flex-fill"
        >
          Ver mis pedidos
        </Link>
      </div>
    </div>
  )
}