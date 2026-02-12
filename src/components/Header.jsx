import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function Header({ navigationOpen, setNavigationOpen }) {
  const [stickyMenu, setStickyMenu] = useState(false);

  // Detect scroll (sticky effect)
  useEffect(() => {
    const handleScroll = () => {
      setStickyMenu(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setNavigationOpen(false); // close mobile menu
    }
  };

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          stickyMenu
            ? "bg-white/90 backdrop-blur-md shadow-md dark:bg-gray-900/90"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <div className="flex items-center justify-between py-4">

            {/* Logo */}
            <button
              onClick={() => handleScrollTo("home")}
              className="flex items-center gap-3"
            >
              <img
                src="/images/Logo.png"
                alt="FeCare Logo"
                className="h-16 w-auto object-contain"
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 font-medium">
              <button onClick={() => handleScrollTo("home")} className="hover:text-pink-600 transition">
                Home
              </button>
              <button onClick={() => handleScrollTo("edukasi")} className="hover:text-pink-600 transition">
                Edukasi
              </button>
              <button onClick={() => handleScrollTo("pencatatan")} className="hover:text-pink-600 transition">
                Pencatatan
              </button>
              <button onClick={() => handleScrollTo("video-edukasi")} className="hover:text-pink-600 transition">
                Video Edukasi
              </button>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => handleScrollTo("signin")}
                className="px-5 py-2 border border-pink-500 text-pink-600 rounded-full hover:bg-pink-500 hover:text-white transition"
              >
                Sign In
              </button>

              <button
                onClick={() => handleScrollTo("signup")}
                className="px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:opacity-90 transition shadow-lg"
              >
                Sign Up
              </button>
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
        </div>
      </header>

      {/* Overlay */}
      {navigationOpen && (
        <div
          onClick={() => setNavigationOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 z-50 lg:hidden ${
          navigationOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          <button onClick={() => handleScrollTo("home")} className="block">
            Home
          </button>
          <button onClick={() => handleScrollTo("edukasi")} className="block">
            Edukasi
          </button>
          <button onClick={() => handleScrollTo("pencatatan")} className="block">
            Pencatatan
          </button>
          <button onClick={() => handleScrollTo("video-edukasi")} className="block">
            Video Edukasi
          </button>

          <div className="pt-6 space-y-3">
            <button
              onClick={() => handleScrollTo("signin")}
              className="block w-full text-center border border-pink-500 text-pink-600 py-2 rounded-full"
            >
              Sign In
            </button>

            <button
              onClick={() => handleScrollTo("signup")}
              className="block w-full text-center bg-pink-500 text-white py-2 rounded-full"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  navigationOpen: PropTypes.bool.isRequired,
  setNavigationOpen: PropTypes.func.isRequired,
};
