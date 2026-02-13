import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ navigationOpen, setNavigationOpen }) {
  const [stickyMenu, setStickyMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home"); // State untuk section aktif
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  /* =========================
     DETECT LOGIN STATE
  ========================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");

    if (token) {
      setIsLoggedIn(true);
      setEmail(storedEmail || "");
    }
  }, []);

  /* =========================
     STICKY HEADER
  ========================= */
  useEffect(() => {
    const handleScroll = () => {
      setStickyMenu(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =========================
     DETECT ACTIVE SECTION
  ========================= */
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = [
        { id: "home", offset: 0 },
        { id: "edukasi", offset: 100 },
        { id: "pencatatan", offset: 100 },
        { id: "video-edukasi", offset: 100 },
      ];

      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop - section.offset &&
            scrollPosition < offsetTop + offsetHeight - section.offset
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  /* =========================
     CLOSE DROPDOWN IF CLICK OUTSIDE
  ========================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =========================
     CLOSE MOBILE MENU WHEN CLICK OUTSIDE
  ========================= */
  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest('.mobile-menu-button')
      ) {
        setNavigationOpen(false);
      }
    };

    if (navigationOpen) {
      document.addEventListener("mousedown", handleClickOutsideMenu);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [navigationOpen, setNavigationOpen]);

  /* =========================
     LOGOUT FUNCTION
  ========================= */
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Apakah Anda yakin ingin logout?"
    );

    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("email");

      setIsLoggedIn(false);
      setDropdownOpen(false);
      setNavigationOpen(false);

      navigate("/");
      window.location.reload();
    }
  };

  // Fungsi untuk toggle menu
  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setNavigationOpen(!navigationOpen);
  };

  // Fungsi untuk handle klik link
  const handleLinkClick = (sectionId) => {
    setActiveSection(sectionId);
    setNavigationOpen(false);
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
        <div className="container mx-auto px-4 lg:px-8 xl:px-16 2xl:px-24">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/images/Logo.png"
                alt="FeCare Logo"
                className="h-16 w-auto object-contain drop-shadow-lg"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 font-medium">
              <a
                href="#home"
                onClick={() => handleLinkClick("home")}
                className={`transition ${
                  activeSection === "home"
                    ? "text-pink-600 font-semibold" // Warna pink saat aktif
                    : "text-gray-700 dark:text-gray-200 hover:text-pink-600"
                }`}
              >
                Home
              </a>
              <a
                href="#edukasi"
                onClick={() => handleLinkClick("edukasi")}
                className={`transition ${
                  activeSection === "edukasi"
                    ? "text-pink-600 font-semibold"
                    : "text-gray-700 dark:text-gray-200 hover:text-pink-600"
                }`}
              >
                Edukasi
              </a>
              <a
                href="#pencatatan"
                onClick={() => handleLinkClick("pencatatan")}
                className={`transition ${
                  activeSection === "pencatatan"
                    ? "text-pink-600 font-semibold"
                    : "text-gray-700 dark:text-gray-200 hover:text-pink-600"
                }`}
              >
                Pencatatan
              </a>
              <a
                href="#video-edukasi"
                onClick={() => handleLinkClick("video-edukasi")}
                className={`transition ${
                  activeSection === "video-edukasi"
                    ? "text-pink-600 font-semibold"
                    : "text-gray-700 dark:text-gray-200 hover:text-pink-600"
                }`}
              >
                Video Edukasi
              </a>
            </nav>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center gap-4 relative">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/signin"
                    className="px-5 py-2 border border-pink-500 text-pink-600 rounded-full hover:bg-pink-500 hover:text-white transition"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/signup"
                    className="px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:opacity-90 transition shadow-lg"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 transition"
                  >
                    {email}
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 shadow-lg rounded-xl border p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 rounded-lg"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Button */}
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-button lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[60] relative"
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${
                  navigationOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${
                  navigationOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] lg:hidden"
        ></div>
      )}

      {/* Mobile Slide Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-[55] lg:hidden overflow-y-auto ${
          navigationOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="pt-12">
            <a
              href="#home"
              className={`block py-2 transition ${
                activeSection === "home"
                  ? "text-pink-600 font-semibold"
                  : "hover:text-pink-600"
              }`}
              onClick={() => handleLinkClick("home")}
            >
              Home
            </a>
            <a
              href="#edukasi"
              className={`block py-2 transition ${
                activeSection === "edukasi"
                  ? "text-pink-600 font-semibold"
                  : "hover:text-pink-600"
              }`}
              onClick={() => handleLinkClick("edukasi")}
            >
              Edukasi
            </a>
            <a
              href="#pencatatan"
              className={`block py-2 transition ${
                activeSection === "pencatatan"
                  ? "text-pink-600 font-semibold"
                  : "hover:text-pink-600"
              }`}
              onClick={() => handleLinkClick("pencatatan")}
            >
              Pencatatan
            </a>
            <a
              href="#video-edukasi"
              className={`block py-2 transition ${
                activeSection === "video-edukasi"
                  ? "text-pink-600 font-semibold"
                  : "hover:text-pink-600"
              }`}
              onClick={() => handleLinkClick("video-edukasi")}
            >
              Video Edukasi
            </a>
          </div>

          <div className="pt-6 space-y-3 border-t border-gray-200 dark:border-gray-700">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/signin"
                  className="block w-full text-center border border-pink-500 text-pink-600 py-2 rounded-full hover:bg-pink-50 transition"
                  onClick={() => setNavigationOpen(false)}
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="block w-full text-center bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-full hover:opacity-90 transition"
                  onClick={() => setNavigationOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full text-center bg-red-500 text-white py-2 rounded-full hover:bg-red-600 transition"
              >
                Logout ({email})
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  navigationOpen: PropTypes.bool,
  setNavigationOpen: PropTypes.func
};

Header.defaultProps = {
  navigationOpen: false,
  setNavigationOpen: () => {}
};