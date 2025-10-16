import { Link } from 'react-router-dom'
import TheMysteryMachine from '../imagenes/The_Mystery_Machine.jpg'
import Cazafantasmas from '../imagenes/cazafantasmas.jpg'
import CasosWarren from '../imagenes/casos-warren.jpg'

export function AdminHome() {
  return (
    <div className="container mt-5 mb-5">
      <div className="position-relative mb-4" style={{ height: '60px' }}>
        <Link
          to="/show-pedido"
          className="btn btn-outline-dark px-3 py-2 fs-6 rounded shadow-sm position-absolute start-0 top-50 translate-middle-y"
          style={{ minWidth: '220px' }}
        >
          Ver pedidos de resolución
        </Link>

        <h2 className="fw-bold position-absolute top-50 start-50 translate-middle mb-0" style={{ fontSize: '2rem' }}>
          ¡Bienvenido, Operador!
        </h2>

        <Link
          to="/tomar-pedidos-agregacion"
          className="btn btn-outline-success px-3 py-2 fs-6 rounded shadow-sm position-absolute end-0 top-50 translate-middle-y"
          style={{ minWidth: '220px' }}
        >
          Ver pedidos de agregación pendientes
        </Link>
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

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselCazador" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselCazador" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <div className="mb-4">
        <h5 className="fw-semibold mb-3 text-center">Administrar entidades:</h5>
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
          <Link
            to="/show-tipo-anomalia"
            className="btn btn-outline-primary px-3 py-3 fs-6 rounded shadow-sm flex-fill"
          >
            Tipo de anomalía
          </Link>
          <Link
            to="/show-denunciante"
            className="btn btn-outline-secondary px-3 py-3 fs-6 rounded shadow-sm flex-fill"
          >
            Denunciantes
          </Link>
          <Link
            to="/show-localidad"
            className="btn btn-outline-info px-3 py-3 fs-6 rounded shadow-sm flex-fill"
          >
            Localidades
          </Link>
          <Link
            to="/show-zona"
            className="btn btn-outline-warning px-3 py-3 fs-6 rounded shadow-sm flex-fill"
          >
            Zonas
          </Link>
          <Link
            to="/show-usuario"
            className="btn btn-outline-success px-3 py-3 fs-6 rounded shadow-sm flex-fill"
          >
            Usuarios
          </Link>
        </div>
      </div>
    </div>
  )
}