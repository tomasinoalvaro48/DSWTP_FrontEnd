import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './auth/AuthContext.tsx'
import App from './App.tsx'
import '../endpoints.config.ts'
import 'bootstrap/dist/css/bootstrap.min.css'

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