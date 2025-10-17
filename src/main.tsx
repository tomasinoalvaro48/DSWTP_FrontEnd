import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../endpoints.config.ts'
import App from './App.tsx'
import { AuthProvider } from './auth/AuthContext.tsx'

// Importar estilos Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// Importar scripts Bootstrap (necesarios para el carrusel)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  )
} else {
  throw new Error('Root element not found')
}
