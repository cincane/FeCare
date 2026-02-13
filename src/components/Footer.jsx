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
      <div className="absolute inset-0 bg-gradient-to-br bg-pink-400  to-fuchsia-700 animate-gradient-x"></div>

      <div className="relative py-14">
        <div className="container mx-auto px-6 lg:px-16 text-center">

          {/* TITLE */}
          <h2 className="text-xl lg:text-2xl font-semibold mb-3">
            Didukung Oleh Institusi & Program Kesehatan
          </h2>

          <p className="max-w-xl mx-auto text-white/80 text-sm mb-10">
            Mencegah stunting sejak remaja sebagai langkah awal membangun generasi yang sehat dan berkualitas.
          </p>

          {/* BRANDS */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            {brands.map((brand, index) => {
              const isMidwife = brand.includes("midwife");

              return (
                <div key={index}>
                  <img
                    className={`w-auto opacity-90 hover:opacity-100 transition ${
                      isMidwife
                        ? "h-36 md:h-38 lg:h-38"   // ukuran lebih besar khusus midwife
                        : "h-22 md:h-24 lg:h-26"
                    }`}
                    src={brand}
                    alt="Brand"
                  />
                </div>
              );
            })}
          </div>


          {/* CONTACT */}
          <div className="grid md:grid-cols-3 gap-6 text-sm mb-10">

            <div className="flex flex-col items-center gap-2">
              <MapPin className="w-4 h-4 text-white/80" />
              <p className="text-white/80">
                Jl. Kesehatan No. 123<br />
                Jakarta, Indonesia
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Phone className="w-4 h-4 text-white/80" />
              <p className="text-white/80">
                +62 812 3456 7890
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Mail className="w-4 h-4 text-white/80" />
              <p className="text-white/80">
                support@fecare.id
              </p>
            </div>

          </div>

          {/* COPYRIGHT */}
          <div className="border-t border-white/20 pt-5 text-white/60 text-xs">
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
          animation: gradient-x 10s ease infinite;
        }
      `}</style>

    </footer>
  );
}
