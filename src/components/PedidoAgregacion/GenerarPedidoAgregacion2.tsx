import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { post } from '../../api/dataManager'
import ModalAlert from '../ModalAlert.tsx'

export function GenerarPedidoAgregacion2() {
  const navigate = useNavigate()
  const location = useLocation()

  const pedidoPaso1 = location.state as {
    descripcion_pedido_agregacion: string
    dificultad_pedido_agregacion: number
  }

  const [evidencias, setEvidencias] = useState<
    { url_evidencia?: string; archivo_evidencia?: File | null }[]
  >([])
  const [url, setUrl] = useState('')
  const [archivo, setArchivo] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [showModalAlert, setShowModalAlert] = useState(false)

  const handleAddEvidencia = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url && !archivo) {
      setError('Debes ingresar al menos una URL o subir un archivo.')
      return
    }
    setError('')
    setEvidencias([...evidencias, { url_evidencia: url, archivo_evidencia: archivo }])
    setUrl('')
    setArchivo(null)
    const fileInput = document.getElementById('archivoInput') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (evidencias.length === 0) {
      setShowModalAlert(true)
      return
    }

    const formData = new FormData()
    formData.append('descripcion_pedido_agregacion', pedidoPaso1.descripcion_pedido_agregacion)
    formData.append(
      'dificultad_pedido_agregacion',
      pedidoPaso1.dificultad_pedido_agregacion.toString()
    )

    // Evidencias con URL
    const evidenciasConUrl = evidencias
      .filter((ev) => ev.url_evidencia)
      .map((ev) => ({ url_evidencia: ev.url_evidencia }))

    formData.append('evidencias', JSON.stringify(evidenciasConUrl))

    // Evidencias con archivos
    evidencias
      .filter((ev) => ev.archivo_evidencia)
      .forEach((ev) => formData.append('archivos', ev.archivo_evidencia as File))

    const token = localStorage.getItem('token')

    try {
      await post('pedido_agregacion', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      navigate('/show-pedidos-agregacion')
    } catch (err) {
      console.error(err)
      alert('Error al generar el pedido.')
    }
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex flex-column bg-light p-4 border rounded shadow-sm">
            <div className="text-center mb-2">
              <h2 className="mb-0">Generar Pedido de Agregación - Paso 2</h2>
            </div>

            {showModalAlert && (
              <ModalAlert
                setShowModalAlert={setShowModalAlert}
                title="Debes cargar al menos una evidencia"
                body="Para generar un pedido de agregación, es necesario agregar al menos una evidencia."
              />
            )}

            <div className="mb-4 text-end">
              <Link to="/show-pedidos-agregacion" className="btn btn-outline-secondary">
                Volver
              </Link>
            </div>

            <form onSubmit={handleAddEvidencia} className="d-flex flex-column mb-4">
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
                  id="archivoInput"
                  type="file"
                  className="form-control"
                  onChange={(e) => setArchivo(e.target.files ? e.target.files[0] : null)}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                + Agregar evidencia
              </button>

              {error && <div className="text-danger mt-2">{error}</div>}
            </form>

            <h4 className="mb-3 text-center">Evidencias cargadas</h4>

            {evidencias.length === 0 ? (
              <p className="text-muted fst-italic text-center">Aún no se agregaron evidencias.</p>
            ) : (
              <ul className="list-group mb-4">
                {evidencias.map((ev, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex flex-column">
                      {ev.url_evidencia && (
                        <a
                          href={ev.url_evidencia}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-underline"
                        >
                          {ev.url_evidencia}
                        </a>
                      )}
                      {ev.archivo_evidencia && (
                        <span className="text-muted">
                          {ev.archivo_evidencia instanceof File
                            ? ev.archivo_evidencia.name
                            : ev.archivo_evidencia}
                        </span>
                      )}
                    </div>
                    <span className="badge bg-light text-dark">#{idx + 1}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="row gy-2 justify-content-between mt-3">
              <div className="col-12 col-md-5">
                <Link to="/show-pedidos-agregacion" className="btn btn-outline-danger w-100">
                  Cancelar
                </Link>
              </div>
              <div className="col-12 col-md-5">
                <button className="btn btn-success w-100" onClick={handleSubmit} type="button">
                  Confirmar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}