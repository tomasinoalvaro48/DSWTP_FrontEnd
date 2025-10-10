import React, { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { post } from "../../api/dataManager"

export function GenerarPedidoAgregacion2() {
  const navigate = useNavigate()
  const location = useLocation()

  const pedidoPaso1 = location.state as {
    descripcion_pedido_agregacion: string
    dificultad_pedido_agregacion: number
  }

  const [evidencias, setEvidencias] = useState<{ url_evidencia?: string; archivo_evidencia?: string }[]>([])
  const [url, setUrl] = useState("")
  const [archivo, setArchivo] = useState("")
  const [error, setError] = useState("")

  const handleAddEvidencia = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url && !archivo) {
      setError("Debes ingresar al menos una URL o un archivo.")
      return
    }
    setError("")
    setEvidencias([...evidencias, { url_evidencia: url, archivo_evidencia: archivo }])
    setUrl("")
    setArchivo("")
  }

  const handleSubmit = () => {
    if (evidencias.length === 0) {
      alert("Debes cargar al menos una evidencia.")
      return
    }

    const pedidoCompleto = { ...pedidoPaso1, evidencias }

    const token = localStorage.getItem("token")
    post("pedido_agregacion", pedidoCompleto, {
      headers: { Authorization: `Bearer ${token}` },
    })
    navigate("/show-pedidos-agregacion")
  }

  return (
    <div className="container my-4">
      <div className="bg-white p-4 rounded shadow-sm border">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Generar Pedido de Agregación - Paso 2</h2>
          <Link to="/show-pedidos-agregacion" className="btn btn-outline-secondary">
            Volver
          </Link>
        </div>

        <form onSubmit={handleAddEvidencia} className="mb-4">
          <div className="mb-3">
            <label className="form-label fw-bold">URL de evidencia</label>
            <input
              type="text"
              value={url}
              className="form-control"
              placeholder="https://ejemplo.com/evidencia"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Archivo de evidencia</label>
            <input
              type="text"
              value={archivo}
              className="form-control"
              placeholder="Nombre de archivo (por ahora texto)"
              onChange={(e) => setArchivo(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            + Agregar evidencia
          </button>

          {error && <div className="text-danger mt-2">{error}</div>}
        </form>

        <h4 className="mb-3">Evidencias cargadas</h4>
        {evidencias.length === 0 ? (
          <p className="text-muted fst-italic">Aún no se agregaron evidencias.</p>
        ) : (
          <ul className="list-group mb-4">
            {evidencias.map((ev, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  {ev.url_evidencia && (
                    <a href={ev.url_evidencia} target="_blank" rel="noopener noreferrer" className="text-decoration-underline">
                      {ev.url_evidencia}
                    </a>
                  )}
                  {ev.archivo_evidencia && <span>{ev.archivo_evidencia}</span>}
                </div>
                <span className="badge bg-light text-dark">#{idx + 1}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="d-flex justify-content-end gap-3">
          <button className="btn btn-success px-4" onClick={handleSubmit}>
            Confirmar Pedido
          </button>

          <Link to="/show-pedidos-agregacion" className="btn btn-outline-danger px-4">
            Cancelar
          </Link>
        </div>
      </div>
    </div>
  )
}