import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext.tsx'
import { postAuth } from '../../api/dataManager.ts'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await postAuth(email, password)
    if (response) {
      login(response.token, response.rol)
      navigate('/')
    } else {
      alert('Credenciales inválidas')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2>Login</h2>
      <input
        required
        type="email"
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        required
        type="password"
        className="form-control mb-2"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary">Ingresar</button>
    </form>
  )
}
