export default function DashboardHome() {
  return (
    <div className="max-w-5xl space-y-12">

      <div>
        <h2 className="text-4xl font-semibold mb-4">
          Panel de Administración
        </h2>

        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
          Gestiona el catálogo de películas y los usuarios desde este panel.
          Administra contenido, edita registros y supervisa la plataforma.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-10">

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-[#00f5ff]/40 transition">
          <h3 className="text-xl font-medium mb-3">
            Catálogo
          </h3>
          <p className="text-gray-400">
            Consulta todas las películas registradas.
          </p>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-[#00f5ff]/40 transition">
          <h3 className="text-xl font-medium mb-3">
            Editar Catálogo
          </h3>
          <p className="text-gray-400">
            Agrega o modifica información de películas.
          </p>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-[#00f5ff]/40 transition">
          <h3 className="text-xl font-medium mb-3">
            Usuarios
          </h3>
          <p className="text-gray-400">
            Gestiona los usuarios de la plataforma.
          </p>
        </div>

      </div>

    </div>
  )
}
