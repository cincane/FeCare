import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ navigationOpen, setNavigationOpen }) {
  const [stickyMenu, setStickyMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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

      navigate("/");
      window.location.reload();
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
          <a href="#home" className="hover:text-pink-600 transition">
            Home
          </a>
          <a href="#edukasi" className="hover:text-pink-600 transition">
            Edukasi
          </a>
          <a href="#pencatatan" className="hover:text-pink-600 transition">
            Pencatatan
          </a>
          <a href="#video-edukasi" className="hover:text-pink-600 transition">
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

  {/* Mobile Slide Menu */}
  <div
    className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 z-50 lg:hidden ${
      navigationOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="p-6 space-y-6">
      <a href="#home" className="block" onClick={() => setNavigationOpen(false)}>
        Home
      </a>
      <a href="#edukasi" className="block" onClick={() => setNavigationOpen(false)}>
        Edukasi
      </a>
      <a href="#pencatatan" className="block" onClick={() => setNavigationOpen(false)}>
        Pencatatan
      </a>
      <a href="#video-edukasi" className="block" onClick={() => setNavigationOpen(false)}>
        Video Edukasi
      </a>

      <div className="pt-6 space-y-3">
        {!isLoggedIn ? (
          <>
            <Link
              to="/signin"
              className="block w-full text-center border border-pink-500 text-pink-600 py-2 rounded-full"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="block w-full text-center bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-full"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="block w-full text-center bg-red-500 text-white py-2 rounded-full"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  </div>
</>
  );
}

Header.defaultProps = {
  navigationOpen: false,
  setNavigationOpen: () => {}
};
