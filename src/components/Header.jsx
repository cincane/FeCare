import PropTypes from "prop-types";

export default function Header({
  darkMode,
  setDarkMode,
  stickyMenu,
  navigationOpen,
  setNavigationOpen,
}) {
  return (
    <header
      className={`absolute left-0 top-0 z-50 w-full transition-all ${
        stickyMenu ? "fixed bg-white dark:bg-dark shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 xl:px-16 2xl:px-24">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-dark dark:text-white font-outfit">
                FeCare
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              <li>
                <a
                  href="/"
                  className="text-primary font-medium hover:text-primary/80 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#edukasi"
                  className="text-body dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Edukasi
                </a>
              </li>
              <li className="relative group">
                <a
                  href="#pencatatan"
                  className="flex items-center gap-1 text-body dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Pencatatan
                </a>
              </li>
              <li>
                <a
                  href="#video-edukasi"
                  className="text-body dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Video Edukasi
                </a>
              </li>
            </ul>
          </nav>

          {/* Right Side: Dark Mode Toggle & Auth Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-yellow-400"
                >
                  <path
                    d="M10 3V1M10 19v-2M17 10h2M1 10h2M15.657 4.343l1.414-1.414M2.929 17.071l1.414-1.414M15.657 15.657l1.414 1.414M2.929 2.929l1.414 1.414"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="10" r="4" fill="currentColor" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-600"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setNavigationOpen(!navigationOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-dark dark:bg-white transition-all ${
                navigationOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-dark dark:bg-white transition-all ${
                navigationOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-dark dark:bg-white transition-all ${
                navigationOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            navigationOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-4">
            <a
              href="/"
              className="text-primary font-medium py-2 border-b border-gray-200 dark:border-gray-700"
            >
              Home
            </a>
            <a
              href="#edukasi"
              className="text-body dark:text-gray-300 py-2 border-b border-gray-200 dark:border-gray-700"
            >
              Edukasi
            </a>
            <a
              href="#pencatatan"
              className="text-body dark:text-gray-300 py-2 border-b border-gray-200 dark:border-gray-700"
            >
              Pencatatan
            </a>
            <a
              href="#video-edukasi"
              className="text-body dark:text-gray-300 py-2 border-b border-gray-200 dark:border-gray-700"
            >
              Video Edukasi
            </a>
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800"
              >
                {darkMode ? "🌞" : "🌙"}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  stickyMenu: PropTypes.bool.isRequired,
  navigationOpen: PropTypes.bool.isRequired,
  setNavigationOpen: PropTypes.func.isRequired,
};
