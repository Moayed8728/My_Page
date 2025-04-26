import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import profile from '../assets/profile.jpeg'
import projects from '../data/projects.json'
const Home = () => {
    return (
        <div className="bg-darktheme">
            {/* Hero Section */}
            {/* 1. Create Hero Section */}
            <section className="py-20 sm:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-1 space-y-8">
                            <div>
                                <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-theme rounded-full">
                                    Software Engineer
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                                MARHABA, I'm <span className="text-theme"> Moayed</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                                I build exceptional and accessible digital experiences for the web. Focused on creating clean,
                                user-friendly interfaces that solve real-world problems.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/projects"
                                    className="inline-flex items-center px-6 py-3 bg-theme text-white font-medium rounded-md hover:bg-blue-400 transition-colors"
                                >
                                    View My Work
                                    <Icon icon="tabler:arrow-right" width="18" height="18" className="ml-2" />
                                </Link>
                                <a
                                    href="/resume.pdf"
                                    download
                                    className="inline-flex items-center px-6 py-3 bg-theme2  text-white font-medium rounded-md hover:bg-red-800 transition-colors"
                                >
                                    Download CV
                                    <Icon icon="tabler:download" width="18" height="18" className="ml-2" />
                                </a>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-8 border-theme shadow-xl">
                                <img
                                    src={profile}
                                    alt="Your Name"
                                    className="w-full h-full object-cover "
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Featured Projects Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-darktheme">Featured Projects</h2>
                        <p className="text-xl text-gray-500">Some of my recent work that I'm proud of</p>
                    </div>
                    {/* 2. Add Map for Projects & Project Skills */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((item) => (
                            <div key={item} className="bg-darktheme rounded-lg overflow-hidden shadow-xl border-2 border-darktheme">
                                <img
                                    src={item.image}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">Project Title {item.title}</h3>
                                    <p className="text-gray-300 mb-4">
                                       {item.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                    {item.technologies.map((technology)=>{
                                         <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-theme text-darktheme">
                                         {technology}
                                     </span>
                                      })}
                                    </div>
                                    <Link
                                        to={item.demo}
                                        className="text-theme font-medium hover:underline flex items-center"
                                    >
                                        View Demo
                                        <Icon icon="tabler:arrow-right" width="16" height="16" className="ml-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            to="/projects"
                            className="inline-flex items-center px-6 py-3 bg-theme text-white font-medium rounded-md hover:bg-blue-400 transition duration-300 hover:scale-120"
                        >
                            View All Projects
                            <Icon icon="tabler:arrow-right" width="18" height="18" className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Skills Section */}

            {/* 3. Map Your Skills */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white">My Skills</h2>
                        <p className="text-xl text-gray-300">Technologies and tools I work with</p>
                    </div>

                    <div className="flex md:flex-row flex-col gap-8">
                        <div className="bg-gray-500 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Frontend</h3>
                            <div className="flex flex-wrap gap-2">
                                {["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Next.js"].map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 rounded-full text-white bg-darktheme text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>


                        <div className="bg-gray-500 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Backend</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Node.js", "Express", "MongoDB", "Firebase", "REST API", "GraphQL"].map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 rounded-full text-white bg-darktheme text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-500 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Tools</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Git", "GitHub", "VS Code", "Figma", "Webpack", "Jest"].map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 rounded-full text-white bg-darktheme text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}

            <section className="py-16 bg-theme2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white">Interested in working together?</h2>
                    <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
                        I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center px-6 py-3 bg-white text-theme2 font-medium rounded-md hover:bg-gray-100 transition-colors"
                    >
                        Get In Touch
                        <Icon icon="tabler:arrow-right" width="18" height="18" className="ml-2" />
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Home