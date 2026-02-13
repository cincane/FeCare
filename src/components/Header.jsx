import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export default function Header({
  navigationOpen,
  setNavigationOpen,
}) {
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
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        stickyMenu
          ? "bg-white shadow-md backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 xl:px-16 2xl:px-24">
        <div className="flex items-center justify-between py-5">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              FeCare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-800 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <a
              href="#edukasi"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Edukasi
            </a>
            <a
              href="#pencatatan"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Pencatatan
            </a>
            <a
              href="#video-edukasi"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Video Edukasi
            </a>
          </nav>

          {/* RIGHT SIDE DESKTOP */}
          <div className="hidden lg:flex items-center gap-4 relative">

            {!isLoggedIn ? (
              <>
                <Link
                  to="/signin"
                  className="px-6 py-2 text-gray-800 hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-all"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  {email}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border">
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
              className={`w-6 h-0.5 bg-gray-900 transition-all ${
                navigationOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-900 transition-all ${
                navigationOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-900 transition-all ${
                navigationOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            navigationOpen ? "max-h-[500px] pb-6" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-4 pt-4">
            <Link to="/" className="py-2 border-b">Home</Link>
            <a href="#edukasi" className="py-2 border-b">Edukasi</a>
            <a href="#pencatatan" className="py-2 border-b">Pencatatan</a>
            <a href="#video-edukasi" className="py-2 border-b">Video Edukasi</a>

            <div className="flex flex-col gap-3 pt-4">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/signin"
                    className="px-6 py-3 text-center border rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-3 text-center bg-primary text-white rounded-lg"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 text-center bg-red-500 text-white rounded-lg"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

Header.defaultProps = {
  navigationOpen: false,
  setNavigationOpen: () => {}
};
