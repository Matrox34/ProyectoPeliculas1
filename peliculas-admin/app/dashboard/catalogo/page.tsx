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
}

export default function CatalogoPage() {

  const [peliculas, setPeliculas] = useState<Pelicula[]>([])
  const [trailerActivo, setTrailerActivo] = useState<string | null>(null)

  useEffect(() => {
    cargarPeliculas()
  }, [])

  const cargarPeliculas = async () => {
    const data = await apiRequest("peliculas/obtener.php")
    const activas = data.filter((p: Pelicula) => p.Estado === "activo")
    setPeliculas(activas)
  }

  const convertirYoutubeEmbed = (url: string) => {
    const videoId = url.split("v=")[1]
    return `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <div className="max-w-6xl space-y-12">

      <h2 className="text-3xl font-semibold">
        Catálogo
      </h2>

      <div className="grid grid-cols-3 gap-12">

        {peliculas.map((peli) => (
          <div
            key={peli.id}
            className="group bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#00f5ff]/40 transition-all duration-300 hover:translate-y-[-4px]"
          >

            {/* IMAGEN */}
            <div className="relative h-56 rounded-xl overflow-hidden mb-6">

              <img
                src={peli.Imagen}
                alt={peli.Nombre}
                className="w-full h-full object-cover"
              />

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">

                <button
                  onClick={() => setTrailerActivo(peli.Trailer)}
                  className="px-6 py-2 border border-cyan-400 text-cyan-300 rounded-full hover:bg-cyan-400 hover:text-black transition-all"
                >
                  Ver Trailer
                </button>

              </div>

            </div>

            <h3 className="text-xl font-medium mb-2">
              {peli.Nombre}
            </h3>

            <p className="text-gray-400 text-sm">
              {peli.Descripcion}
            </p>

          </div>
        ))}

      </div>

      {/* MODAL TRAILER */}
      {trailerActivo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="bg-black rounded-2xl overflow-hidden w-[800px] relative">

            <button
              onClick={() => setTrailerActivo(null)}
              className="absolute top-3 right-3 text-white text-xl"
            >
              ✕
            </button>

            <iframe
              width="100%"
              height="450"
              src={convertirYoutubeEmbed(trailerActivo)}
              title="Trailer"
              allowFullScreen
            ></iframe>

          </div>

        </div>
      )}

    </div>
  )
}