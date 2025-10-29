import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext.tsx'
import { BACKEND_URL } from '../../endpoints.config'

export const NivelCazadorProgress = () => {
  const [nivel, setNivel] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const { token } = useAuth()

  useEffect(() => {
    const fetchNivel = async () => {
      setLoading(true)
      setMessage(null)
      try {
        const res = await axios.get(`${BACKEND_URL}/api/auth/get-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setNivel(res.data.data.nivel_cazador)
      } catch (err: any) {
        setMessage(
          'Error al cargar nivel de cazador: ' + (err.response?.data?.message ?? err.message)
        )
      } finally {
        setLoading(false)
      }
    }
    fetchNivel()
  }, [])

  const nivelCazador = nivel ? parseFloat(nivel) : 1.0
  // Obtener la parte entera (nivel actual) y decimal (progreso)
  const nivelActual = Math.floor(nivelCazador)
  // Redondear la parte decimal a 3 decimales
  let parteDecimal = Math.round((nivelCazador - nivelActual) * 1000) / 1000
  if (nivelActual === 10) {
    parteDecimal = 1
  }
  const progreso = parteDecimal * 100

  return (
    <div className="d-flex align-items-center gap-2 px-3">
      {loading && !message && <span className="text-muted small">Cargando nivel...</span>}
      {message && <div className="text-danger small">{message}</div>}
      {!loading && !message && (
        <>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted small fw-bold">Nivel:</span>
            <span
              className="badge"
              style={{
                backgroundColor: '#9ACD32',
                color: '#fff',
                fontSize: '13px',
                padding: '5px 10px',
              }}
            >
              {nivelActual}
            </span>
          </div>
          <div
            className="progress position-relative"
            style={{
              height: '20px',
              width: '150px',
              backgroundColor: '#e0e0e0',
              border: '2px solid #333',
            }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${progreso}%`,
                backgroundColor: '#9ACD32',
                transition: 'width 0.3s ease',
              }}
              aria-valuenow={progreso}
              aria-valuemin={0}
              aria-valuemax={100}
            />
            <span
              className="position-absolute top-50 start-50 translate-middle fw-bold"
              style={{ fontSize: '11px', color: '#333' }}
            >
              {nivelActual === 10 ? 'MAX' : `${progreso.toFixed(0)}%`}
            </span>
          </div>
        </>
      )}
    </div>
  )
}