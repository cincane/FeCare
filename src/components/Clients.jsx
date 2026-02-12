export default function Clients() {
  const brands = [
    "/images/poltekes.jpeg",
    "/images/midwife.jpeg",
    "/images/stunting.jpeg",
    "/images/hati.jpeg",
  ];

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16 text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-dark dark:text-white mb-4 max-w-3xl mx-auto">
          Didukung Oleh Institusi & Program Kesehatan
        </h2>
        <p className="text-body dark:text-gray-300 max-w-2xl mx-auto">
          Mencegah stunting sejak remaja sebagai langkah awal membangun generasi yang sehat dan berkualitas.
        </p>

      </div>

      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="flex flex-wrap justify-center items-center gap-12">
          {brands.map((brand, index) => (
            <div key={index} className="flex items-center justify-center">
              <a
                href="#"
                className="transition-opacity hover:opacity-100"
              >
                <img
                  className="h-20 md:h-24 lg:h-28 w-auto dark:invert"
                  src={brand}
                  alt="Brand"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
