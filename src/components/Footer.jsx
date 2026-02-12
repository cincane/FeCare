import React, { useState } from "react";
import { Instagram, Youtube, Music2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Silakan masukkan email terlebih dahulu.");
      return;
    }
    alert("Terima kasih sudah berlangganan 💌");
    setEmail("");
  };

  return (
    <footer id="support" className="relative overflow-hidden text-white">
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-rose-600 to-fuchsia-700 animate-gradient-x"></div>

      <div className="relative py-20">
        <div className="container mx-auto px-6 lg:px-16">

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl">

            {/* TOP ROW */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

              {/* Logo - LEFT */}
              <div className="flex items-center gap-3">
                <button onClick={() => handleScrollTo("home")}>
                  <img
                    src="/images/Logo.png"
                    alt="FeCare Logo"
                    className="h-40 w-auto object-contain drop-shadow-2xl hover:scale-110 transition duration-300"
                  />
 
                </button>
              </div>

              {/* MENU - CENTER */}
              <div className="flex flex-wrap justify-center gap-8 text-lg font-medium">
                <button onClick={() => handleScrollTo("home")} className="hover:text-white transition">
                  Home
                </button>
                <button onClick={() => handleScrollTo("edukasi")} className="hover:text-white transition">
                  Edukasi
                </button>
                <button onClick={() => handleScrollTo("pencatatan")} className="hover:text-white transition">
                  Pencatatan
                </button>
                <button onClick={() => handleScrollTo("video-edukasi")} className="hover:text-white transition">
                  Video Edukasi
                </button>
              </div>

              {/* SOCIAL - RIGHT */}
              <div className="flex gap-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-6 h-6 hover:text-white transition cursor-pointer" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-6 h-6 hover:text-white transition cursor-pointer" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  <Music2 className="w-6 h-6 hover:text-white transition cursor-pointer" />
                </a>
              </div>

            </div>

            {/* NEWSLETTER */}
            <div className="max-w-md mx-auto mt-16 text-center">
              <h5 className="font-semibold text-lg mb-6">
                Dapatkan Informasi Terbaru
              </h5>

              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email"
                  className="w-full bg-white/20 text-white rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-white placeholder-white/60"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-pink-600 px-3 py-1 rounded-lg font-semibold hover:bg-pink-100 transition"
                >
                  →
                </button>
              </form>
            </div>

            {/* BOTTOM */}
            <div className="mt-12 border-t border-white/20 pt-6 text-center text-white/70">
              © 2025 FeCare. Semua Hak Dilindungi.
            </div>

          </div>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 10s ease infinite;
        }
      `}</style>
    </footer>
  );
}
