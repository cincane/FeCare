export default function Counter() {
  const stats = [
    { number: "1.200+", label: "Remaja Teredukasi" },
    { number: "850+", label: "Pengguna Aktif" },
    { number: "95%", label: "Tingkat Kepuasan" },
    { number: "10+", label: "Materi Edukasi" },
  ];


  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-r from-pink-500 to-rose-500">
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
