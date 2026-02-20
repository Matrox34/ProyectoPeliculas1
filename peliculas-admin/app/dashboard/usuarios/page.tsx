"use client"

import { useEffect, useState } from "react"
import { apiRequest } from "@/lib/api"

interface Usuario {
  id: number
  Nombre: string
  ApellidoPaterno: string
  ApellidoMaterno: string
  CorreoElectronico: string
  FechaRegistro: string
  Estado: string
  Rol: string
}

export default function UsuariosPage() {

  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [editandoId, setEditandoId] = useState<number | null>(null)

  const [nuevoUsuario, setNuevoUsuario] = useState({
    Nombre: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    CorreoElectronico: "",
    Rol: "usuario"
  })

  const [passwordGenerada, setPasswordGenerada] = useState("")

  useEffect(() => {
    cargarUsuarios()
  }, [])

  useEffect(() => {
    if (nuevoUsuario.Nombre.length >= 3) {
      setPasswordGenerada(generarPassword(nuevoUsuario.Nombre))
    } else {
      setPasswordGenerada("")
    }
  }, [nuevoUsuario.Nombre])

  const cargarUsuarios = async () => {
    const data = await apiRequest("usuarios/obtener.php")
    setUsuarios(data)
  }

  const generarPassword = (nombre: string) => {
    const base = nombre.substring(0, 4).toLowerCase()
    const random = Math.random().toString(36).substring(2, 6)
    const numero = Math.floor(Math.random() * 90 + 10)
    return `${base}${random}${numero}`
  }

  const registrarUsuario = async () => {
    if (!passwordGenerada) {
      alert("Debe ingresar un nombre válido")
      return
    }

    await apiRequest("usuarios/crear.php", "POST", {
      ...nuevoUsuario,
      Password: passwordGenerada
    })

    setNuevoUsuario({
      Nombre: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      CorreoElectronico: "",
      Rol: "usuario"
    })

    setPasswordGenerada("")
    cargarUsuarios()
  }

  const actualizarUsuario = async (usuario: Usuario) => {
    await apiRequest("usuarios/actualizar.php", "POST", usuario)
    setEditandoId(null)
    cargarUsuarios()
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl space-y-20 py-10">

        {/* HEADER */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-semibold">
            Gestión de Usuarios
          </h2>
          <p className="text-gray-400 text-lg">
            Administra usuarios y administradores del sistema
          </p>
        </div>

        {/* FORMULARIO */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 space-y-10">

          <h3 className="text-2xl font-semibold text-center">
            Registrar Nuevo Usuario
          </h3>

          <div className="grid grid-cols-2 gap-8">

            <input
              placeholder="Nombre"
              className="input-line"
              value={nuevoUsuario.Nombre}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, Nombre: e.target.value })
              }
            />

            <input
              placeholder="Apellido Paterno"
              className="input-line"
              value={nuevoUsuario.ApellidoPaterno}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, ApellidoPaterno: e.target.value })
              }
            />

            <input
              placeholder="Apellido Materno"
              className="input-line"
              value={nuevoUsuario.ApellidoMaterno}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, ApellidoMaterno: e.target.value })
              }
            />

            <input
              placeholder="Correo Electrónico"
              className="input-line"
              value={nuevoUsuario.CorreoElectronico}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, CorreoElectronico: e.target.value })
              }
            />

            <select
              className="bg-black/40 border border-cyan-400 rounded-xl px-4 py-3 text-cyan-300"
              value={nuevoUsuario.Rol}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, Rol: e.target.value })
              }
            >
              <option value="usuario">Usuario</option>
              <option value="administrador">Administrador</option>
            </select>

            <div className="flex items-center gap-4">
                  <label className="text-cyan-400 text-sm whitespace-nowrap">
                    Contraseña:
                  </label>

                  <input
                    className="bg-black/30 border border-cyan-500 rounded-xl px-4 py-3 text-cyan-300 tracking-widest w-full"
                    value={passwordGenerada}
                    readOnly
                  />
            </div>


          </div>

          <div className="flex justify-center pt-6">
            <button
              onClick={registrarUsuario}
              className="neon-button"
            >
              Crear Usuario
            </button>
          </div>

        </div>

        {/* TABLA */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">

          <div className="grid grid-cols-6 px-10 py-6 border-b border-white/10 text-gray-400 text-sm">
            <span>Nombre</span>
            <span>Email</span>
            <span>Rol</span>
            <span>Estado</span>
            <span>Fecha</span>
            <span className="text-center">Acciones</span>
          </div>

          {usuarios.map((usuario) => {

            const estaEditando = editandoId === usuario.id

            return (
              <div
                key={usuario.id}
                className="grid grid-cols-6 px-10 py-7 border-b border-white/5 items-center"
              >

                {estaEditando ? (
                  <>
                    <input
                      className="input-line"
                      value={usuario.Nombre}
                      onChange={(e) =>
                        setUsuarios(prev =>
                          prev.map(u =>
                            u.id === usuario.id
                              ? { ...u, Nombre: e.target.value }
                              : u
                          )
                        )
                      }
                    />

                    <input
                      className="input-line"
                      value={usuario.CorreoElectronico}
                      onChange={(e) =>
                        setUsuarios(prev =>
                          prev.map(u =>
                            u.id === usuario.id
                              ? { ...u, CorreoElectronico: e.target.value }
                              : u
                          )
                        )
                      }
                    />

                    <select
                      className="bg-black/40 border border-cyan-400 rounded-xl px-3 py-2 text-cyan-300"
                      value={usuario.Rol}
                      onChange={(e) =>
                        setUsuarios(prev =>
                          prev.map(u =>
                            u.id === usuario.id
                              ? { ...u, Rol: e.target.value }
                              : u
                          )
                        )
                      }
                    >
                      <option value="usuario">Usuario</option>
                      <option value="administrador">Administrador</option>
                    </select>

                    <span>{usuario.Estado}</span>
                    <span>{usuario.FechaRegistro}</span>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => actualizarUsuario(usuario)}
                        className="px-4 py-2 text-sm rounded-full border border-green-400 text-green-300 shadow-[0_0_10px_#22c55e33]"
                      >
                        Guardar
                      </button>

                      <button
                        onClick={() => setEditandoId(null)}
                        className="px-4 py-2 text-sm rounded-full border border-gray-400 text-gray-300"
                      >
                        Cancelar
                      </button>

                    </div>
                  </>
                ) : (
                  <>
                    <span>
                      {usuario.Nombre} {usuario.ApellidoPaterno}
                    </span>

                    <span className="text-gray-400">
                      {usuario.CorreoElectronico}
                    </span>

                    <span className="text-cyan-300">
                      {usuario.Rol}
                    </span>

                    <span className={`${usuario.Estado === "activo"
                      ? "text-green-400"
                      : "text-red-400"
                      }`}>
                      {usuario.Estado}
                    </span>

                    <span className="text-gray-500 text-sm">
                      {usuario.FechaRegistro}
                    </span>

                    <div className="flex justify-center gap-3">

                        {/* EDITAR */}
                        <button
                          onClick={() => setEditandoId(usuario.id)}
                          className="px-4 py-2 text-sm rounded-full border border-cyan-400 text-cyan-300 shadow-[0_0_10px_#00f5ff33]"
                        >
                          Editar
                        </button>

                        {/* ACTIVAR / INACTIVAR */}
                        <button
                          onClick={async () => {
                            await apiRequest("usuarios/cambiarEstado.php", "POST", {
                              id: usuario.id,
                              Estado: usuario.Estado === "activo" ? "inactivo" : "activo"
                            })
                            cargarUsuarios()
                          }}
                          className={`px-4 py-2 text-sm rounded-full border ${
                            usuario.Estado === "activo"
                              ? "border-yellow-400 text-yellow-300 shadow-[0_0_10px_#facc1533]"
                              : "border-green-400 text-green-300 shadow-[0_0_10px_#22c55e33]"
                          }`}
                        >
                          {usuario.Estado === "activo" ? "Inactivar" : "Activar"}
                        </button>

                        {/* ELIMINAR */}
                        <button
                          onClick={async () => {
                            if (!confirm("¿Seguro que deseas eliminar este usuario?")) return

                            await apiRequest("usuarios/eliminar.php", "POST", {
                              id: usuario.id
                            })

                            cargarUsuarios()
                          }}
                          className="px-4 py-2 text-sm rounded-full border border-red-400 text-red-300 shadow-[0_0_10px_#f8717133]"
                        >
                          Eliminar
                        </button>

                      </div>

                  </>
                )}

              </div>
            )
          })}

        </div>

      </div>
    </div>
  )
}
