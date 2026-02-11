export default function Counter() {
  const stats = [
    { number: "785", label: "Global Brands" },
    { number: "533", label: "Happy Clients" },
    { number: "865", label: "Winning Award" },
    { number: "346", label: "Projects Done" },
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-primary">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.number}
              </h2>
              <p className="text-white/80 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
