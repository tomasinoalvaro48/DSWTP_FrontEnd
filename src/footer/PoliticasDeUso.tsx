const PoliticasDeUso = () => {
  return (
    <div className="politicas-bg d-flex align-items-start justify-content-center py-5 px-3">
      <div className="overlay"></div>

      <div className="container position-relative text-light">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 bg-dark bg-opacity-75 rounded p-4 shadow">
            <h1 className="mb-4 text-center">Políticas de Uso</h1>

            <p>
              Bienvenido a <strong>Cazadores de Anomalías</strong>. Estas políticas regulan el uso
              de nuestra plataforma. Al utilizar nuestros servicios, aceptás estas condiciones en su
              totalidad.
            </p>

            <h4 className="mt-4">1. Responsabilidad del usuario</h4>
            <p>
              Los usuarios se comprometen a hacer un uso responsable del sistema, evitando el envío
              de reportes falsos o malintencionados. Toda la información debe ser veraz y
              comprobable.
            </p>

            <h4 className="mt-4">2. Privacidad y protección de datos</h4>
            <p>
              Respetamos la privacidad de nuestros usuarios. Los datos personales recopilados serán
              tratados conforme a la legislación vigente y no serán compartidos sin consentimiento.
            </p>

            <h4 className="mt-4">3. Uso adecuado del sistema</h4>
            <p>
              Está prohibido usar la plataforma para difundir contenido ofensivo, fraudulento o
              ajeno al propósito de detección y resolución de anomalías.
            </p>

            <h4 className="mt-4">4. Propiedad intelectual</h4>
            <p>
              Todo el contenido, diseño y código fuente son propiedad de{' '}
              <strong>Cazadores de Anomalías</strong> y no pueden ser copiados sin autorización
              previa.
            </p>

            <h4 className="mt-4">5. Modificaciones</h4>
            <p>
              Nos reservamos el derecho de actualizar estas políticas. Las modificaciones se
              publicarán en esta misma página y entrarán en vigor al momento de su publicación.
            </p>

            <p className="mt-4">
              Para consultas o reclamos, escribinos a{' '}
              <a href="mailto:admin@admin.com" className="text-info">
                admin@admin.com
              </a>
              .
            </p>

            <div className="text-center mt-4 border-top pt-3 text-secondary small">
              © 2025 Cazadores de Anomalías — No solo cazamos fantasmas — Todos los derechos
              reservados.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PoliticasDeUso
