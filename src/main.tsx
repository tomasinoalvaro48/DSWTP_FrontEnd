import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../endpoints.config.ts'
import App from './App.tsx'
import { AuthProvider } from "./auth/AuthContext.tsx"

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
  console.log('Root element not found')
}