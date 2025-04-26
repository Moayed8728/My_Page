import { useState, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { Icon } from "@iconify/react"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Projects", path: "/projects" },
        { name: "Resume" , path: "/Resume" },
    ]

    // 1. Add A New Page Called Resume

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <nav className="sticky top-0 z-50">
            <div className="lg:w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-b-xl shadow-xl">
                {/* 2. Add Shadow */}

                <div className="flex-col h-16 justify-center items-start">
                    {/* 3. Add a Space Between */}

                    <div className="flex items-start">
                        <Link to="/" className="flex-shrink-0 flex / col-end-1" onClick={closeMenu}>
                            <span className="text-2xl font-bold text-theme">Portfolio</span>
                            {/* 4. Add Img and Logo ../assets/react.svg */}
                        </Link>
                    </div>


                    <div className="hidden md:flex items-center space-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === link.path
                                    ? "text-theme"
                                    : "text-darktheme hover:text-theme2"
                                    }`}
                            >
                                {link.name}
                            </Link>

                        ))}
                        <div className="text-white flex items-center text-2xl gap-1 p-1 rounded-sm">
                        </div>
                        {/* 5. Add Social Media Links */}
                    </div>



                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md text-theme"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <Icon icon="tabler:x" width="24" height="24" />
                            ) : (
                                <Icon icon="tabler:menu-2" width="24" height="24" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-darktheme shadow-lg flex flex-col items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path
                                    ? "text-theme"
                                    : "text-white"
                                    }`}
                                onClick={closeMenu}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="text-white flex items-center text-2xl gap-1 p-1 rounded-sm">
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar