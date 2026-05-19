import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"

const navLinks = [
  { name: "Home", href: "#home", id: "home" },
  { name: "About", href: "#about", id: "about" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Contact", href: "#contact", id: "contact" },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const sections = navLinks.map((link) => document.getElementById(link.id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const goToSection = (event, sectionId) => {
    event.preventDefault()
    const section = document.getElementById(sectionId)

    if (!section) return

    setActiveSection(sectionId)
    closeMenu()
    section.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.pushState(null, "", `#${sectionId}`)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-darktheme/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" onClick={(event) => goToSection(event, "home")} className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-theme text-sm font-bold text-white shadow-lg shadow-theme/30">
            M.A
          </span>
          <span className="text-lg font-bold text-white">Moayed</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => goToSection(event, link.id)}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive ? "bg-white/10 text-theme2" : "text-slate-300 hover:bg-white/10 hover:text-theme2"
                }`}
              >
                {link.name}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-theme2 transition ${
                    isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  }`}
                />
              </a>
            )
          })}
        </div>

        <a
          href="#contact"
          onClick={(event) => goToSection(event, "contact")}
          className="hidden items-center gap-2 rounded-md bg-theme px-4 py-2 text-sm font-semibold text-white transition hover:bg-theme2 md:inline-flex"
        >
          <Icon icon="tabler:mail" width="17" height="17" />
          Contact
        </a>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="grid h-10 w-10 place-items-center rounded-md text-theme2 hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <Icon icon={isMenuOpen ? "tabler:x" : "tabler:menu-2"} width="24" height="24" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-darktheme px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => goToSection(event, link.id)}
                className={`rounded-md px-3 py-3 text-sm font-medium ${
                  activeSection === link.id ? "bg-white/10 text-theme2" : "text-slate-200 hover:bg-white/10 hover:text-theme2"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
