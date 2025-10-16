import { get, patch, getFilter } from '../../api/dataManager.ts'
import type { PedidoResolucion, Localidad } from '../../entities/entities.ts'
import { Accordion, Spinner, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react' // <-- Agregado useEffect

export function ShowPosiblesPedidos() {
  //para busqueda para tomar pedido
  const estado_pedido_resolucion = 'solicitado'

  const { data: localidades, loading: loadingLoc, error: errorLoc } = get<Localidad>('localidad')

  const handleCambioLocalidad = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const loc_id = event.target.value
    const loc = localidades.find((l) => l.id === loc_id)
    setLocalidadSeleccionada(loc)
  }
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState<Localidad>()

  const navigate = useNavigate()

  const [dificultadFilter, setDificultadFilter] = useState(0)
  const [dificultadMostrada, setDificultadMostrada] = useState(dificultadFilter) // <-- Nuevo estado
  const [errorTakePedido, setErrorTakePedido] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDificultadMostrada(dificultadFilter)
    }, 200) // 300 ms de delay

    return () => clearTimeout(timer)
  }, [dificultadFilter])

  // estado inicial: pedidos con estado solicitado
  const [query, setQuery] = useState(
    `pedido_resolucion?estado_pedido_resolucion=${estado_pedido_resolucion}`
  )

  let {
    data: pedido_resolucion,
    loading: pedido_resolucion_loading,
    error: pedido_resolucion_error,
  } = getFilter<PedidoResolucion>(query)

  // función buscar (armando params dinámicamente)
  const haddleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = new URLSearchParams()
    params.append('estado_pedido_resolucion', estado_pedido_resolucion)

    if (dificultadFilter > 0) {
      params.append('dificultad_pedido_resolucion', dificultadFilter.toString())
    }

    if (localidadSeleccionada?.zonas) {
      localidadSeleccionada.zonas.forEach((zona: any) => {
        params.append('zonas', zona.id.toString())
      })
    }

    setQuery(`pedido_resolucion?${params.toString()}`)
    console.log('Query generada:', `pedido_resolucion?${params.toString()}`)
  }

  const haddleTakePedido = async (pedido: PedidoResolucion) => {
    setErrorTakePedido(null)
    try {
      patch(`pedido_resolucion/tomar-pedido-resolucion/${pedido.id}`)
      navigate('/mostrar-posibles-pedidos') // La idea es que dps te dirija a mis pedidos esto es temporal
    } catch (err: any) {
      console.error('Error al tomar el pedido:', err)
      setErrorTakePedido(err?.response?.data?.message ?? 'Error al tomar el pedido.')
    }
  }

  return (
    <div className="ShowPosiblesPedidos">
      {loadingLoc && (
        <div className="d-flex align-items-center">
          <Spinner animation="border" role="status" size="sm" className="me-2" />
          <span>Cargando localidades...</span>
        </div>
      )}
      {errorLoc && <Alert variant="danger">Error al cargar pedidos: {errorLoc}</Alert>}
      {errorTakePedido && <Alert variant="warning">{errorTakePedido}</Alert>}

      {!loadingLoc && !errorLoc && (localidades?.length ?? 0) > 0 && (
        <nav className="navbar bg-body-tertiary px-3">
          <h1 className="me-auto">Posibles Pedidos Resolucion</h1>

          <form className="d-flex align-items-center gap-3" onSubmit={haddleSearch}>
            {/* Slider de dificultad */}
            <div className="d-flex align-items-center">
              <label htmlFor="dificultad" className="me-2 mb-0 strong">
                <strong> Dificultad: </strong>
              </label>
              <span className="ms-2" style={{ minWidth: '100px', display: 'inline-block' }}>
                {dificultadMostrada === 0 ? 'No seleccionada' : dificultadMostrada}
              </span>
              <input
                id="dificultad"
                type="range"
                min="0"
                max="10"
                step="1"
                value={dificultadFilter}
                onChange={(e) => setDificultadFilter(parseInt(e.target.value))}
                className="form-range dificultad-slider"
                style={{
                  width: '120px',
                  height: '4px',
                  accentColor: '#0d6efd',
                }}
              />
            </div>

            {/* Selector de localidad */}
            <select
              className="form-select"
              id="localidad"
              name="localidad"
              value={localidadSeleccionada?.id}
              onChange={handleCambioLocalidad}
            >
              <option value="">Seleccionar localidad</option>
              {localidades?.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.nombre_localidad}
                </option>
              ))}
            </select>

            {/* Botón buscar */}
            <button className="btn btn-success" type="submit">
              Search
            </button>
          </form>
        </nav>
      )}

      {pedido_resolucion_loading && (
        <div className="d-flex align-items-center">
          <Spinner animation="border" role="status" size="sm" className="me-2" />
          <span>Cargando pedidos...</span>
        </div>
      )}
      {pedido_resolucion_error && (
        <Alert variant="danger">Error al cargar pedidos: {pedido_resolucion_error}</Alert>
      )}

      {!pedido_resolucion_loading && !pedido_resolucion_error && pedido_resolucion && (
        <div className="accordion my-3 mx-4">
          <Accordion>
            {pedido_resolucion?.map((unPedido) => (
              <Accordion.Item eventKey={unPedido.id.toString()} key={unPedido.id}>
                <Accordion.Header>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <div>
                      <strong>Localidad: </strong> {unPedido.zona.localidad.nombre_localidad} <br />
                      <strong>Zona: </strong> {unPedido.zona.nombre_zona}
                    </div>

                    <div>
                      <strong>Dificultad: </strong> {unPedido.dificultad_pedido_resolucion}
                    </div>

                    <div>
                      <strong>Fecha Realiz: </strong>{' '}
                      {new Date(unPedido.fecha_pedido_resolucion).toLocaleDateString('es-AR')}
                    </div>

                    <div>Detalle</div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="container">
                    <div className="row text-start">
                      <div className="col-md-6">
                        <ul>
                          <strong>Direccion: </strong>
                          {unPedido.direccion_pedido_resolucion}
                        </ul>
                        <ul>
                          <strong>Denunciante: </strong>
                          {unPedido.denunciante.nombre_apellido_denunciante}
                        </ul>
                        <ul>
                          <strong>Denunciante Email: </strong>
                          {unPedido.denunciante.email_denunciante}
                        </ul>
                        <ul>
                          <strong>Denunciante Telefono: </strong>
                          {unPedido.denunciante.telefono_denunciante}
                        </ul>
                        <ul>
                          <strong>Denunciante Telefono: </strong>
                          {unPedido.denunciante.telefono_denunciante}
                        </ul>
                      </div>

                      <div className="col-md-6">
                        <ul>
                          <strong>Anomalías:</strong>
                          {unPedido.anomalias.map((unaAnomalia) => (
                            <ul key={unaAnomalia.id}>
                              <strong>Nombre Anomalia: </strong>
                              {unaAnomalia.tipo_anomalia.nombre_tipo_anomalia}
                              <strong> Dificultad Anomalia: </strong>
                              {unaAnomalia.tipo_anomalia.dificultad_tipo_anomalia}
                            </ul>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="row text-start align-items-center">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => haddleTakePedido(unPedido)}
                      >
                        Tomar Pedido
                      </button>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      )}

      {pedido_resolucion_loading && <div>Cargando...</div>}
      {pedido_resolucion_error && <div>{pedido_resolucion_error}</div>}
    </div>
  )
}
