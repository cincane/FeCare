export default function Clients() {
  const brands = [
    "/images/brand-light-01.svg",
    "/images/brand-light-02.svg",
    "/images/brand-light-03.svg",
    "/images/brand-light-04.svg",
    "/images/brand-light-05.svg",
    "/images/brand-light-06.svg",
  ];

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16 text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-dark dark:text-white mb-4 max-w-3xl mx-auto">
          Trusted by Global Brands
        </h2>
        <p className="text-body dark:text-gray-300 max-w-2xl mx-auto">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using.
        </p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand, index) => (
            <div key={index} className="flex items-center justify-center">
              <a
                href="#"
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                <img
                  className="h-8 w-auto dark:invert"
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
