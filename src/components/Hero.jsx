export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] lg:w-[1000px] lg:h-[800px] bg-pink-400 opacity-90 translate-x-1/3 -translate-y-1/4"
          style={{
            clipPath: 'ellipse(45% 55% at 50% 50%)',
            borderRadius: '35% 65% 60% 40% / 45% 35% 65% 55%'
          }}>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 xl:px-16 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-dark dark:text-white leading-tight">
              Tablet Fe: Lindungi Remaja
              <br />& Ibu Hamil dari Anemia
            </h1>
            <p className="text-lg text-body dark:text-gray-300 leading-relaxed">
              Gerakan Nasional "Remaja Sehat Bebas Anemia" & "Ibu Hamil Cerdas Konsumsi Fe"
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-4 bg-pink-400 text-white rounded-lg font-semibold hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl"
              >
                Aktifkan Pengingat
              </a>

              {/* <div className="flex flex-col justify-center">
                
                  href="#"
                  className="text-dark dark:text-white font-semibold hover:text-primary transition-colors"
                >
                  Call us (0123) 456 – 789
                </a>
                <span className="text-sm text-body dark:text-gray-400">
                  For any question or concern
                </span>
              </div> */}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <img
                src="/images/home-removebg-preview.png"
                alt="Woman with laptop"
                className="relative z-10 w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}