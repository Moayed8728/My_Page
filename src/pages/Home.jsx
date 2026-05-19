import { useEffect, useRef, useState } from "react"
import { Icon } from "@iconify/react"
import profile from "../assets/profile.jpeg"
import projects from "../data/projects.json"

const skillGroups = [
  {
    title: "Backend Systems",
    icon: "tabler:server",
    summary: "Application logic, API design, and Laravel backend structure.",
    items: [
      { name: "Laravel", icon: "logos:laravel" },
      { name: "PHP", icon: "logos:php" },
      { name: "REST APIs", icon: "tabler:api" },
    ],
  },
  {
    title: "Databases",
    icon: "tabler:database",
    summary: "Relational schema design, migrations, and vector-enabled storage.",
    items: [
      { name: "PostgreSQL", icon: "logos:postgresql" },
      { name: "MariaDB", icon: "logos:mariadb-icon" },
      { name: "pgvector", icon: "tabler:binary-tree" },
    ],
  },
  {
    title: "AI & Search",
    icon: "tabler:brain",
    summary: "Semantic retrieval, recommendations, and AI-assisted workflows.",
    items: [
      { name: "Gemini API", icon: "tabler:sparkles" },
      { name: "Semantic Search", icon: "tabler:search" },
      { name: "RAG", icon: "tabler:route" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "tabler:tools",
    summary: "Containerized local development and practical engineering tooling.",
    items: [
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "Git/GitHub", icon: "logos:github-icon" },
      { name: "Postman", icon: "logos:postman-icon" },
    ],
  },
  {
    title: "Frontend",
    icon: "tabler:layout-dashboard",
    summary: "Clean interfaces with responsive layouts and utility-first CSS.",
    items: [
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "JavaScript", icon: "logos:javascript" },
      { name: "Blade", icon: "tabler:template" },
    ],
  },
  {
    title: "Software Architecture",
    icon: "tabler:hierarchy",
    summary: "Planning systems with diagrams, layers, and scalable structure.",
    items: [
      { name: "UML", icon: "tabler:chart-dots" },
      { name: "System Design", icon: "tabler:affiliate" },
      { name: "Architecture", icon: "tabler:building-arch" },
    ],
  },
  {
    title: "Python Data Work",
    icon: "tabler:code",
    summary: "Scraping, cleaning, and preparing data for real backend workflows.",
    items: [
      { name: "Python", icon: "logos:python" },
      { name: "Web Scraping", icon: "tabler:world-search" },
      { name: "Pandas", icon: "simple-icons:pandas" },
    ],
  },
]

