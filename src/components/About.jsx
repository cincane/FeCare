export default function About() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="/images/about-01.png"
                  alt="About"
                  className="rounded-lg shadow-lg w-full"
                />
                <img
                  src="/images/about-02.png"
                  alt="About"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="/images/about-03.png"
                  alt="About"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <h4 className="text-primary font-semibold text-lg">
              Why Choose Us
            </h4>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark dark:text-white">
              We Make Our customers happy by giving Best services.
            </h2>
            <p className="text-body dark:text-gray-300 leading-relaxed">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum.
            </p>

            <a
              href="https://www.youtube.com/watch?v=xcJtL7QggTI"
              className="inline-flex items-center gap-3 group hover:text-primary transition-colors"
            >
              <span className="relative flex items-center justify-center w-14 h-14 bg-primary rounded-full group-hover:bg-primary-600 transition-colors">
                <span className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></span>
                <img
                  src="/images/icon-play.svg"
                  alt="Play"
                  className="relative z-10 w-6 h-6"
                />
              </span>
              <span className="font-semibold text-dark dark:text-white">
                SEE HOW WE WORK
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
