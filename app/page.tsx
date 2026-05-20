import ArcadeSection from "./components/ArcadeSection";

export default function Home() {
  const navItems = [
    { label: "Inicio", href: "#" },
    { label: "Proyectos", href: "#projects" },
    { label: "Experiencia", href: "#experience" },
    { label: "Contacto", href: "#contact" },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="w-full bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg" />
            <span className="font-bold text-white text-lg">Portfolio</span>
          </div>

          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/50 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              Arcade <span className="bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">Gaming</span> Portfolio
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              Minimalist games built with optimized architecture, clean patterns, and performance-first design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#projects"
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-colors"
              >
                Explorar Proyectos
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 font-semibold rounded-lg transition-colors"
              >
                Contactar
              </a>
            </div>
          </div>
        </section>

        {/* Arcade Section */}
        <section id="projects" className="w-full">
          <ArcadeSection />
        </section>

        {/* Footer */}
        <footer className="w-full bg-slate-950 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Abraham Sánchez</h3>
                <p className="text-slate-400">Game Developer & Creative Technologist</p>
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">GitHub</a>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">LinkedIn</a>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Twitter</a>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
              <p>&copy; 2026 Abraham Sánchez. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
