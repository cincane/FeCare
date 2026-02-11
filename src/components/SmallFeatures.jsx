export default function SmallFeatures() {
  const features = [
    {
      icon: "/images/icon-01.svg",
      title: "24/7 Support",
      description: "Lorem ipsum dolor sit amet conse adipiscing elit.",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: "/images/icon-02.svg",
      title: "Take Ownership",
      description: "Lorem ipsum dolor sit amet conse adipiscing elit.",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: "/images/icon-03.svg",
      title: "Team Work",
      description: "Lorem ipsum dolor sit amet conse adipiscing elit.",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
    },
  ];

  return (
    <section id="features" className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16 2xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div
                className={`flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center ${feature.bgColor}`}
              >
                <img src={feature.icon} alt="Icon" className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-dark dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-body dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
