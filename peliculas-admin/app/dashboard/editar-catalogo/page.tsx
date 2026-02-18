export default function EditarCatalogoPage() {
  return (
    <div className="max-w-3xl space-y-14">

      <div>
        <h2 className="text-3xl font-semibold mb-3">
          Editar Catálogo
        </h2>
        <p className="text-gray-400">
          Agrega o actualiza la información de una película.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-12">

        <form className="space-y-12">

          <div>
            <label className="label-neon">Título</label>
            <input
              type="text"
              className="input-line"
              placeholder="Nombre de la película"
            />
          </div>

          <div>
            <label className="label-neon">Descripción</label>
            <input
              type="text"
              className="input-line"
              placeholder="Breve descripción"
            />
          </div>

          <div>
            <label className="label-neon">Género</label>
            <input
              type="text"
              className="input-line"
              placeholder="Ej. Ciencia ficción"
            />
          </div>

          <div className="pt-4">
            <button className="neon-button">
              GUARDAR CAMBIOS
            </button>
          </div>

        </form>

      </div>

    </div>
  )
}
