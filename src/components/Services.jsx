export default function Services() {
  const services = [
    {
      icon: "/images/icon-04.svg",
      title: "Crafted for Startups",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor.",
    },
    {
      icon: "/images/icon-05.svg",
      title: "High-quality Design",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor.",
    },
    {
      icon: "/images/icon-06.svg",
      title: "All Essential Sections",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor.",
    },
    {
      icon: "/images/icon-07.svg",
      title: "Speed Optimized",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor.",
    },
    {
      icon: "/images/icon-05.svg",
      title: "Fully Customizable",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor.",
    },
    {
      icon: "/images/icon-06.svg",
      title: "Regular Updates",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor.",
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      {/* Section Title */}
      <div className="container mx-auto px-4 lg:px-8 xl:px-16 text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-dark dark:text-white mb-4 max-w-3xl mx-auto">
          We Offer The Best Quality Service for You
        </h2>
        <p className="text-body dark:text-gray-300 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis
          tortor eros. Donec vitae tortor lacus. Phasellus aliquam ante in
          maximus.
        </p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-all group"
            >
              <div className="mb-6">
                <img src={service.icon} alt="Icon" className="w-12 h-12" />
              </div>
              <h4 className="text-xl font-bold text-dark dark:text-white mb-3">
                {service.title}
              </h4>
              <p className="text-body dark:text-gray-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
