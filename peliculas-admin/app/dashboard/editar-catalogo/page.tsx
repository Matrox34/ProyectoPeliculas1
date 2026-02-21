"use client"

import { useEffect, useState } from "react"
import { apiRequest } from "@/lib/api"

interface Pelicula {
  id: number
  Nombre: string
  Descripcion: string
  Genero: string
  Imagen: string
  Trailer: string
  Estado: string
  FechaCreacion: string
}

export default function EditarCatalogoPage() {

  const [peliculas, setPeliculas] = useState<Pelicula[]>([])
  const [editandoId, setEditandoId] = useState<number | null>(null)

  const [nuevaPelicula, setNuevaPelicula] = useState({
    Nombre: "",
    Descripcion: "",
    Genero: "",
    Imagen: "",
    Trailer: ""
  })

  useEffect(() => {
    cargarPeliculas()
  }, [])

  const cargarPeliculas = async () => {
    const data = await apiRequest("peliculas/obtener.php")
    setPeliculas(data)
  }

  const crearPelicula = async () => {
    await apiRequest("peliculas/crear.php", "POST", {
      ...nuevaPelicula,
      Estado: "activo"
    })

    setNuevaPelicula({
      Nombre: "",
      Descripcion: "",
      Genero: "",
      Imagen: "",
      Trailer: ""
    })

    cargarPeliculas()
  }

  const actualizarPelicula = async (peli: Pelicula) => {
    await apiRequest("peliculas/actualizar.php", "POST", peli)
    setEditandoId(null)
    cargarPeliculas()
  }

  // 🔥 CORREGIDO: ahora solo actualiza estado sin borrar visualmente
  const cambiarEstado = async (peli: Pelicula) => {
    const nuevoEstado = peli.Estado === "activo" ? "inactivo" : "activo"

    await apiRequest("peliculas/actualizar.php", "POST", {
      ...peli,
      Estado: nuevoEstado
    })

    setPeliculas(prev =>
      prev.map(p =>
        p.id === peli.id ? { ...p, Estado: nuevoEstado } : p
      )
    )
  }

  const eliminarPelicula = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar esta película?")) return
    await apiRequest("peliculas/eliminar.php", "POST", { id })
    cargarPeliculas()
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl space-y-16">

        {/* HEADER */}
        <div>
          <h2 className="text-3xl font-semibold mb-3">
            Editar Catálogo
          </h2>
          <p className="text-gray-400">
            Agrega o actualiza la información de una película.
          </p>
        </div>

        {/* FORMULARIO CREAR */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 space-y-8">

          <div className="grid grid-cols-2 gap-8">

            <input
              placeholder="Título"
              className="input-line"
              value={nuevaPelicula.Nombre}
              onChange={(e) =>
                setNuevaPelicula({ ...nuevaPelicula, Nombre: e.target.value })
              }
            />

            <input
              placeholder="Género"
              className="input-line"
              value={nuevaPelicula.Genero}
              onChange={(e) =>
                setNuevaPelicula({ ...nuevaPelicula, Genero: e.target.value })
              }
            />

            <input
              placeholder="URL Imagen"
              className="input-line"
              value={nuevaPelicula.Imagen}
              onChange={(e) =>
                setNuevaPelicula({ ...nuevaPelicula, Imagen: e.target.value })
              }
            />

            <input
              placeholder="URL Trailer (YouTube)"
              className="input-line"
              value={nuevaPelicula.Trailer}
              onChange={(e) =>
                setNuevaPelicula({ ...nuevaPelicula, Trailer: e.target.value })
              }
            />

          </div>

          <input
            placeholder="Descripción"
            className="input-line"
            value={nuevaPelicula.Descripcion}
            onChange={(e) =>
              setNuevaPelicula({ ...nuevaPelicula, Descripcion: e.target.value })
            }
          />

          <div className="pt-4">
            <button onClick={crearPelicula} className="neon-button">
              Crear Película
            </button>
          </div>

        </div>

        {/* TABLA */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

          <div className="grid grid-cols-8 px-8 py-4 border-b border-white/10 text-gray-400 text-sm">
            <span>Título</span>
            <span>Descripción</span>
            <span>Género</span>
            <span>Estado</span>
            <span>Imagen</span>
            <span>Trailer</span>
            <span>Fecha</span>
            <span className="text-center">Acciones</span>
          </div>

          {peliculas.map((peli) => {

            const editando = editandoId === peli.id

            return (
              <div
                key={peli.id}
                className="grid grid-cols-8 px-8 py-6 border-b border-white/5 items-center gap-4"
              >

                {editando ? (
                  <>
                    {/* Titulo */}
                    <input
                      className="input-line"
                      value={peli.Nombre}
                      onChange={(e) =>
                        setPeliculas(prev =>
                          prev.map(p =>
                            p.id === peli.id
                              ? { ...p, Nombre: e.target.value }
                              : p
                          )
                        )
                      }
                    />

                    {/* Descripcion */}
                    <input
                      className="input-line"
                      value={peli.Descripcion}
                      onChange={(e) =>
                        setPeliculas(prev =>
                          prev.map(p =>
                            p.id === peli.id
                              ? { ...p, Descripcion: e.target.value }
                              : p
                          )
                        )
                      }
                    />

                    {/* Genero */}
                    <input
                      className="input-line"
                      value={peli.Genero}
                      onChange={(e) =>
                        setPeliculas(prev =>
                          prev.map(p =>
                            p.id === peli.id
                              ? { ...p, Genero: e.target.value }
                              : p
                          )
                        )
                      }
                    />

                    <span>{peli.Estado}</span>

                    {/* 🔥 Ahora editable Imagen */}
                    <input
                      className="input-line"
                      value={peli.Imagen}
                      onChange={(e) =>
                        setPeliculas(prev =>
                          prev.map(p =>
                            p.id === peli.id
                              ? { ...p, Imagen: e.target.value }
                              : p
                          )
                        )
                      }
                    />

                    {/* 🔥 Ahora editable Trailer */}
                    <input
                      className="input-line"
                      value={peli.Trailer}
                      onChange={(e) =>
                        setPeliculas(prev =>
                          prev.map(p =>
                            p.id === peli.id
                              ? { ...p, Trailer: e.target.value }
                              : p
                          )
                        )
                      }
                    />

                    <span>{peli.FechaCreacion}</span>

                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => actualizarPelicula(peli)}
                        className="mini-btn-green"
                      >
                        Guardar
                      </button>

                      <button
                        onClick={() => setEditandoId(null)}
                        className="mini-btn-gray"
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span>{peli.Nombre}</span>
                    <span className="truncate">{peli.Descripcion}</span>
                    <span>{peli.Genero}</span>

                    <span className={`${peli.Estado === "activo"
                      ? "text-green-400"
                      : "text-red-400"
                      }`}>
                      {peli.Estado}
                    </span>

                    <span className="text-xs truncate">{peli.Imagen}</span>
                    <span className="text-xs truncate">{peli.Trailer}</span>
                    <span>{peli.FechaCreacion}</span>

                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setEditandoId(peli.id)}
                        className="mini-btn-cyan"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => cambiarEstado(peli)}
                        className="mini-btn-yellow"
                      >
                        {peli.Estado === "activo" ? "Inactivar" : "Activar"}
                      </button>

                      <button
                        onClick={() => eliminarPelicula(peli.id)}
                        className="mini-btn-red"
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