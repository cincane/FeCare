import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const brands = [
    "/images/poltekes-removebg-preview.png",
    "/images/midwife-removebg-preview.png",
    "/images/stunting-removebg-preview.png",
    "/images/hati-removebg-preview.png",
  ];

  return (
    <footer id="support" className="relative overflow-hidden text-white">

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br bg-pink-500"></div>

      <div className="relative py-10 md:py-14">
        <div className="container mx-auto px-5 md:px-10 text-center">

          {/* TITLE */}
          <h2 className="text-base md:text-xl font-semibold mb-2">
            Didukung Oleh Institusi & Program Kesehatan
          </h2>

          <p className="max-w-md mx-auto text-white/80 text-xs md:text-sm mb-8 leading-relaxed">
            Mencegah stunting sejak remaja sebagai langkah awal membangun generasi yang sehat dan berkualitas.
          </p>

          {/* BRANDS */}
          <div className="flex flex-wrap justify-center items-center gap-5 md:gap-8 mb-10">

            {brands.map((brand, index) => {
              const isMidwife = brand.includes("midwife");

              return (
                <img
                  key={index}
                  src={brand}
                  alt="Brand"
                  className={`w-auto opacity-90 hover:opacity-100 transition duration-300 ${
                    isMidwife
                      ? "h-24 md:h-32"     // midwife lebih besar
                      : "h-14 md:h-20"
                  }`}
                />
              );
            })}

          </div>

          {/* CONTACT */}
          <div className="space-y-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0 text-xs md:text-sm mb-8">

            <div className="flex flex-col items-center gap-2">
              <MapPin className="w-4 h-4 text-white/80" />
              <p className="text-white/80 text-center">
               Jl. Ksatria No.2, Danguran, Kec. Klaten Selatan, Kabupaten Klaten, Jawa Tengah 57425
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Phone className="w-4 h-4 text-white/80" />
              <p className="text-white/80">
                Layanan Informasi <br />
                0811-2646-929
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Mail className="w-4 h-4 text-white/80" />
              <p className="text-white/80">
                tibayandesa@gmail.com
              </p>
            </div>

          </div>

          {/* COPYRIGHT */}
          <div className="border-t border-white/20 pt-4 text-white/60 text-[11px] md:text-xs">
            © 2025 FeCare. Semua Hak Dilindungi.
          </div>

        </div>
      </div>

      {/* Gradient Animation */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 12s ease infinite;
        }
      `}</style>

    </footer>
  );
}