const techIcons = {
  "Laravel 12": "logos:laravel",
  Laravel: "logos:laravel",
  PHP: "logos:php",
  PostgreSQL: "logos:postgresql",
  MariaDB: "logos:mariadb-icon",
  pgvector: "tabler:binary-tree",
  "Gemini API": "tabler:sparkles",
  Docker: "logos:docker-icon",
  "Tailwind CSS": "logos:tailwindcss-icon",
  JavaScript: "logos:javascript",
  "Database Design": "tabler:database-cog",
  "Application Logic": "tabler:blocks",
  "Software Engineering": "tabler:hierarchy",
  SQL: "tabler:database",
  MySQL: "logos:mysql-icon",
  Blade: "tabler:template",
  HTML: "logos:html-5",
  CSS: "logos:css-3",
  "API Integration": "tabler:api",
  "Laravel Cloud": "tabler:cloud",
  "PDF to Text": "tabler:file-type-pdf",
}

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeSkillIndex, setActiveSkillIndex] = useState(0)
  const [showWelcome, setShowWelcome] = useState(true)
  const projectsCarouselRef = useRef(null)

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
          }
        })
      },
      { threshold: 0.18 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const welcomeTimer = window.setTimeout(() => {
      setShowWelcome(false)
    }, 2300)

    return () => window.clearTimeout(welcomeTimer)
  }, [])

  useEffect(() => {
    if (!selectedProject) return undefined

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null)
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedProject])

  const showPreviousSkill = () => {
    setActiveSkillIndex((current) => (current === 0 ? skillGroups.length - 1 : current - 1))
  }

  const showNextSkill = () => {
    setActiveSkillIndex((current) => (current === skillGroups.length - 1 ? 0 : current + 1))
  }

  const scrollProjects = (direction) => {
    const carousel = projectsCarouselRef.current

    if (!carousel) return

    const firstCard = carousel.firstElementChild
    const carouselStyles = window.getComputedStyle(carousel)
    const gap = Number.parseFloat(carouselStyles.columnGap || carouselStyles.gap || "0")
    const cardWidth = firstCard?.getBoundingClientRect().width || carousel.clientWidth * 0.85
    const scrollAmount = cardWidth + gap
    const maxScroll = carousel.scrollWidth - carousel.clientWidth

    if (direction === "next" && carousel.scrollLeft >= maxScroll - 4) {
      carousel.scrollTo({ left: 0, behavior: "smooth" })
      return
    }

    if (direction === "previous" && carousel.scrollLeft <= 4) {
      carousel.scrollTo({ left: maxScroll, behavior: "smooth" })
      return
    }

    carousel.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    })
  }

  const activeSkill = skillGroups[activeSkillIndex]

  return (
    <main className="magic-app bg-darktheme text-white">
      {showWelcome && (
        <div className="welcome-screen" aria-hidden="true">
          <div className="welcome-orbit">
            <span />
            <span />
            <span />
          </div>
          <div className="welcome-content">
            <p>Welcome</p>
            <h1>Moayed&apos;s Portfolio</h1>
            <span>Full-stack web systems, AI workflows, and clean software architecture</span>
          </div>
        </div>
      )}

      <section id="home" className="hero-section section-panel scroll-mt-24 py-16 sm:py-20">
        <div className="hero-grid" aria-hidden="true" />
        <div className="node-field" aria-hidden="true">
          <span className="node node-a" />
          <span className="node node-b" />
          <span className="node node-c" />
          <span className="node-line node-line-a" />
          <span className="node-line node-line-b" />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-[1.12fr_0.88fr]">
            <div className="reveal-on-scroll space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-theme px-3.5 py-1.5 text-xs font-medium text-white shadow-lg shadow-theme/30">
                <Icon icon="tabler:code" width="16" height="16" />
                Software Engineering Student | Full-Stack Developer
              </span>

              <div className="space-y-4">
                <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[3.35rem]">
                  Full-stack developer focused on <span className="text-theme">AI-powered web systems</span>.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  I build Laravel applications from database and API design to responsive interfaces, with intelligent features for search, recommendations, resume processing, and real-world product workflows.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#projects" className="magic-button inline-flex items-center rounded-md bg-theme px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-theme2">
                  View Projects
                  <Icon icon="tabler:arrow-right" width="16" height="16" className="ml-2" />
                </a>
                <a href="#contact" className="magic-button inline-flex items-center rounded-md border border-theme2/50 px-5 py-2.5 text-sm font-medium text-theme2 transition hover:-translate-y-0.5 hover:bg-theme2 hover:text-white">
                  Contact Me
                  <Icon icon="tabler:mail" width="16" height="16" className="ml-2" />
                </a>
                <a href="https://github.com/Moayed8728" target="_blank" rel="noreferrer" className="magic-button inline-flex items-center rounded-md border border-theme2/50 px-5 py-2.5 text-sm font-medium text-theme2 transition hover:-translate-y-0.5 hover:bg-theme2 hover:text-white">
                  GitHub
                  <Icon icon="tabler:brand-github" width="16" height="16" className="ml-2" />
                </a>
              </div>
            </div>

            <div className="reveal-on-scroll flex justify-center md:justify-end">
              <div className="magic-portrait avatar-frame relative">
                <div className="relative h-60 w-60 overflow-hidden rounded-full border-[6px] border-theme shadow-2xl shadow-theme/30 sm:h-72 sm:w-72">
                  <img src={profile} alt="Moayed" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="magic-divider" aria-hidden="true" />

      <section id="about" className="section-panel scroll-mt-24 border-y border-white/10 bg-theme3 py-16">
        <div className="mx-auto grid max-w-5xl gap-7 px-4 sm:px-6 md:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="reveal-on-scroll">
            <p className="text-xs font-bold uppercase tracking-widest text-theme2">About Me</p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Smart backend systems with AI-aware architecture.</h2>
          </div>
          <div className="reveal-on-scroll space-y-4 text-base leading-7 text-slate-300">
            <p>
              I focus on production-style systems that combine Laravel, PostgreSQL, Docker, REST APIs, semantic retrieval, and real workflow design.
            </p>
            <p>
              My projects go beyond basic CRUD: role-based platforms, moderation flows, recommendation systems, vector search, responsive interfaces, and structured backend architecture.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Scalable Backend Design", "AI-Powered Workflows", "Semantic Search"].map((item) => (
                <div key={item} className="magic-card rounded-lg border border-white/10 bg-darktheme p-3.5 text-sm font-semibold text-theme2">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="magic-divider" aria-hidden="true" />

      <section id="projects" className="section-panel scroll-mt-24 bg-theme3 py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="reveal-on-scroll mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-theme">Projects</p>
              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Systems & Products</h2>
              <p className="mt-3 max-w-2xl text-base text-slate-300">
                Browse backend systems and product-style builds. Click a card for architecture notes and source code.
              </p>
            </div>
          </div>

          <div className="project-carousel-shell reveal-on-scroll relative">
            <button
              type="button"
              onClick={() => scrollProjects("previous")}
              className="project-edge project-edge-left"
              aria-label="Scroll projects left"
            >
              <span className="project-edge-icon">
                <Icon icon="tabler:chevron-left" width="24" height="24" />
              </span>
            </button>

            <div ref={projectsCarouselRef} className="project-carousel flex snap-x gap-5 overflow-x-auto pb-5">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="magic-card group relative min-h-[360px] w-[82vw] shrink-0 snap-start overflow-hidden rounded-lg border border-white/10 bg-darktheme shadow-xl transition duration-300 hover:-translate-y-1 hover:border-theme2/60 hover:shadow-2xl hover:shadow-theme/25 sm:w-[360px] lg:w-[calc((100%_-_2.5rem)/3)]"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.34),transparent_38%)]" />
                  <div className="relative flex h-full flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="grid h-14 w-14 place-items-center rounded-lg border border-white/10 bg-white/10">
                          {project.image ? (
                            <img src={project.image} alt={`${project.title} logo`} className="h-9 w-9 object-contain" />
                          ) : (
                            <Icon icon={project.logoIcon} width="34" height="34" className="text-theme2" />
                          )}
                        </div>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-theme2">{project.year}</span>
                      </div>

                      <div className="mt-8">
                        <p className="text-xs font-bold uppercase tracking-widest text-theme2">{project.category}</p>
                        <h3 className="mt-3 text-2xl font-bold text-white">{project.title}</h3>
                        <p className="mt-3 text-base text-slate-300">{project.tagline}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.systemTags.slice(0, 2).map((tag) => (
                            <span key={tag} className="rounded-full border border-theme2/30 bg-white/5 px-3 py-1 text-xs font-medium text-theme2">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="translate-y-4 opacity-100 transition duration-300 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
                      <p className="line-clamp-3 text-sm leading-6 text-slate-300">{project.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((technology) => (
                          <span key={technology} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                            <Icon icon={techIcons[technology] || "tabler:circle"} width="14" height="14" />
                            {technology}
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="magic-button mt-5 inline-flex items-center rounded-md bg-theme px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-theme2"
                      >
                        See More
                        <Icon icon="tabler:arrow-up-right" width="17" height="17" className="ml-2" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollProjects("next")}
              className="project-edge project-edge-right"
              aria-label="Scroll projects right"
            >
              <span className="project-edge-icon">
                <Icon icon="tabler:chevron-right" width="24" height="24" />
              </span>
            </button>
          </div>
        </div>
      </section>

      <div className="magic-divider" aria-hidden="true" />

      <section id="skills" className="section-panel scroll-mt-24 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="reveal-on-scroll mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-theme2">Skills</p>
              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Engineering Stack</h2>
            </div>
          </div>

          <div className="skill-carousel-shell reveal-on-scroll relative">
            <button
              type="button"
              onClick={showPreviousSkill}
              className="project-edge project-edge-left"
              aria-label="Previous skill category"
            >
              <span className="project-edge-icon">
                <Icon icon="tabler:chevron-left" width="24" height="24" />
              </span>
            </button>

            <div className="magic-card overflow-hidden rounded-lg border border-white/10 bg-slate-900 shadow-2xl">
              <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[0.85fr_1.15fr]">
                <div className="flex flex-col justify-between rounded-lg bg-darktheme p-5">
                  <div>
                    <Icon icon={activeSkill.icon} width="38" height="38" className="text-theme2" />
                    <h3 className="mt-4 text-2xl font-bold text-white">{activeSkill.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{activeSkill.summary}</p>
                  </div>
                  <div className="mt-8 flex gap-2">
                    {skillGroups.map((group, index) => (
                      <button
                        key={group.title}
                        type="button"
                        onClick={() => setActiveSkillIndex(index)}
                        className={`h-2 rounded-full transition ${index === activeSkillIndex ? "w-8 bg-theme2" : "w-2 bg-white/25 hover:bg-white/50"}`}
                        aria-label={`Show ${group.title} skills`}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {activeSkill.items.map((skill) => (
                    <div key={skill.name} className="magic-card grid min-h-32 place-items-center rounded-lg border border-white/10 bg-white/5 p-4 text-center transition hover:-translate-y-1 hover:bg-white/10">
                      <Icon icon={skill.icon} width="36" height="36" className="text-theme2" />
                      <p className="mt-4 text-sm font-semibold text-white">{skill.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={showNextSkill}
              className="project-edge project-edge-right"
              aria-label="Next skill category"
            >
              <span className="project-edge-icon">
                <Icon icon="tabler:chevron-right" width="24" height="24" />
              </span>
            </button>
          </div>

          <div className="reveal-on-scroll mt-8 grid gap-4 md:grid-cols-3">
            {["Universiti Teknologi Malaysia (UTM)", "Open to full-stack internships", "Backend, AI, and architecture focused"].map((item) => (
              <div key={item} className="magic-card rounded-lg border border-white/10 bg-theme3 p-4 text-sm font-semibold text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="magic-divider" aria-hidden="true" />

      <footer id="contact" className="section-panel scroll-mt-24 border-t border-white/10 bg-darktheme py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="reveal-on-scroll">
            <p className="inline-flex rounded-full bg-theme px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white">Contact</p>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Open to full-stack internship opportunities.</h2>
            <p className="mt-5 leading-7 text-slate-300">
              I&apos;m looking for opportunities where I can contribute across Laravel backends, APIs, databases, responsive interfaces, and AI-powered product workflows.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a href="mailto:mwyd8728@gmail.com" className="magic-card reveal-on-scroll group rounded-lg border border-theme/30 bg-theme3 p-5 shadow-xl shadow-theme/10 transition hover:-translate-y-1 hover:border-theme2/70 hover:bg-white/5">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-theme/20 text-theme2">
                <Icon icon="tabler:mail" width="22" height="22" />
              </span>
              <p className="mt-5 text-sm font-bold uppercase tracking-widest text-slate-400">Email</p>
              <p className="mt-2 break-all text-base font-semibold text-white group-hover:text-theme2">mwyd8728@gmail.com</p>
            </a>

            <a href="tel:+601117915983" className="magic-card reveal-on-scroll group rounded-lg border border-theme/30 bg-theme3 p-5 shadow-xl shadow-theme/10 transition hover:-translate-y-1 hover:border-theme2/70 hover:bg-white/5">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-theme/20 text-theme2">
                <Icon icon="tabler:phone" width="22" height="22" />
              </span>
              <p className="mt-5 text-sm font-bold uppercase tracking-widest text-slate-400">Phone</p>
              <p className="mt-2 text-base font-semibold text-white group-hover:text-theme2">+60-1117915983</p>
            </a>

            <a href="https://github.com/Moayed8728" target="_blank" rel="noreferrer" className="magic-card reveal-on-scroll group rounded-lg border border-theme/30 bg-theme3 p-5 shadow-xl shadow-theme/10 transition hover:-translate-y-1 hover:border-theme2/70 hover:bg-white/5">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-theme/20 text-theme2">
                <Icon icon="tabler:brand-github" width="22" height="22" />
              </span>
              <p className="mt-5 text-sm font-bold uppercase tracking-widest text-slate-400">GitHub</p>
              <p className="mt-2 text-base font-semibold text-white group-hover:text-theme2">Moayed8728</p>
            </a>

            <a href="https://linkedin.com/in/moayed8728" target="_blank" rel="noreferrer" className="magic-card reveal-on-scroll group rounded-lg border border-theme/30 bg-theme3 p-5 shadow-xl shadow-theme/10 transition hover:-translate-y-1 hover:border-theme2/70 hover:bg-white/5">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-theme/20 text-theme2">
                <Icon icon="tabler:brand-linkedin" width="22" height="22" />
              </span>
              <p className="mt-5 text-sm font-bold uppercase tracking-widest text-slate-400">LinkedIn</p>
              <p className="mt-2 text-base font-semibold text-white group-hover:text-theme2">moayed8728</p>
            </a>
          </div>
        </div>

        <div className="reveal-on-scroll mx-auto mt-12 flex max-w-5xl flex-col gap-4 border-t border-white/10 px-4 pt-6 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Moayed | Full-stack development, backend systems, and AI workflows</p>
          <div className="flex gap-4">
            <a href="https://github.com/Moayed8728" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-theme2 hover:text-white">
              <Icon icon="tabler:brand-github" width="18" height="18" />
              GitHub
            </a>
            <a href="https://linkedin.com/in/moayed8728" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-theme2 hover:text-white">
              <Icon icon="tabler:brand-linkedin" width="18" height="18" />
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {selectedProject && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-darktheme/80 px-4 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onMouseDown={() => setSelectedProject(null)}>
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-white/10 bg-theme3 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
              <div className="flex gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-white/10">
                  <Icon icon={selectedProject.logoIcon} width="32" height="32" className="text-theme2" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-theme2">{selectedProject.category}</p>
                  <h3 id="project-modal-title" className="mt-1 text-2xl font-bold text-white">{selectedProject.title}</h3>
                  <p className="mt-1 text-slate-300">{selectedProject.subtitle}</p>
                </div>
              </div>
              <button type="button" onClick={() => setSelectedProject(null)} className="grid h-10 w-10 shrink-0 place-items-center rounded-md text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Close project details">
                <Icon icon="tabler:x" width="22" height="22" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <p className="leading-7 text-slate-300">{selectedProject.description}</p>

              {selectedProject.behindSystem && (
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white">Behind the System</h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-md bg-white/5 p-3 text-sm text-slate-300">
                      <p className="font-semibold text-theme2">Engineering Challenge</p>
                      <p className="mt-2">{selectedProject.behindSystem.challenge}</p>
                    </div>
                    <div className="rounded-md bg-white/5 p-3 text-sm text-slate-300">
                      <p className="font-semibold text-theme2">Architecture Decisions</p>
                      <p className="mt-2">{selectedProject.behindSystem.architecture}</p>
                    </div>
                    <div className="rounded-md bg-white/5 p-3 text-sm text-slate-300">
                      <p className="font-semibold text-theme2">Backend Workflow</p>
                      <p className="mt-2">{selectedProject.behindSystem.backendWorkflow}</p>
                    </div>
                    <div className="rounded-md bg-white/5 p-3 text-sm text-slate-300">
                      <p className="font-semibold text-theme2">AI / Data Flow</p>
                      <p className="mt-2">{selectedProject.behindSystem.aiDataFlow}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-white">Key Features</h4>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {selectedProject.features.map((feature) => (
                    <div key={feature} className="flex gap-2 rounded-md bg-white/5 p-3 text-sm text-slate-300">
                      <Icon icon="tabler:check" width="16" height="16" className="mt-0.5 shrink-0 text-theme2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-white">Technologies</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProject.technologies.map((technology) => (
                    <span key={technology} className="inline-flex items-center gap-2 rounded-full bg-theme px-3 py-1 text-xs font-semibold text-white">
                      <Icon icon={techIcons[technology] || "tabler:circle"} width="14" height="14" />
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-white">Concepts Explored</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProject.concepts.map((concept) => (
                    <span key={concept} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProject.repositories?.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white">Source Code</h4>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {selectedProject.repositories.map((repository) => (
                      <a
                        key={repository.url}
                        href={repository.url}
                        target="_blank"
                        rel="noreferrer"
                        className="magic-button inline-flex items-center rounded-md border border-theme2/50 px-4 py-2.5 text-sm font-semibold text-theme2 transition hover:bg-theme2 hover:text-white"
                      >
                        <Icon icon="tabler:brand-github" width="16" height="16" className="mr-2" />
                        {repository.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Home
