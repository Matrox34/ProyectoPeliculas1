const usuariosMock = [
  { id: 1, nombre: "Juan Pérez", email: "juan@email.com" },
  { id: 2, nombre: "Ana Torres", email: "ana@email.com" },
  { id: 3, nombre: "Carlos Ruiz", email: "carlos@email.com" },
]

export default function UsuariosPage() {
  return (
    <div className="max-w-5xl space-y-14">

      <div>
        <h2 className="text-3xl font-semibold mb-3">
          Usuarios
        </h2>
        <p className="text-gray-400">
          Administra los usuarios registrados en la plataforma.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

        {/* Encabezado */}
        <div className="grid grid-cols-3 px-10 py-6 border-b border-white/10 text-gray-400 text-sm tracking-wide">
          <span>Nombre</span>
          <span>Email</span>
          <span className="text-right">Acciones</span>
        </div>

        {/* Filas */}
        {usuariosMock.map((usuario) => (
          <div
            key={usuario.id}
            className="grid grid-cols-3 px-10 py-6 border-b border-white/5 items-center hover:bg-white/5 transition"
          >
            <span className="text-lg">{usuario.nombre}</span>
            <span className="text-gray-400">{usuario.email}</span>

            <div className="flex justify-end gap-6 text-sm">

              <button className="text-[#00f5ff] hover:underline">
                Editar
              </button>

              <button className="text-red-400 hover:underline">
                Eliminar
              </button>

            </div>
          </div>
        ))}

      </div>

    </div>
  )
}
