import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../../endpoints.config"

export function RegisterDenunciante() {
  const [form, setForm] = useState({
    nombre_apellido_denunciante: "",
    telefono_denunciante: "",
    email_denunciante: "",
    password_denunciante: "",
    confir_password: ""
  })

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`${BACKEND_URL}/api/auth/register-denunciante`, form)
      alert("Registro exitoso, ahora podés iniciar sesión")
      navigate("/login")
    } catch (err: any) {
      alert("Error en registro: " + err.response?.data?.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2>Registro</h2>
      <input required type="text" className="form-control mb-2" placeholder="Nombre y apellido"
        value={form.nombre_apellido_denunciante}
        onChange={(e) => setForm({ ...form, nombre_apellido_denunciante: e.target.value })}
        pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$" title="El nombre no puede tener números"
      />
      <input required type="text" className="form-control mb-2" placeholder="Teléfono"
        value={form.telefono_denunciante}
        onChange={(e) => setForm({ ...form, telefono_denunciante: e.target.value })}
        pattern="^[0-9]+$" title="El teléfono no puede tener letras ni espacios"        
      />
      <input required type="email" className="form-control mb-2" placeholder="Email"
        value={form.email_denunciante}
        onChange={(e) => setForm({ ...form, email_denunciante: e.target.value })}
      />
      <input required type="password" className="form-control mb-2" placeholder="Contraseña"
        value={form.password_denunciante}
        onChange={(e) => setForm({ ...form, password_denunciante: e.target.value })}
      />

      <input required type="password" className="form-control mb-2" placeholder="Confirmar contraseña"
        value={form.confir_password}   // 👈 ahora correcto
        onChange={(e) => setForm({ ...form, confir_password: e.target.value })}
      />

      <button className="btn btn-success">
        Registrarse
      </button>
    </form>
  )
}