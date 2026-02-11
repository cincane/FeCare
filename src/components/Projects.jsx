import { useState } from "react";

export default function Projects() {
  const [filterTab, setFilterTab] = useState(1);

  const projects = [
    {
      image: "/images/project-01.png",
      category: "branding ecommerce",
      title: "Photo Retouching",
      subtitle: "Branded Ecommerce",
    },
    {
      image: "/images/project-02.png",
      category: "digital",
      title: "Photo Retouching",
      subtitle: "Digital Marketing",
    },
    {
      image: "/images/project-04.png",
      category: "branding ecommerce",
      title: "Photo Retouching",
      subtitle: "Branded Ecommerce",
    },
    {
      image: "/images/project-03.png",
      category: "digital ecommerce",
      title: "Photo Retouching",
      subtitle: "Ecommerce Platform",
    },
  ];

  const shouldShowProject = (category) => {
    if (filterTab === 1) return true; // All
    if (filterTab === 2) return category.includes("branding");
    if (filterTab === 3) return category.includes("digital");
    if (filterTab === 4) return category.includes("ecommerce");
    return false;
  };

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-dark">
      {/* Section Title */}
      <div className="container mx-auto px-4 lg:px-8 xl:px-16 text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-dark dark:text-white mb-4 max-w-3xl mx-auto">
          Our Recent Projects
        </h2>
        <p className="text-body dark:text-gray-300 max-w-2xl mx-auto">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using.
        </p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        {/* Project Tab */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setFilterTab(1)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filterTab === 1
                ? "bg-primary text-white"
                : "bg-gray-100 text-body hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterTab(2)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filterTab === 2
                ? "bg-primary text-white"
                : "bg-gray-100 text-body hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            Branding Strategy
          </button>
          <button
            onClick={() => setFilterTab(3)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filterTab === 3
                ? "bg-primary text-white"
                : "bg-gray-100 text-body hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            Digital Experiences
          </button>
          <button
            onClick={() => setFilterTab(4)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filterTab === 4
                ? "bg-primary text-white"
                : "bg-gray-100 text-body hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            Ecommerce
          </button>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map(
            (project, index) =>
              shouldShowProject(project.category) && (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg shadow-lg"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                    <h4 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h4>
                    <p className="text-white/80 mb-4">{project.subtitle}</p>
                    <a
                      href="#"
                      className="self-start flex items-center justify-center w-12 h-12 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 14 14">
                        <path d="M10.4763 6.16664L6.00634 1.69664L7.18467 0.518311L13.6663 6.99998L7.18467 13.4816L6.00634 12.3033L10.4763 7.83331H0.333008V6.16664H10.4763Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </section>
  );
}
