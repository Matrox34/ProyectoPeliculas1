"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (email === "admin@admin.com" && password === "123456") {
      router.push("/dashboard")
    } else {
      alert("Credenciales incorrectas")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6">

      <div className="login-card w-full max-w-md">

        <h1 className="text-3xl font-semibold mb-12 text-center">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-10">

          <div>
            <label className="label-neon">Username</label>
            <input
              type="email"
              className="input-line"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="label-neon">Password</label>
            <input
              type="password"
              className="input-line"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="neon-button"
            >
              LOGIN
            </button>
          </div>

        </form>
      </div>

    </div>
  )
}
