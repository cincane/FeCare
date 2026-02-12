import React from "react";

export default function SmallFeatures() {
  const features = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/822/822143.png",
      title: "Manfaat Tablet Fe",
      description:
        "Cegah anemia dan stunting dengan konsumsi Tablet Fe rutin sesuai anjuran tenaga kesehatan.",
      bgColor: "bg-pink-200 dark:bg-pink-800/40",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
      title: "Untuk Remaja Putri",
      description:
        "Konsumsi 1 tablet seminggu untuk cadangan zat besi, persiapan jadi calon ibu sehat, cegah stunting sejak dini.",
      bgColor: "bg-rose-200 dark:bg-rose-800/40",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
      title: "Untuk Ibu Hamil",
      description:
        "Minimal 90 tablet selama kehamilan, cegah anemia, perdarahan, BBLR, dan lahirkan bayi sehat.",
      bgColor: "bg-fuchsia-200 dark:bg-fuchsia-800/40",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-16 lg:py-20 
      bg-gradient-to-br from-pink-200 via-rose-200 to-fuchsia-200 
      dark:from-pink-900 dark:via-rose-900 dark:to-fuchsia-900 
      overflow-hidden"
    >
      {/* Strong Decorative Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/40 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-rose-500/40 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl 
              bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 
              transition-all duration-300 border border-pink-200"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${feature.bgColor}`}
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-10 h-10"
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
