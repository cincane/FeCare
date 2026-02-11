import React from "react";

export default function SmallFeatures() {
  const features = [
    {
      // Icon Tablet/Pil
      icon: "https://cdn-icons-png.flaticon.com/512/4329/4329449.png",
      // atau pakai ini: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png"
      title: "Manfaat Tablet Fe",
      description: "Cegah anemia dan stunting dengan konsumsi Tablet Fe rutin sesuai anjuran tenaga kesehatan.",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      // Icon Remaja Putri/Cewek
      icon: "https://cdn-icons-png.flaticon.com/512/1995/1995572.png",
      // atau pakai ini: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
      title: "Untuk Remaja Putri",
      description: "Konsumsi 1 tablet seminggu untuk cadangan zat besi, persiapan jadi calon ibu sehat, cegah stunting sejak dini.",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
    },
    {
      // Icon Ibu Hamil
      icon: "https://cdn-icons-png.flaticon.com/512/2917/2917995.png",
      // atau pakai ini: "https://cdn-icons-png.flaticon.com/512/3050/3050064.png"
      title: "Untuk Ibu Hamil",
      description: "Minimal 90 tablet selama kehamilan, cegah anemia, perdarahan, BBLR, dan lahirkan bayi sehat.",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <section id="features" className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
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
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}