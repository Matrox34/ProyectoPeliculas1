"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navItem = (href: string, label: string) => {
    const active = pathname === href

    return (
      <Link
        href={href}
        className="relative group text-[15px] tracking-wide"
      >
        <span
          className={`transition-colors duration-300 ${
            active ? "text-[#00f5ff]" : "text-gray-300 group-hover:text-white"
          }`}
        >
          {label}
        </span>

        {/* Línea animada */}
        <span
          className={`absolute left-0 -bottom-2 h-[2px] bg-[#00f5ff] transition-all duration-300
          ${active ? "w-full" : "w-0 group-hover:w-full"}`}
        />
      </Link>
    )
  }

  return (
    <div className="min-h-screen">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-20 py-6 border-b border-white/10 backdrop-blur-md">

        <h1 className="text-xl font-semibold tracking-wider">
          Películas Admin
        </h1>

        <div className="flex gap-14">
          {navItem("/dashboard", "Dashboard")}
          {navItem("/dashboard/catalogo", "Catálogo")}
          {navItem("/dashboard/editar-catalogo", "Editar Catálogo")}
          {navItem("/dashboard/usuarios", "Usuarios")}
        </div>

      </nav>

      {/* CONTENIDO */}
      <main className="px-24 py-20">
        {children}
      </main>

    </div>
  )
}
