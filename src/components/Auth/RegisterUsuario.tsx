import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../../endpoints.config"
import { get } from "../../api/dataManager.ts"
import type { Zona } from "../../entities/entities.ts"

export function RegisterUsuario() {
  const [form, setForm] = useState({
    nombre_usuario: "",
    email_usuario: "",
    password_usuario: "",
    confir_password: "",
    zona: ""
  })

  const navigate = useNavigate()
  
  const { data: zonas, loading, error } = get<Zona>("zona")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (form.password_usuario !== form.confir_password) {
      alert("Las contraseñas no coinciden")
      return
    }
    
    try {
      await axios.post(`${BACKEND_URL}/api/auth/register-usuario`, form)

      alert("Registro exitoso como usuario, ahora podés iniciar sesión")
      navigate("/login")
    } catch (err: any) {
      alert("Error en registro: " + err.response?.data?.message)
    }
  }

  return (
    <div className="d-flex flex-column bg-light">
      <form 
        className="d-flex flex-column p-4 border rounded bg-light"
        onSubmit={handleSubmit}
      >
        <h2>Registro</h2>
        {loading && <p>Cargando zonas...</p>}
        {error && <p>Error al cargar zonas: {error}</p>}

        <label htmlFor="nombre" className="form-label">
          Nombre y Apellido 
        </label>
        <input
          required
          type="text"
          className="form-control mb-2"
          placeholder="Nombre y Apellido"
          value={form.nombre_usuario}
          onChange={(e) => setForm({ ...form, nombre_usuario: e.target.value })}
          pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
          title="El nombre no puede tener números"
        />

        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          required
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={form.email_usuario}
          onChange={(e) => setForm({ ...form, email_usuario: e.target.value })}
        />

        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <input
          required
          type="password"
          className="form-control mb-2"
          placeholder="Contraseña"
          value={form.password_usuario}
          onChange={(e) => setForm({ ...form, password_usuario: e.target.value })}
          minLength={6}
          title="La contraseña debe tener al menos 6 caracteres"
        />

        <label htmlFor="confir_password" className="form-label">
          Repetir contraseña
        </label>
        <input
          required
          type="password"
          className="form-control mb-2"
          placeholder="Repetir contraseña"
          value={form.confir_password}
          onChange={(e) => setForm({ ...form, confir_password: e.target.value })}
          minLength={6}
          title="Repetí la misma contraseña"
        />

        <label htmlFor="zona" className="form-label">
          Zona 
        </label>
        <select
          className="form-select mb-2"
          id="zona"
          name="zona"
          required
          value={form.zona}
          onChange={(e) => setForm({ ...form, zona: e.target.value })}
        >
          <option value="">Selecciona entre las posibles zonas</option>
          {zonas?.map((zona) => (
            <option key={zona.id} value={zona.id}>
              {zona.nombre_zona} ({zona.localidad.nombre_localidad})
            </option>
          ))}
        </select>

        <button className="btn btn-success" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  )
}
