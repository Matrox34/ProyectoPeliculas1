"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { apiRequest } from "@/lib/api"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Completa todos los campos")
      return
    }

    setLoading(true)

    try {
      const response = await apiRequest(
        "usuarios/login.php",
        "POST",
        {
          CorreoElectronico: email,
          Contrasena: password,
        }
      )

      if (response.usuario) {
        // Guardamos usuario en localStorage
        localStorage.setItem(
          "usuario",
          JSON.stringify(response.usuario)
        )

        router.push("/dashboard")
      } else {
        alert(response.error || "Credenciales incorrectas")
      }

    } catch (error) {
      console.error(error)
      alert("Error al conectar con el servidor")
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6">

      <div className="login-card w-full max-w-md">

        <h1 className="text-3xl font-semibold mb-12 text-center">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-10">

          <div>
            <label className="label-neon">Correo Electrónico</label>
            <input
              type="email"
              className="input-line"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="label-neon">Contraseña</label>
            <input
              type="password"
              className="input-line"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="neon-button w-full"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "LOGIN"}
            </button>
          </div>

        </form>

      </div>

    </div>
  )
}
