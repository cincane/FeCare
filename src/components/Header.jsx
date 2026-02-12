import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function Header({
  navigationOpen,
  setNavigationOpen,
}) {
  const [stickyMenu, setStickyMenu] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setStickyMenu(true);
      } else {
        setStickyMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        stickyMenu
          ? "bg-white shadow-md backdrop-blur-md dark:bg-gray-900/95"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 xl:px-16 2xl:px-24">
        <div className="flex items-center justify-between py-5">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-20 h-20 flex items-center justify-center">
              <img
                src="/images/Logo.png"
                alt="FeCare Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </a>
            {/* <span className="text-3xl font-bold text-gray-900 dark:text-white">
              FeCare
            </span> */}


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="/"
              className="text-gray-800 dark:text-white hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#edukasi"
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              Edukasi
            </a>
            <a
              href="#pencatatan"
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              Pencatatan
            </a>
            <a
              href="#video-edukasi"
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              Video Edukasi
            </a>
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Sign In */}
            <a
              href="#signin"
              className="px-6 py-2 text-gray-800 dark:text-white hover:text-primary transition-colors"
            >
              Sign In
            </a>

            {/* Sign Up */}
            <a
              href="#signup"
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-all"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setNavigationOpen(!navigationOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all ${
                navigationOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all ${
                navigationOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all ${
                navigationOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            navigationOpen ? "max-h-[500px] pb-6" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-4 pt-4">
            <a href="/" className="py-2 border-b">Home</a>
            <a href="#edukasi" className="py-2 border-b">Edukasi</a>
            <a href="#pencatatan" className="py-2 border-b">Pencatatan</a>
            <a href="#video-edukasi" className="py-2 border-b">Video Edukasi</a>

            <div className="flex flex-col gap-3 pt-4">
              <a
                href="#signin"
                className="px-6 py-3 text-center border rounded-lg"
              >
                Sign In
              </a>
              <a
                href="#signup"
                className="px-6 py-3 text-center bg-primary text-white rounded-lg"
              >
                Sign Up
              </a>
            </div>
          </nav>
        </div>

      </div>
    </header>
  );
}

Header.propTypes = {
  navigationOpen: PropTypes.bool.isRequired,
  setNavigationOpen: PropTypes.func.isRequired,
};
