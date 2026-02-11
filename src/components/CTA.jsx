export default function CTA() {
  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-br from-primary to-primary-700">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Get Started With Base Today!
              </h2>
              <p className="text-white/90 text-lg">
                It is a long established fact that a reader will be distracted
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Get Started Now
              </a>
              <a
                href="#"
                className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors whitespace-nowrap"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
