import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import TheMysteryMachine from '../imagenes/The_Mystery_Machine.jpg'
import Cazafantasmas from '../imagenes/cazafantasmas.jpg'
import CasosWarren from '../imagenes/casos-warren.jpg'

export function CazadorHome() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="container text-center mt-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold" style={{ fontSize: '2rem' }}>
          ¡Bienvenido Cazador!
        </h1>
        <h4 className="text-muted mb-4">Resolvé anomalías y subí de nivel</h4>

        {/* Botones de acción */}
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-4">
          <Link
            to="/mostrar-posibles-pedidos"
            className="btn btn-lg px-5 py-3 shadow-sm"
            style={{
              borderRadius: '50px',
              backgroundColor: '#16911eff',
              color: 'white',
              border: '1.5px solid #000',
              boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            <i className="bi bi-search me-2"></i>
            Tomar un Pedido
          </Link>
          <Link
            to="/show-mis-pedidos"
            className="btn btn-lg btn-outline-secondary px-5 py-3 shadow-sm"
            style={{
              borderRadius: '50px',
            }}
          >
            <i className="bi bi-clipboard-check me-2"></i>
            Mis Pedidos
          </Link>
        </div>
        <div className="text-center mt-4">
          <Link
            to="/generar-pedido-agregacion-1"
            className="btn btn-outline-secondary px-4 py-2 rounded-pill shadow-sm"
          >
            <i className="bi bi-plus-circle me-2"></i>
            Solicitar agregar una nueva anomalía
          </Link>
        </div>
      </div>

      {/* Contenedor del carrusel */}
      <div
        id="carouselCazador"
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
    </div>
  )
}
