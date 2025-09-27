import React, { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { post } from "../../api/dataManager"

export function GenerarPedidoAgregacion2() {
  const navigate = useNavigate()
  const location = useLocation()

  const pedidoPaso1 = location.state as {
    descripcion_pedido_agregacion: string
    dificultad_pedido_agregacion: string
    evidencias: { url?: string; archivo?: string }[]
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

  const handleConfirmar = () => {
    if (evidencias.length === 0) {
      alert("Debes cargar al menos una evidencia.");
      return;
    }

    const pedidoCompleto = { ...pedidoPaso1, evidencias }
    post("pedido_agregacion", pedidoCompleto)
    navigate("/show-pedidos-agregacion")
  }

  return (
    <div className="d-flex flex-column bg-light p-4 border rounded">
      <h1>Generar Pedido de Agregación - Paso 2</h1>

      <form onSubmit={handleAddEvidencia} className="mb-3">
        <label>
            URL evidencia
        </label>

        <input type="text" value={url} className="form-control" placeholder="http://..."
        onChange={(e) => setUrl(e.target.value)}/>

        <label className="mt-2">
            Archivo evidencia
        </label>

        <input type="text" value={archivo} className="form-control" placeholder="Nombre de archivo (falta implementar archivo adjunto)"
        onChange={(e) => setArchivo(e.target.value)}/>

        <button type="submit" className="btn btn-primary mt-2">
          Agregar evidencia
        </button>

        {error && <div className="text-danger mt-2">{error}</div>}
      </form>

      <h3>Evidencias cargadas:</h3>

      <ul className="list-group mb-3">
        {evidencias.map((ev, idx) => (
          <li key={idx} className="list-group-item">
            {ev.url_evidencia && <span>{ev.url_evidencia}</span>} {ev.archivo_evidencia && <span>{ev.archivo_evidencia}</span>}
          </li>
        ))}
      </ul>

      <button className="btn btn-success" onClick={handleConfirmar}>
        Confirmar Pedido
      </button>

      <Link to="/show-pedidos-agregacion" className="btn btn-secondary ms-2">
        Cancelar
      </Link>
    </div>
  )
}