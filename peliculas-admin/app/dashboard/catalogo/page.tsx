const peliculasMock = [
  { id: 1, titulo: "Avengers", descripcion: "Superhéroes" },
  { id: 2, titulo: "Interstellar", descripcion: "Ciencia ficción" },
  { id: 3, titulo: "Inception", descripcion: "Thriller psicológico" },
]

export default function CatalogoPage() {
  return (
    <div className="max-w-6xl space-y-12">

      <h2 className="text-3xl font-semibold">
        Catálogo
      </h2>

      <div className="grid grid-cols-3 gap-12">

        {peliculasMock.map((peli) => (
          <div
            key={peli.id}
            className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-[#00f5ff]/40 transition-all duration-300 hover:translate-y-[-4px]"
          >
            <div className="h-40 bg-black/40 rounded-xl mb-6"></div>

            <h3 className="text-xl font-medium mb-2">
              {peli.titulo}
            </h3>

            <p className="text-gray-400">
              {peli.descripcion}
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}
